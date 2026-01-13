"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { Quote } from "lucide-react"
import { codingQuotes, codingStats, highlights, journeyExpanded } from "@/lib/data"
import { hoverSpring, slowFade, smoothFade, subtleStaggerChildren } from "@/lib/motion"
import ContentContainer from "@/components/layout/container"

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
			className="relative overflow-hidden bg-background py-16 sm:py-24"
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
							className="space-y-10"
						>

							<motion.div variants={itemVariants} className="text-center mb-10">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: "200px" }}
									exit={{ width: 0 }}
									transition={{ ...slowFade, delay: 0.3 }}
									className="h-px bg-border mx-auto mb-8"
								/>
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
									About{" "}
									<motion.span className="inline-block text-primary" whileHover={{ scale: 1.05 }} transition={hoverSpring}>
										Me
									</motion.span>
								</h2>
								<p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
									Passionate developer crafting meaningful digital experiences with code as my canvas.
								</p>
							</motion.div>


							<motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
								<div className="space-y-6">
									<div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
										<p className="text-sm uppercase tracking-widest text-primary">Story</p>
										<h3 className="mt-3 text-2xl font-semibold">Building with intent, shipping with care</h3>
										<div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
											<p>
												Hey there! I'm <span className="text-primary font-semibold">Tarun Vuppala</span>, a Computer Science student who turned late-night coding curiosity into a passion for building scalable web solutions.
											</p>
											<p>
												From internships solving real-world challenges to dreaming of my own startup, I thrive on clean design and innovative problem-solving.
											</p>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<motion.div
											variants={itemVariants}
											whileHover={{ y: -4 }}
											transition={hoverSpring}
											className="rounded-xl border border-border bg-card p-4"
										>
											<p className="text-xs uppercase tracking-widest text-muted-foreground">Focus</p>
											<p className="mt-2 text-lg font-semibold text-foreground">Product polish + performance</p>
											<p className="mt-2 text-sm text-muted-foreground">
												Design systems, animation, and careful API boundaries.
											</p>
										</motion.div>
										<motion.div
											variants={itemVariants}
											whileHover={{ y: -4 }}
											transition={hoverSpring}
											className="rounded-xl border border-border bg-card p-4"
										>
											<p className="text-xs uppercase tracking-widest text-muted-foreground">Values</p>
											<p className="mt-2 text-lg font-semibold text-foreground">Clarity over complexity</p>
											<p className="mt-2 text-sm text-muted-foreground">
												Clean architecture, reliable delivery, and usable UI.
											</p>
										</motion.div>
									</div>
								</div>

								<div className="space-y-6">
									<motion.div
										variants={itemVariants}
										className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6"
									>
										<div className="absolute inset-x-0 top-0 h-1 bg-primary/60" />
										<Quote className="absolute right-5 top-5 h-10 w-10 text-primary/20" />
										<motion.blockquote
											className="text-lg md:text-xl font-light italic text-foreground pr-8"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1, transition: { ...slowFade, duration: 1.2 } }}
										>
											{featuredQuote}
										</motion.blockquote>
									</motion.div>

									<motion.div
										variants={itemVariants}
										whileHover={{ scale: 1.02 }}
										transition={hoverSpring}
										className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
									>
										<featuredStat.icon className="w-8 h-8 text-primary" />
										<div>
											<p className="font-medium">Fun Fact</p>
											<p className="text-sm text-muted-foreground">{featuredStat.text}</p>
										</div>
									</motion.div>
								</div>
							</motion.div>

							{/* Experience */}
							<motion.div variants={itemVariants} className="space-y-6">
								<div className="text-center">
									<h3 className="text-2xl font-bold">Experience</h3>
									<p className="text-muted-foreground mt-2">
										Roles where I shipped real products and learned fast.
									</p>
								</div>
								<div className="w-full space-y-6">
									{journeyExpanded.map((item, index) => (
										<motion.div
											key={`${item.year}-${item.company}`}
											initial={{ opacity: 0, y: 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ ...smoothFade, delay: index * 0.08 }}
											className="border-b border-border pb-6"
										>
											<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
												<div>
													<h4 className="text-xl font-semibold">{item.title}</h4>
													<p className="text-sm text-muted-foreground">{item.company}</p>
												</div>
												<span className="text-sm text-muted-foreground">{item.year}</span>
											</div>
											<p className="mt-4 text-muted-foreground">{item.description}</p>
											<ul className="mt-4 space-y-2">
												{item.achievements.map((achievement, achievementIndex) => (
													<li
														key={achievementIndex}
														className="text-sm text-muted-foreground flex items-start"
													>
														<span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 shrink-0" />
														{achievement}
													</li>
												))}
											</ul>
										</motion.div>
									))}
								</div>
							</motion.div>

						</motion.div>
					)}
				</AnimatePresence>
			</ContentContainer>
		</section>
	)
}
