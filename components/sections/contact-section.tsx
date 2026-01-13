"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Send, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { budgetRanges, timelines, projectTypes, contactInfo } from "@/lib/data";
import Link from "next/link"
import { hoverSpring, loopTransition, slowFade, smoothFade } from "@/lib/motion"
import ContentContainer from "@/components/layout/container"

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
		<section id="contact" ref={containerRef} className="py-14 relative overflow-hidden">
			<ContentContainer className="relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={isInView ? slowFade : smoothFade}
					className="text-center mb-8"
				>
					<motion.div
						initial={{ width: 0 }}
						animate={isInView ? { width: "200px" } : {}}
						transition={isInView ? { ...slowFade, delay: 0.3 } : smoothFade}
						className="h-px bg-border mx-auto mb-5"
					/>
					<h2 className="text-4xl md:text-5xl font-bold mb-3">
						Let's{" "}
						<motion.span
							className="inline-block text-primary"
							whileHover={{ scale: 1.05, transition: hoverSpring }}
						>
							Connect
						</motion.span>
					</h2>
					<p className="text-base text-muted-foreground max-w-2xl mx-auto">
						Have a project in mind? Let's discuss how we can bring your ideas to life.
					</p>
				</motion.div>
				<div className="grid lg:grid-cols-[1.1fr_2fr] gap-10 items-start">
					<motion.aside
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={isInView ? { ...slowFade, delay: 0.28 } : smoothFade}
						className="space-y-8"
					>
						<div className="rounded-2xl border border-border p-5">
							<h3 className="text-xl font-semibold">Contact channels</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Pick the channel that fits your timeline.
							</p>
							<div className="mt-5 space-y-4">
								{contactInfo.map((info, index) => (
									<motion.div
										key={info.title}
										initial={{ opacity: 0, y: 16 }}
										animate={isInView ? { opacity: 1, y: 0 } : {}}
										transition={{ ...smoothFade, delay: 0.4 + index * 0.08 }}
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
									</motion.div>
								))}
							</div>
						</div>

						<div className="rounded-2xl border border-border p-5">
							<h3 className="text-xl font-semibold">How we’ll work</h3>
							<ol className="mt-4 space-y-3 text-sm text-muted-foreground">
								<li className="flex items-start gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Quick context call to align on scope and timeline.
								</li>
								<li className="flex items-start gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Clear proposal with milestones and deliverables.
								</li>
								<li className="flex items-start gap-2">
									<span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
									Weekly updates until launch.
								</li>
							</ol>
						</div>
					</motion.aside>

					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={isInView ? { ...slowFade, delay: 0.15 } : smoothFade}
					>
						<div className="rounded-2xl border border-border bg-background p-5">
							{isSubmitted ? (
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className="text-center py-12"
								>
									<motion.div animate={{ scale: [1, 1.12, 1] }} transition={loopTransition(1.2)}>
										<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
									</motion.div>
									<h3 className="text-2xl font-bold mb-2">Thanks, {formData.name}!</h3>
									<p className="text-muted-foreground text-sm">
										I’ll get back to you within 24 hours.
									</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-8">
									{errorMessage && (
										<div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
											{errorMessage}
										</div>
									)}

									<fieldset className="space-y-4">
										<legend className="text-xs uppercase tracking-widest text-muted-foreground">Reason</legend>
										<div className="grid grid-cols-2 gap-3">
											<Button
												type="button"
												variant={formData.contactReason === "casual" ? "default" : "outline"}
												onClick={() => handleReasonSelect("casual")}
												className="h-10 text-base"
											>
												Casual Inquiry
											</Button>
											<Button
												type="button"
												variant={formData.contactReason === "hire" ? "default" : "outline"}
												onClick={() => handleReasonSelect("hire")}
												className="h-10 text-base"
											>
												Hire Me
											</Button>
										</div>
									</fieldset>

									{formData.contactReason && (
										<>
											<fieldset className="space-y-4">
												<legend className="text-xs uppercase tracking-widest text-muted-foreground">Basics</legend>
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
												<div>
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
														className="h-10"
													/>
												</div>
											</fieldset>

											{formData.contactReason === "hire" && (
												<fieldset className="space-y-4">
													<legend className="text-xs uppercase tracking-widest text-muted-foreground">Project details</legend>
													<div className="grid sm:grid-cols-3 gap-4">
														<div>
															<label htmlFor="projectType" className="block text-sm font-medium mb-2">
																Project Type
															</label>
															<select
																id="projectType"
																name="projectType"
																value={formData.projectType}
																onChange={handleChange}
																className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
															>
																<option value="">Select type</option>
																{projectTypes.map((type) => (
																	<option key={type} value={type}>
																		{type}
																	</option>
																))}
															</select>
														</div>
														<div>
															<label htmlFor="budget" className="block text-sm font-medium mb-2">
																Budget Range
															</label>
															<select
																id="budget"
																name="budget"
																value={formData.budget}
																onChange={handleChange}
																className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
															>
																<option value="">Select budget</option>
																{budgetRanges.map((range) => (
																	<option key={range} value={range}>
																		{range}
																	</option>
																))}
															</select>
														</div>
														<div>
															<label htmlFor="timeline" className="block text-sm font-medium mb-2">
																Timeline
															</label>
															<select
																id="timeline"
																name="timeline"
																value={formData.timeline}
																onChange={handleChange}
																className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
															>
																<option value="">Select timeline</option>
																{timelines.map((time) => (
																	<option key={time} value={time}>
																		{time}
																	</option>
																))}
															</select>
														</div>
													</div>
												</fieldset>
											)}

											<fieldset className="space-y-4">
												<legend className="text-xs uppercase tracking-widest text-muted-foreground">Message</legend>
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
														placeholder={
															formData.contactReason === "hire"
																? "Tell me about your project, goals, and any specific requirements..."
																: "What's on your mind?"
														}
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
														!formData.subject ||
														!formData.message ||
														(formData.contactReason === "hire" &&
															(!formData.projectType || !formData.budget || !formData.timeline))
													}
													className="w-full h-11 text-base font-semibold"
													size="lg"
												>
													{isSubmitting ? (
														<motion.div
															animate={{ rotate: 360 }}
															transition={{ ...loopTransition(1, { repeatType: "loop" }), ease: "linear" }}
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
										</>
									)}
								</form>
							)}
						</div>
					</motion.div>
				</div>
			</ContentContainer>
		</section>
	)
}
