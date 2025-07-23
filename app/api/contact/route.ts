import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import { generateEmailHtml } from "@/lib/htmlTemplate"

export async function POST(req: Request) {
  const { name, email, subject, message, contactReason, projectType, budget, timeline } = await req.json()

  // Basic validation for common fields
  if (!name || !email || !subject || !message || !contactReason) {
    return NextResponse.json(
      { success: false, error: "Missing required form fields (name, email, subject, message, contactReason)." },
      { status: 400 },
    )
  }

  // Additional validation for 'hire' reason
  if (contactReason === "hire") {
    if (!projectType || !budget || !timeline) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required project details for 'hire' inquiry (projectType, budget, timeline).",
        },
        { status: 400 },
      )
    }
  }

  // Configure Nodemailer transporter with dummy data
  // IMPORTANT: Replace these dummy values with actual environment variables in a real application!
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Construct email content based on contact reason
  const emailText = `
Name: ${name}
Email: ${email}
Subject: ${subject}
Contact Reason: ${contactReason === "hire" ? "Hire Me" : "Casual Inquiry"}
Message:
${message}
`

  const mailOptions = {
    from: `"Website Contact" process.env.EMAIL_USER`,
    to: process.env.CONTACT_RECEIVER,
    subject: `[Contact] ${subject}`,
    text: emailText,
    html: generateEmailHtml({
      name,
      email,
      subject,
      message,
      contactReason,
      projectType,
      budget,
      timeline,
    } as ContactFormData),
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Mail error:", err)
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please check server logs and email configuration." },
      { status: 500 },
    )
  }
}
