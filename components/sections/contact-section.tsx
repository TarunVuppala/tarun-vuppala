"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import ContentContainer from "@/components/layout/container"
import { contactInfo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { easeOutExpo, whenMotion } from "@/lib/motion"
import type { ContactFormData } from "@/types/contact"

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [website, setWebsite] = useState("")
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    let submissionSucceeded = false

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      })

      const json = await response.json()
      if (!json.success) throw new Error(json.error || "Unknown error")

      submissionSucceeded = true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }

    if (!submissionSucceeded) return

    setIsSubmitted(true)

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
      setWebsite("")
    }, 3200)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <section id="contact" className="relative overflow-hidden py-14 sm:py-16" style={sectionScrollOffset}>
      <ContentContainer className="space-y-10">
        <div className="max-w-3xl">
          <p className="section-kicker">Dispatch</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
            Open to Backend,
            <span className="mt-1 block italic text-stone-500 dark:text-stone-400">AI, and ML roles.</span>
          </h2>
        </div>

        <div className="grid gap-12 xl:grid-cols-[0.75fr_1.25fr] xl:gap-16 xl:items-start">
          {/* Contact info — label-row, no icon circles */}
          <div>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={whenMotion(reduceMotion, { opacity: 0, x: -16 }, false)}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={whenMotion(reduceMotion, { duration: 0.4, delay: index * 0.05, ease: easeOutExpo }, { duration: 0 })}
                className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-t border-stone-950/10 py-4 last:border-b dark:border-white/10"
              >
                <span className="meta-label">
                  {info.title}
                </span>
                {info.href ? (
                  <Link
                    href={info.href}
                    className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-stone-900 transition-colors hover:text-sky-700 dark:text-stone-100 dark:hover:text-sky-100"
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {info.value}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="text-[0.95rem] font-medium text-stone-900 dark:text-stone-100">{info.value}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form — no heavy card wrapper */}
          <div>
            {isSubmitted ? (
              <motion.div
                role="status"
                initial={whenMotion(reduceMotion, { opacity: 0, clipPath: "inset(12% 12% 12% 12% round 24px)" }, false)}
                animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                transition={whenMotion(reduceMotion, { duration: 0.35, ease: easeOutExpo }, { duration: 0 })}
                className="flex min-h-88 flex-col items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/8 px-6 text-center"
              >
                <CheckCircle className="h-14 w-14 text-sky-700 dark:text-sky-100" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold text-stone-950 dark:text-stone-50">
                  Got it, {formData.name}.
                </h3>
                <p className="detail-copy mt-3 max-w-md">
                  I&apos;ll get back to you with a real reply, not a canned one.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                {errorMessage && (
                  <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="meta-label">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="letter-field h-11 border-stone-950/20 bg-transparent text-stone-950 placeholder:text-stone-500 dark:border-white/20 dark:text-stone-100 dark:placeholder:text-stone-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="meta-label">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="letter-field h-11 border-stone-950/20 bg-transparent text-stone-950 placeholder:text-stone-500 dark:border-white/20 dark:text-stone-100 dark:placeholder:text-stone-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="meta-label">Build brief</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Tell me what you have in mind, what kind of help you need, or why you wanted to reach out."
                    className="letter-field min-h-48 border-stone-950/20 bg-transparent text-stone-950 placeholder:text-stone-500 dark:border-white/20 dark:text-stone-100 dark:placeholder:text-stone-500"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="ink-button h-11 rounded-full bg-sky-300 px-6 text-sm font-medium text-slate-950 hover:bg-sky-200"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <motion.span
                          animate={reduceMotion ? undefined : { rotate: 360 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-slate-950/20 border-t-slate-950"
                          aria-hidden="true"
                        />
                        Sending
                      </span>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}
