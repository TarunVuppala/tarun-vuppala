"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Send, CheckCircle, MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { budgetRanges, timelines, projectTypes, contactInfo } from "@/lib/data";
import Link from "next/link"
import { hoverSpring, loopTransition, slowFade, smoothFade } from "@/lib/motion"

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactReason: "casual" as "casual" | "hire" | null,
    projectType: "",
    budget: "",
    timeline: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-20%" })

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    let submissionSucceeded = false
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || "Unknown error")
      submissionSucceeded = true
    } catch (err) {
      console.error(err)
      setErrorMessage(err instanceof Error ? err.message : "Unable to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
    if (!submissionSucceeded) {
      return
    }

    setIsSubmitted(true)

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        contactReason: "casual",
        projectType: "",
        budget: "",
        timeline: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleReasonSelect = (reason: "casual" | "hire") => {
    setFormData((prev) => ({
      ...prev,
      contactReason: reason,
      // Reset project-specific fields if switching to casual
      ...(reason === "casual" && { projectType: "", budget: "", timeline: "" }),
    }))
  }

  return (
    <section id="contact" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={isInView ? slowFade : smoothFade}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={isInView ? { ...slowFade, delay: 0.3 } : smoothFade}
            className="h-px bg-border mx-auto mb-8"
          />
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Let's{" "}
            <motion.span
              className="inline-block text-primary"
              whileHover={{ scale: 1.05, transition: hoverSpring }}
            >
              Connect
            </motion.span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={isInView ? { ...slowFade, delay: 0.15 } : smoothFade}
            className="lg:col-span-3"
          >
            <Card className="border-border shadow-sm">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div animate={{ scale: [1, 1.12, 1] }} transition={loopTransition(1.2)}>
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4">Thanks, {formData.name}!</h3>
                    <p className="text-muted-foreground text-lg">
                      I'll get back to you within 24 hours. Looking forward to our conversation!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {errorMessage}
                      </div>
                    )}
                    {/* Reason Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...smoothFade, delay: 0.05 }}
                    className="mb-6"
                  >
                      <label className="block text-sm font-medium mb-2">What's your reason for contacting me? *</label>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={formData.contactReason === "casual" ? "default" : "outline"}
                          onClick={() => handleReasonSelect("casual")}
                          className="flex-1 h-12 text-base"
                        >
                          Casual Inquiry
                        </Button>
                        <Button
                          type="button"
                          variant={formData.contactReason === "hire" ? "default" : "outline"}
                          onClick={() => handleReasonSelect("hire")}
                          className="flex-1 h-12 text-base"
                        >
                          Hire Me
                        </Button>
                      </div>
                    </motion.div>

                    {formData.contactReason && (
                      <>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ ...smoothFade, delay: 0.15 }}
                          >
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                              Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your name"
                              className="h-12"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ ...smoothFade, delay: 0.22 }}
                          >
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your.email@example.com"
                              className="h-12"
                            />
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ ...smoothFade, delay: 0.3 }}
                        >
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder={formData.contactReason === "hire" ? "Project Inquiry" : "General Question"}
                            className="h-12"
                          />
                        </motion.div>

                        {formData.contactReason === "hire" && (
                          <div className="grid sm:grid-cols-3 gap-4">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ ...smoothFade, delay: 0.38 }}
                            >
                              <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                                Project Type
                              </label>
                              <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className="w-full h-12 px-3 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="">Select type</option>
                                {projectTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ ...smoothFade, delay: 0.46 }}
                            >
                              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                Budget Range
                              </label>
                              <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full h-12 px-3 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="">Select budget</option>
                                {budgetRanges.map((range) => (
                                  <option key={range} value={range}>
                                    {range}
                                  </option>
                                ))}
                              </select>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ ...smoothFade, delay: 0.54 }}
                            >
                              <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                                Timeline
                              </label>
                              <select
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                className="w-full h-12 px-3 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="">Select timeline</option>
                                {timelines.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </motion.div>
                          </div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            ...smoothFade,
                            delay: formData.contactReason === "hire" ? 0.62 : 0.36,
                          }}
                        >
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            placeholder={
                              formData.contactReason === "hire"
                                ? "Tell me about your project, goals, and any specific requirements..."
                                : "What's on your mind?"
                            }
                            className="resize-none"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            ...smoothFade,
                            delay: formData.contactReason === "hire" ? 0.72 : 0.44,
                          }}
                        >
                          <Button
                            type="submit"
                            disabled={
                              isSubmitting ||
                              !formData.name ||
                              !formData.email ||
                              !formData.subject ||
                              !formData.message ||
                              (formData.contactReason === "hire" &&
                                (!formData.projectType || !formData.budget || !formData.timeline))
                            }
                            className="w-full h-12 text-lg font-semibold"
                            size="lg"
                          >
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ ...loopTransition(1, { repeatType: "loop" }), ease: "linear" }}
                                className="w-6 h-6 border-2 border-background/30 border-t-background rounded-full"
                              />
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-3 w-5 h-5" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={isInView ? { ...slowFade, delay: 0.28 } : smoothFade}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat about
                technology and development.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.slice(0, 2).map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...smoothFade, delay: 0.4 + index * 0.08 }}
                  whileHover={{ scale: 1.02, transition: hoverSpring }}
                >
                  <Card className="border-border/50 hover:border-border transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center ${info.color}`}
                        >
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{info.title}</h3>
                          {info.href ? (
                            <Link
                              href={info.href}
                              className="text-foreground hover:text-primary transition-colors font-medium flex items-center"
                            >
                              {info.value}
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </Link>
                          ) : (
                            <p className="text-foreground font-medium">{info.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={isInView ? { ...slowFade, delay: 0.76 } : smoothFade}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Quick Response Guaranteed</h4>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within a few hours. For urgent matters, feel free to reach out directly via
                    email.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
