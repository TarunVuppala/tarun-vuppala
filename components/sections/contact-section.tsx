"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactInfo } from "@/lib/data"
import Link from "next/link"
import ContentContainer from "@/components/layout/container"

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
	const containerRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const asideRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLDivElement>(null)

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(
		() => {
			if (!containerRef.current) return

			gsap.from(headerRef.current, {
				opacity: 0,
				y: 50,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(lineRef.current, {
				width: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(asideRef.current, {
				opacity: 0,
				x: 50,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 78%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(formRef.current, {
				opacity: 0,
				x: -50,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 78%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(containerRef.current.querySelectorAll("[data-contact-item]"), {
				opacity: 0,
				y: 16,
				duration: 0.45,
				ease: "power2.out",
				stagger: 0.08,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 75%",
					toggleActions: "play none none reverse",
				},
			})
		},
		{ scope: containerRef },
	)

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
				message: "",
			})
		}, 3000)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<section id="contact" ref={containerRef} className="py-10 sm:py-12 relative overflow-hidden mt-5">
			<ContentContainer className="relative z-10">
				{/* Header */}
				<div ref={headerRef} className="text-center mb-5">
					<div ref={lineRef} className="h-px bg-border mx-auto mb-5 w-[200px]" />
					<p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Let's Connect</p>
					<h2 className="text-4xl md:text-5xl font-bold mb-3">
						Contact
					</h2>
					<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Have a project in mind? Let's discuss how we can bring your ideas to life.
					</p>
				</div>
				<div className="grid lg:grid-cols-[1.1fr_2fr] gap-10 items-start">
					<aside ref={asideRef} className="space-y-8">
						<div className="rounded-2xl border border-border p-5">
							<h3 className="text-xl font-semibold">Contact channels</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Pick the channel that fits your timeline.
							</p>
							<div className="mt-5 space-y-4">
								{contactInfo.map((info) => (
									<div
										key={info.title}
										data-contact-item
										className="flex items-start gap-3"
									>
										<div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground">
											<info.icon className="h-4 w-4" />
										</div>
										<div>
											<p className="text-sm font-medium">{info.title}</p>
											{info.href ? (
												<Link
													href={info.href}
													className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
												>
													{info.value}
													<ExternalLink className="h-3.5 w-3.5" />
												</Link>
											) : (
												<p className="text-sm text-foreground">{info.value}</p>
											)}
											<p className="text-xs text-muted-foreground mt-1">{info.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>

					</aside>

					<div ref={formRef}>
						<div className="rounded-2xl border border-border bg-background p-5">
							{isSubmitted ? (
								<motion.div
									initial={{ scale: 0.96, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.35, ease: "easeOut" }}
									className="text-center py-12"
								>
									<motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
										<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
									</motion.div>
									<h3 className="text-2xl font-bold mb-2">Thanks, {formData.name}!</h3>
									<p className="text-muted-foreground text-sm">
										I’ll get back to you within 24 hours.
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									{errorMessage && (
										<div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
											{errorMessage}
										</div>
									)}

									<fieldset className="space-y-4">
										<div className="grid sm:grid-cols-2 gap-4">
											<div>
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
													className="h-10"
												/>
											</div>
											<div>
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
													className="h-10"
												/>
											</div>
										</div>
									</fieldset>

									<fieldset className="space-y-4">
										<div>
											<label htmlFor="message" className="block text-sm font-medium mb-2">
												Message *
											</label>
											<Textarea
												id="message"
												name="message"
												value={formData.message}
												onChange={handleChange}
												required
												rows={5}
												placeholder="Tell me what you're building or need help with."
												className="resize-none"
											/>
										</div>
									</fieldset>

									<div>
										<Button
											type="submit"
											disabled={
												isSubmitting ||
												!formData.name ||
												!formData.email ||
												!formData.message
											}
											className="w-full h-11 text-base font-semibold"
											size="lg"
										>
											{isSubmitting ? (
												<motion.div
													animate={{ rotate: 360 }}
													transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
													className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
												/>
											) : (
												<>
													Send Message
													<Send className="ml-3 w-5 h-5" />
												</>
											)}
										</Button>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</ContentContainer>
		</section>
	)
}
