import { escapeHtml, NormalizedContactData } from "@/lib/security"

export function generateEmailHtml(formData: NormalizedContactData): string {
  const { name, email, subject, message, contactReason, projectType, budget, timeline } = formData

  const isHireInquiry = contactReason === "hire"

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eeeeee;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #007bff; /* Primary color */
                margin: 0;
                font-size: 24px;
            }
            .content p {
                margin-bottom: 10px;
            }
            .content strong {
                color: #555555;
            }
            .message-box {
                background-color: #f9f9f9;
                border-left: 4px solid #007bff;
                padding: 15px;
                margin-top: 20px;
                border-radius: 4px;
            }
            .message-box p {
                margin: 0;
                white-space: pre-wrap; /* Preserve line breaks */
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                margin-top: 20px;
                border-top: 1px solid #eeeeee;
                color: #888888;
                font-size: 12px;
            }
            .badge {
                display: inline-block;
                background-color: #e0f7fa; /* Light blue */
                color: #007bff;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.9em;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                <p><strong>Contact Reason:</strong> <span class="badge">${isHireInquiry ? "Hire Me" : "Casual Inquiry"}</span></p>
                ${
                  isHireInquiry
                    ? `
                <p><strong>Project Type:</strong> ${escapeHtml(projectType ?? "")}</p>
                <p><strong>Budget:</strong> ${escapeHtml(budget ?? "")}</p>
                <p><strong>Timeline:</strong> ${escapeHtml(timeline ?? "")}</p>
                `
                    : ""
                }
                <div class="message-box">
                    <p><strong>Message:</strong></p>
                    <p>${escapeHtml(message)}</p>
                </div>
            </div>
            <div class="footer">
                <p>This email was sent from your website's contact form.</p>
            </div>
        </div>
    </body>
    </html>
    `
}
