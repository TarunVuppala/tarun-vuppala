"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import {
	ExternalLink,
	Github,
	Calendar,
	ArrowRight,
	Star,
	Users,
	Clock,
	Info,
	X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { allProjects as projects, getTechIcon } from "@/lib/data"
import Link from "next/link"

type ProjectCardProps = {
	project: Project
	onSelect: (project: Project) => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
	return (
		<div className="project-card h-[360px] w-[85vw] shrink-0 snap-start sm:h-[390px] sm:w-[70vw] lg:h-[430px] lg:w-[440px]">
			<Card className="relative flex h-full flex-col overflow-hidden border border-border bg-card">
				<div className="relative overflow-hidden">
					<Image
						src={project.image || "/placeholder.svg"}
						alt={project.title}
						width={1000}
						height={520}
						className="h-60 w-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/40" />
				</div>

				<CardContent className="flex flex-1 flex-col space-y-3 p-5">
					<div className="flex flex-wrap items-start justify-between gap-3">
						<div className="space-y-2">
							<h3 className="text-xl font-bold">{project.title}</h3>
							<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span>{project.subtitle}</span>
								<span>•</span>
								<span className="inline-flex items-center gap-1">
									<Calendar className="h-3 w-3" />
									{project.date}
								</span>
							</div>
						</div>
						<div className="flex gap-2">
							{project.liveUrl && (
								<Button size="sm" variant="outline" asChild>
									<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
										<ExternalLink className="h-4 w-4" />
									</Link>
								</Button>
							)}
							{project.githubUrl && (
								<Button size="sm" variant="outline" asChild>
									<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
										<Github className="h-4 w-4" />
									</Link>
								</Button>
							)}
							<Button size="sm" variant="outline" onClick={() => onSelect(project)}>
								<Info className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="flex flex-wrap gap-1.5 -space-x-4">
						{project.tech.map((tech, techIndex) => (
							<div key={tech}>
								<div
									className={`group/tech relative flex h-8 w-8 items-center justify-center rounded-full border border-dark bg-background transition-[margin] duration-200 delay-75 ease-in-out ${
										techIndex === 0 ? "hover:mr-2" : "hover:mx-2"
									}`}
								>
									<img
										src={getTechIcon(tech)}
										alt={tech}
										className="h-4 w-4 object-contain"
										loading="lazy"
										decoding="async"
										onError={(event) => {
											event.currentTarget.src = "/placeholder.svg"
										}}
									/>
									<span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover/tech:opacity-100">
										{tech}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex gap-4 text-sm">
						{Object.entries(project.stats).map(([key, value]) => (
							<div key={key} className="flex items-center gap-1 text-muted-foreground">
								{key === "users" && <Users className="h-3 w-3" />}
								{key === "performance" && <Clock className="h-3 w-3" />}
								{key === "rating" && <Star className="h-3 w-3" />}
								<span className="text-xs">{value}</span>
							</div>
						))}
					</div>

					<div className="flex-1">
						<span className="text-sm font-medium text-green-400">Impact:</span>
						<p className="mt-1 text-sm font-medium text-green-400">{project.impact}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default function ProjectsSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const [endX, setEndX] = useState(0)

	const router = useRouter()
	const featuredProjects = projects.filter((project) => project.featured)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
	})

	useEffect(() => {
		const measure = () => {
			if (!contentRef.current) return
			const contentWidth = contentRef.current.scrollWidth
			const viewportWidth = window.innerWidth
			const distance = contentWidth - viewportWidth + 64
			setEndX(Math.max(0, distance))
		}

		measure()
		const ro = new ResizeObserver(measure)
		if (contentRef.current) {
			ro.observe(contentRef.current)
		}
		window.addEventListener("resize", measure)
		return () => {
			window.removeEventListener("resize", measure)
			ro.disconnect()
		}
	}, [])

	const x = useTransform(scrollYProgress, [0, 1], [0, -endX])

	const closeModal = () => {
		setSelectedProject(null)
	}

	return (
		<section id="projects" ref={sectionRef} className="relative bg-background h-[320vh] md:h-[380vh]">
			<div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden">
				{/* Header */}
				<div className="relative left-0 right-0 z-10 w-full text-center pt-[calc(var(--nav-height,72px)+16px)] sm:pt-[calc(var(--nav-height,72px)+20px)] lg:pt-[calc(var(--nav-height,72px)+24px)]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						data-projects-line
						className="h-px bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8 w-[200px] origin-left"
					/>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.05 }}
						className="text-xs uppercase tracking-widest text-muted-foreground mb-2"
					>
						Curated Works
					</motion.p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
					>
						Projects
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.15 }}
						className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
					>
						Real problems solved with thoughtful engineering and modern technology
					</motion.p>
				</div>

				{/* Horizontal Row */}
				<motion.div
					ref={contentRef}
					style={{ x }}
					className="pt-4 sm:pt-6 lg:pt-10 flex h-auto w-full flex-row items-stretch gap-3 px-4 sm:px-8 lg:items-center lg:gap-4 lg:px-16 will-change-transform"
				>
					{featuredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
					))}

					{/* View all */}
					<div className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[440px] h-[360px] sm:h-[390px] lg:h-[430px]">
						<Card className="relative overflow-hidden border border-border bg-card h-full flex items-center justify-center">
							<CardContent className="text-center p-6">
								<div
									className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
									onClick={() => router.push("/projects")}
								>
									<ArrowRight className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-2xl font-bold mb-4">
									View All Projects
								</h3>
								<p className="text-muted-foreground mb-6">
									Explore my complete portfolio including experimental projects and open source contributions.
								</p>
								<Button onClick={() => router.push("/projects")} className="bg-primary">
									See More Projects
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* End spacer so it can slide further left */}
					<div className="hidden lg:block shrink-0 w-[24vw]" />
				</motion.div>
			</div>

			<AnimatePresence>
				{selectedProject && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/95"
						onClick={closeModal}
					>
						<motion.div
							initial={{ scale: 0.96, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.96, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-6 sm:p-8">
								<div className="flex items-center justify-between mb-6 sm:mb-8">
									<div>
										<h3 className="text-2xl sm:text-3xl font-bold mb-2">
											{selectedProject.title}
										</h3>
										<p className="text-muted-foreground">
											{selectedProject.subtitle}
										</p>
									</div>
									<Button size="sm" variant="ghost" onClick={closeModal}>
										<X className="w-5 h-5" />
									</Button>
								</div>

								<div className="grid md:grid-cols-2 gap-6 sm:gap-8">
									<div className="space-y-6">
										<div>
											<h4 className="font-semibold text-lg mb-3 text-red-400">The Challenge</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.challenge}</p>
										</div>
										<div>
											<h4 className="font-semibold text-lg mb-3 text-blue-400">My Approach</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.approach}</p>
										</div>
									</div>

									<div className="space-y-6">
										<div>
											<h4 className="font-semibold text-lg mb-3 text-green-400">Results</h4>
											<ul className="space-y-3">
												{selectedProject.details.results.map((res, idx) => (
													<li key={idx} className="text-muted-foreground flex items-start">
														<span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 shrink-0" />
														{res}
													</li>
												))}
											</ul>
										</div>

										<div>
											<h4 className="font-semibold text-lg mb-3 text-purple-400">Key Learnings</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.learnings}</p>
										</div>
									</div>
								</div>

								<div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border flex items-center gap-4">
									<h4 className="font-semibold">Technologies Used:</h4>
									<div className="flex flex-wrap gap-1.5 -space-x-4">
										{selectedProject.tech.map((tech, ti) => (
											<div key={tech}>
												<div
													className={`group/tech relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-[margin] duration-200 delay-75 ease-in-out ${ti === 0 ? "hover:mr-2.5" : "hover:mx-2.5"
														}`}
												>
													<img
														src={getTechIcon(tech)}
														alt={tech}
														className="h-5 w-5 object-contain"
														loading="lazy"
														decoding="async"
														onError={(event) => {
															event.currentTarget.src = "/placeholder.svg"
														}}
													/>
													<span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover/tech:opacity-100">
														{tech}
													</span>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section >
	)
}
