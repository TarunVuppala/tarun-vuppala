"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { codingQuotes, codingStats, journeyExpanded } from "@/lib/data"
import ContentContainer from "@/components/layout/container"
import { AboutEditorialVariant } from "@/components/sections/about-editorial"

export default function AboutSection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const lineRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const glowRef = useRef<HTMLDivElement>(null)
	const [featuredQuote] = useState(() => codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
	const [featuredStat] = useState(() => codingStats[Math.floor(Math.random() * codingStats.length)])

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(
		() => {
			if (!containerRef.current) return

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					end: "bottom 20%",
					scrub: 0.6,
				},
			})

			timeline
				.from(headerRef.current, { opacity: 0, y: 40, ease: "power2.out", duration: 0.6 }, 0)
				.from(lineRef.current, { scaleX: 0, ease: "power2.out", duration: 0.6 }, 0.05)
				.from(
					contentRef.current?.querySelectorAll("[data-about-card]") ?? [],
					{
						opacity: 0,
						y: 24,
						rotateX: 6,
						transformPerspective: 800,
						ease: "power2.out",
						duration: 0.6,
						stagger: 0.12,
					},
					0.12,
				)
				.from(
					contentRef.current?.querySelectorAll("[data-about-fact]") ?? [],
					{
						opacity: 0,
						y: 12,
						ease: "power2.out",
						duration: 0.4,
					},
					0.22,
				)
				.from(
					contentRef.current?.querySelectorAll("[data-about-item]") ?? [],
					{
						opacity: 0,
						y: 14,
						ease: "power2.out",
						duration: 0.45,
						stagger: 0.06,
					},
					0.24,
				)

			if (glowRef.current) {
				gsap.to(glowRef.current, {
					yPercent: -18,
					opacity: 0.6,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				})
			}
		},
		{ scope: containerRef },
	)

	return (
		<section
			id="about"
			ref={containerRef}
			className="relative overflow-hidden bg-background py-10 sm:py-12"
		>
			<div
				ref={glowRef}
				className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_65%)] blur-3xl"
			/>
			<ContentContainer>
				<div className="space-y-6">
					<div ref={headerRef} className="text-center mb-6">
						<div ref={lineRef} className="h-px bg-border mx-auto mb-8 w-[200px] origin-left" />
						<p className="text-xs uppercase tracking-widest text-muted-foreground">Get to know me</p>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-2">
							About <span className="text-primary">Me</span>
						</h2>
						<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Passionate developer crafting meaningful digital experiences with code as my canvas.
						</p>
					</div>

					<div ref={contentRef}>
						<AboutEditorialVariant
							featuredQuote={featuredQuote}
							featuredStat={featuredStat}
							journey={journeyExpanded}
						/>
					</div>
				</div>
			</ContentContainer>
		</section>
	)
}
