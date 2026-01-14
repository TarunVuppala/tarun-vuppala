const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

export function escapeHtml(value: string): string {
  if (!value) return ""
  return value.replace(/[&<>"']/g, (char) => ENTITY_MAP[char] ?? char)
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type NormalizedContactData = {
  name: string
  email: string
  message: string
}

type ValidationResult =
  | { success: true; data: NormalizedContactData }
  | { success: false; errors: string[] }

const MAX_FIELD_LENGTH = 300
const MAX_MESSAGE_LENGTH = 2000
const sanitize = (value: unknown, max = MAX_FIELD_LENGTH) => {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

export function validateContactPayload(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object") {
    return { success: false, errors: ["Invalid request body."] }
  }

  const data = payload as Partial<NormalizedContactData>
  const errors: string[] = []

  const name = sanitize(data.name)
  const email = sanitize(data.email)
  const message = sanitize(data.message, MAX_MESSAGE_LENGTH)

  if (!name) errors.push("Name is required.")
  if (!email || !EMAIL_REGEX.test(email)) errors.push("A valid email is required.")
  if (!message) errors.push("Message is required.")

  if (errors.length) {
    return { success: false, errors }
  }

  return {
    success: true,
    data: {
      name,
      email,
      message,
    },
  }
}
