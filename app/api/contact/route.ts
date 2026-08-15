import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { generateEmailHtml } from "@/lib/htmlTemplate"
import { NormalizedContactData, validateContactPayload } from "@/lib/security"
import { canonicalSiteUrl, siteUrl } from "@/lib/seo"

const MAX_BODY_SIZE = 8 * 1024 // 8KB
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
type RateLimitEntry = { count: number; expiresAt: number }

const rateLimiterStore = globalThis as typeof globalThis & { contactRateLimiter?: Map<string, RateLimitEntry> }
const rateLimiter = rateLimiterStore.contactRateLimiter ?? (rateLimiterStore.contactRateLimiter = new Map())

const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS", "CONTACT_RECEIVER"] as const

const missingEnv = requiredEnvVars.filter((key) => !process.env[key])
if (missingEnv.length) {
  console.warn("Missing email configuration variables:", missingEnv.join(", "))
}

const getClientId = (req: Request) => {
  const header =
    req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for") ?? ""
  return header.split(",")[0]?.trim() || "anonymous"
}

const isRateLimited = (clientId: string) => {
  const now = Date.now()

  for (const [key, value] of rateLimiter) {
    if (value.expiresAt < now) rateLimiter.delete(key)
  }

  const entry = rateLimiter.get(clientId)

  if (!entry || entry.expiresAt < now) {
    rateLimiter.set(clientId, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  rateLimiter.set(clientId, entry)
  return entry.count > RATE_LIMIT_MAX
}

const hasTrustedOrigin = (req: Request) => {
  const origin = req.headers.get("origin")
  if (!origin) return process.env.NODE_ENV !== "production"

  const requestOrigin = new URL(req.url).origin
  const trusted = new Set([
    requestOrigin,
    siteUrl,
    canonicalSiteUrl,
    "https://www.tarunvuppala.me",
    "https://tarunvuppala.me",
  ])
  return trusted.has(origin)
}

const isHoneypotSubmission = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return false
  const website = (payload as { website?: unknown }).website
  return typeof website === "string" && website.trim().length > 0
}

const formatEmailText = (data: NormalizedContactData) => {
  return `Name: ${data.name}
Email: ${data.email}
Message:
${data.message}`
}

export async function POST(req: Request) {
  if (!hasTrustedOrigin(req)) {
    return NextResponse.json({ success: false, error: "Invalid request origin." }, { status: 403 })
  }

  const clientId = getClientId(req)
  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 },
    )
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, error: "Message too large. Please shorten your request." },
      { status: 413 },
    )
  }

  let rawBody = ""
  try {
    rawBody = await req.text()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 })
  }

  if (rawBody.length > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, error: "Message too large. Please shorten your request." },
      { status: 413 },
    )
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 })
  }

  if (isHoneypotSubmission(payload)) {
    return NextResponse.json({ success: true })
  }

  const validation = validateContactPayload(payload)
  if (!validation.success) {
    return NextResponse.json({ success: false, error: validation.errors.join(" ") }, { status: 400 })
  }

  if (missingEnv.length) {
    return NextResponse.json(
      {
        success: false,
        error: "Email service is not configured. Please try again later.",
      },
      { status: 500 },
    )
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const emailText = formatEmailText(validation.data)

  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    replyTo: validation.data.email,
    to: process.env.CONTACT_RECEIVER!,
    subject: `[Contact] New message`,
    text: emailText,
    html: generateEmailHtml(validation.data),
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Mail error:", err)
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 },
    )
  }
}
