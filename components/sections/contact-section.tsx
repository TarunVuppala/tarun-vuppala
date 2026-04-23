"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import ContentContainer from "@/components/layout/container"
import { contactInfo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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
        body: JSON.stringify(formData),
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
      <ContentContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.965, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
            Open to Backend Engineer,
            <span className="block text-stone-700 dark:text-stone-300">AI Engineer, and ML Engineer roles.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="divide-y divide-stone-950/10 border-y border-stone-950/10 dark:divide-white/10 dark:border-white/10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -14, y: 6 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-300/15 dark:bg-sky-300/10">
                      <info.icon className="h-5 w-5 text-sky-700 dark:text-sky-100" />
                    </div>
                    <div className="flex-1">
                      <p className="meta-label">{info.title}</p>
                      {info.href ? (
                        <Link
                          href={info.href}
                          className="mt-1 inline-flex items-center gap-2 text-base font-medium text-stone-900 transition-colors hover:text-sky-700 dark:text-stone-100 dark:hover:text-sky-100"
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.value}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <p className="mt-1 text-base font-medium text-stone-900 dark:text-stone-100">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 18, scale: 0.985 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[1.5rem] border border-stone-950/10 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="relative p-4 sm:p-5">
              <div className="relative">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex min-h-[22rem] flex-col items-center justify-center rounded-[1.3rem] border border-sky-300/20 bg-sky-300/8 px-6 text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-sky-700 dark:text-sky-100" />
                    <h3 className="mt-6 text-3xl font-semibold text-stone-950 dark:text-stone-50">Got it, {formData.name}.</h3>
                    <p className="detail-copy mt-4 max-w-md">
                      I&apos;ll get back to you with a real reply, not a canned one.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="rounded-[1.25rem] border border-destructive/30 bg-destructive/10 px-4 py-4 text-sm text-destructive">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="meta-label">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="h-11 rounded-xl border-stone-950/10 bg-white/82 text-stone-950 placeholder:text-stone-500 dark:border-white/10 dark:bg-black/24 dark:text-stone-100 dark:placeholder:text-stone-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="meta-label">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="h-11 rounded-xl border-stone-950/10 bg-white/82 text-stone-950 placeholder:text-stone-500 dark:border-white/10 dark:bg-black/24 dark:text-stone-100 dark:placeholder:text-stone-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="meta-label">
                        Build brief
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={8}
                        placeholder="Tell me what you have in mind, what kind of help you need, or why you wanted to reach out."
                        className="min-h-[12rem] rounded-[1.2rem] border-stone-950/10 bg-white/82 text-stone-950 placeholder:text-stone-500 dark:border-white/10 dark:bg-black/24 dark:text-stone-100 dark:placeholder:text-stone-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                        className="h-11 rounded-full bg-sky-300 px-6 text-sm font-medium text-slate-950 hover:bg-sky-200"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="h-5 w-5 rounded-full border-2 border-slate-950/20 border-t-slate-950"
                          />
                        ) : (
                          <>
                            Send message
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </ContentContainer>
    </section>
  )
}
