"use client"

import { useRef, useState } from "react"
import { motion, type Transition } from "framer-motion"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TypewriterText } from "../ui/typewriter-text"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import Image from "next/image"
import ContentContainer from "@/components/layout/container"
import { resumeFilePath } from "@/lib/seo"

export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollIndicatorRef = useRef<HTMLDivElement>(null)
	const scrollDotRef = useRef<HTMLDivElement>(null)
	const [isActive, setIsActive] = useState(false)
	const hoverTransition: Transition = { type: "spring", stiffness: 280, damping: 20 }

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(
		() => {
			if (!containerRef.current || !contentRef.current) return

			gsap.to(contentRef.current, {
				yPercent: 35,
				opacity: 0,
				ease: "none",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})

			gsap.from(contentRef.current.querySelectorAll("[data-hero-item]"), {
				opacity: 0,
				y: 40,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.08,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(contentRef.current.querySelectorAll("[data-hero-profile]"), {
				opacity: 0,
				scale: 0.8,
				x: -40,
				duration: 0.7,
				ease: "power2.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})

			ScrollTrigger.create({
				trigger: containerRef.current,
				start: "top 70%",
				end: "bottom 30%",
				onEnter: () => setIsActive(true),
				onEnterBack: () => setIsActive(true),
				onLeave: () => setIsActive(false),
				onLeaveBack: () => setIsActive(false),
			})

			gsap.to(contentRef.current.querySelectorAll("[data-hero-arrow]"), {
				y: 3,
				repeat: -1,
				yoyo: true,
				duration: 1.2,
				ease: "sine.inOut",
			})

			if (scrollIndicatorRef.current) {
				gsap.to(scrollIndicatorRef.current, {
					y: 6,
					repeat: -1,
					yoyo: true,
					duration: 1.4,
					ease: "sine.inOut",
				})
			}

			if (scrollDotRef.current) {
				gsap.to(scrollDotRef.current, {
					y: 8,
					repeat: -1,
					yoyo: true,
					duration: 1.4,
					ease: "sine.inOut",
				})
			}
		},
		{ scope: containerRef },
	)

	const handleScrollToProjects = () => {
		document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
	}

	const handleScrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
	}

	return (
		<section
			id="hero"
			ref={containerRef}
			className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden pt-16 pb-12"
		>
			{/* Content */}
			<ContentContainer className="relative z-10">
				<div ref={contentRef} className="w-full">
					{/* Mobile Layout - Vertical */}
					<div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:hidden">
						{/* Profile Picture - Mobile */}
						<div data-hero-profile className="flex justify-center">
							<div className="relative">
								<motion.div
									whileHover={{ scale: 1.05 }}
									transition={hoverTransition}
									className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-border"
								>
									<Image
										src="/image.png"
										alt="Tarun Vuppala"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 160px, 192px"
										priority
										draggable={false}
									/>
								</motion.div>
							</div>
						</div>

						{/* Main Title - Mobile */}
						<h1 data-hero-item className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
							<motion.span className="inline-block text-foreground" whileHover={{ scale: 1.02 }} transition={hoverTransition}>
								Tarun
							</motion.span>
							<br />
							<motion.span className="inline-block text-foreground" whileHover={{ scale: 1.02 }} transition={hoverTransition}>
								Vuppala
							</motion.span>
						</h1>

						{/* Typewriter Subtitle - Mobile */}
						<div data-hero-item className="text-lg sm:text-xl md:text-2xl text-muted-foreground min-h-6 sm:min-h-8 md:min-h-10 flex items-center justify-center">
							<TypewriterText
								texts={[
									"Full Stack Developer",
									"System Architect",
									"Problem Solver",
									"Code Craftsman",
									"Digital Innovator",
								]}
								speed={80}
								deleteSpeed={40}
								pauseTime={2500}
								key={isActive ? "active" : "inactive"}
							/>
						</div>

						{/* CTA Buttons - Mobile */}
						<div data-hero-item className="flex flex-col gap-2 justify-center items-center w-full max-w-sm pt-1">
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition} className="w-full">
								<Button
									onClick={handleScrollToProjects}
									size="lg"
									className="w-full px-5 py-2 text-sm font-semibold rounded-full"
								>
									View My Work
									<span data-hero-arrow className="ml-2 inline-flex">
										<ArrowDown className="w-3 h-3" />
									</span>
								</Button>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition} className="w-full">
								<Button
									variant="outline"
									size="lg"
									className="w-full px-5 py-2 text-sm rounded-full bg-transparent"
									onClick={handleScrollToContact}
								>
									Get In Touch
								</Button>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition} className="w-full">
								<a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
									<Button variant="ghost" size="lg" className="w-full px-5 py-2 text-sm rounded-full">
										<Download className="mr-2 w-3 h-3" />
										Resume
									</Button>
								</a>
							</motion.div>
						</div>
					</div>

					{/* Desktop Layout - Horizontal */}
					<div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
						{/* Profile Picture - Desktop */}
						<div data-hero-profile className="order-2 lg:order-1 flex justify-center">
							<div className="relative">
								<motion.div
									whileHover={{ scale: 1.05 }}
									transition={hoverTransition}
									className="relative w-56 h-56 xl:w-72 xl:h-72 rounded-full overflow-hidden border border-border"
								>
									<Image
										src="/image.png"
										alt="Tarun Vuppala"
										fill
										className="object-cover"
										sizes="(max-width: 1280px) 256px, 320px"
										priority
										draggable={false}
									/>
								</motion.div>
							</div>
						</div>

						{/* Text Content - Desktop */}
						<div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
							{/* Main Title - Desktop */}
							<h1 data-hero-item className="text-5xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
								<motion.span className="inline-block text-foreground" whileHover={{ scale: 1.05 }} transition={hoverTransition}>
									Tarun
								</motion.span>
								<br />
								<motion.span className="inline-block text-foreground" whileHover={{ scale: 1.05 }} transition={hoverTransition}>
									Vuppala
								</motion.span>
							</h1>

							{/* Typewriter Subtitle - Desktop */}
							<div data-hero-item className="text-xl xl:text-2xl 2xl:text-3xl text-muted-foreground min-h-12 flex items-center justify-center lg:justify-start">
								<TypewriterText
									texts={[
										"Full Stack Developer",
										"System Architect",
										"Problem Solver",
										"Code Craftsman",
										"Digital Innovator",
									]}
									speed={80}
									deleteSpeed={40}
									pauseTime={2500}
									key={isActive ? "active" : "inactive"}
								/>
							</div>

							{/* CTA Buttons - Desktop */}
							<div data-hero-item className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3">
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition}>
									<Button
										onClick={handleScrollToProjects}
										size="lg"
										className="px-6 py-2.5 text-base font-semibold rounded-full min-w-36"
									>
										View My Work
										<span data-hero-arrow className="ml-2 inline-flex">
											<ArrowDown className="w-4 h-4" />
										</span>
									</Button>
								</motion.div>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition}>
									<Button
										variant="outline"
										size="lg"
										className="px-6 py-2.5 text-base rounded-full bg-transparent min-w-36"
										onClick={handleScrollToContact}
									>
										Get In Touch
									</Button>
								</motion.div>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverTransition} className="w-full">
									<a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
										<Button variant="ghost" size="lg" className="w-full px-5 py-2 text-sm rounded-full">
											<Download className="mr-2 w-3 h-3" />
											Resume
										</Button>
									</a>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</ContentContainer>

			{/* Enhanced Scroll Indicator */}
			<div className="absolute bottom-3 sm:bottom-5 lg:bottom-6 left-1/2 transform -translate-x-1/2">
				<div ref={scrollIndicatorRef} className="flex flex-col items-center gap-1 sm:gap-2">
					<span className="text-xs text-muted-foreground hidden sm:block">Scroll to explore</span>
					<div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-border rounded-full flex justify-center">
						<div
							ref={scrollDotRef}
							className="w-0.5 h-2 sm:w-1 sm:h-3 bg-foreground rounded-full mt-0.5 sm:mt-1"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
