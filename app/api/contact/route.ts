import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { generateEmailHtml } from "@/lib/htmlTemplate"
import { NormalizedContactData, validateContactPayload } from "@/lib/security"

const MAX_BODY_SIZE = 8 * 1024 // 8KB
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateLimiter = new Map<string, { count: number; expiresAt: number }>()

const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASS", "CONTACT_RECEIVER"] as const

const missingEnv = requiredEnvVars.filter((key) => !process.env[key])
if (missingEnv.length) {
  console.warn("Missing email configuration variables:", missingEnv.join(", "))
}

const getClientId = (req: Request) => {
  const header =
    req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? ""
  return header.split(",")[0]?.trim() || "anonymous"
}

const isRateLimited = (clientId: string) => {
  const entry = rateLimiter.get(clientId)
  const now = Date.now()

  if (!entry || entry.expiresAt < now) {
    rateLimiter.set(clientId, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  rateLimiter.set(clientId, entry)
  return entry.count > RATE_LIMIT_MAX
}

const formatEmailText = (data: NormalizedContactData) => {
  return `Name: ${data.name}
Email: ${data.email}
Message:
${data.message}`
}

export async function POST(req: Request) {
  const clientId = getClientId(req)
  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 },
    )
  }

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 })
  }

  const bodySize = JSON.stringify(payload).length
  if (bodySize > MAX_BODY_SIZE) {
    return NextResponse.json(
      { success: false, error: "Message too large. Please shorten your request." },
      { status: 413 },
    )
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
