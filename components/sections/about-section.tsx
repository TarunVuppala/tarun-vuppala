"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { codingQuotes, codingStats, journeyExpanded } from "@/lib/data"
import { slowFade, smoothFade, subtleStaggerChildren } from "@/lib/motion"
import ContentContainer from "@/components/layout/container"
import { AboutEditorialVariant } from "@/components/sections/about-editorial"

const containerVariants = {
	initial: { opacity: 0, y: 40 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			...slowFade,
			...subtleStaggerChildren,
		},
	},
	exit: {
		opacity: 0,
		y: 40,
		transition: {
			...smoothFade,
			duration: 0.5,
			...subtleStaggerChildren,
			staggerDirection: -1,
		},
	},
} satisfies Variants

const itemVariants = {
	initial: { opacity: 0, scale: 0.94 },
	animate: { opacity: 1, scale: 1, transition: { ...smoothFade } },
	exit: { opacity: 0, scale: 0.94, transition: { ...smoothFade, duration: 0.45 } },
} satisfies Variants

export default function AboutSection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(containerRef, { once: false, margin: "-100px" })
	const [featuredQuote] = useState(() => codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
	const [featuredStat] = useState(() => codingStats[Math.floor(Math.random() * codingStats.length)])

	return (
		<section
			id="about"
			ref={containerRef}
			className="relative overflow-hidden bg-background py-10 sm:py-12"
		>
			<ContentContainer>
				<AnimatePresence mode="wait">
					{isInView && (
						<motion.div
							key="about-content"
							variants={containerVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className="space-y-6"
						>

							<motion.div variants={itemVariants} className="text-center mb-6">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: "200px" }}
									exit={{ width: 0 }}
									transition={{ ...slowFade, delay: 0.3 }}
									className="h-px bg-border mx-auto mb-8"
								/>
								<p className="text-xs uppercase tracking-widest text-muted-foreground">Get to know me</p>
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-2">
									About <span className="text-primary">Me</span>
								</h2>
								<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
									Passionate developer crafting meaningful digital experiences with code as my canvas.
								</p>
							</motion.div>


							<motion.div variants={itemVariants}>
								<AboutEditorialVariant
									featuredQuote={featuredQuote}
									featuredStat={featuredStat}
									journey={journeyExpanded}
								/>
							</motion.div>

						</motion.div>
					)}
				</AnimatePresence>
			</ContentContainer>
		</section>
	)
}
