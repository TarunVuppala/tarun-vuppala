"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, CheckCircle, MessageCircle, Calendar, ExternalLink } from "lucide-react"
import { budgetRanges, timelines, projectTypes, contactInfo } from "@/lib/data";
import Link from "next/link"

export default function ContactPage() {
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
      if (!json.success) {
        throw new Error(json.error || "Unknown error during submission.")
      }
      submissionSucceeded = true
      setIsSubmitted(true)
    } catch (err) {
      console.error("Form submission error:", err)
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
      if (submissionSucceeded) {
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
    }
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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? Let's discuss how we can bring your ideas to life.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <Card className="border-border/50 shadow-2xl">
                  <CardContent className="p-6 sm:p-8">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-12 sm:py-16"
                      >
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}>
                          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-6" />
                        </motion.div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Thanks, {formData.name}!</h3>
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
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0 }}
                          className="mb-6"
                        >
                          <label className="block text-sm font-medium mb-2">
                            What's your reason for contacting me? *
                          </label>
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
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
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
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
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
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
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
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: 0.4 }}
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
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: 0.5 }}
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
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.6, delay: 0.6 }}
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
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: formData.contactReason === "hire" ? 0.7 : 0.4 }}
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
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: formData.contactReason === "hire" ? 0.8 : 0.5 }}
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
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2 space-y-6 sm:space-y-8"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Let's Connect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat
                    about technology and development.
                  </p>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
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
                {/* Services */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-4 text-center">Services I Offer</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Web Development",
                          "Mobile Apps",
                          "API Development",
                          "UI/UX Design",
                          "Consulting",
                          "Code Review",
                        ].map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                {/* Quick Response */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Card className="border-border/50">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Quick Response Guaranteed</h4>
                      <p className="text-sm text-muted-foreground">
                        I typically respond within a few hours. For urgent matters, feel free to reach out directly via
                        email or mention "URGENT" in your subject line.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
