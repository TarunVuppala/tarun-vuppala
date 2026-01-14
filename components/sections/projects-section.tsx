"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
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
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

type ProjectCardProps = {
	project: Project
	onSelect: (p: Project) => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
	return (
		<div className="project-card shrink-0 w-[85vw] sm:w-[70vw] lg:w-[440px] h-[360px] sm:h-[390px] lg:h-[430px] snap-start">
			<Card className="relative overflow-hidden border border-border bg-card h-full flex flex-col">
				<div className="relative overflow-hidden">
					<Image
						src={project.image || "/placeholder.svg"}
						alt={project.title}
						width={1000}
						height={520}
						className="w-full h-60 object-cover"
					/>
					<div className="absolute inset-0 bg-black/40" />
				</div>

				<CardContent className="p-5 space-y-3 flex-1 flex flex-col">
					<div>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<h3 className="text-xl font-bold">{project.title}</h3>
							<div className="flex gap-2">
								<Button size="sm" variant="outline" asChild>
									<Link href={project.liveUrl ?? "#"} target="_blank">
										<ExternalLink className="w-4 h-4" />
									</Link>
								</Button>
								<Button size="sm" variant="outline" asChild>
									<Link href={project.githubUrl ?? "#"} target="_blank">
										<Github className="w-4 h-4" />
									</Link>
								</Button>
								<Button size="sm" variant="outline" onClick={() => onSelect(project)}>
									<Info className="w-4 h-4" />
								</Button>
							</div>
							<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
								<span>{project.subtitle}</span>
								<span>•</span>
								<span className="inline-flex items-center gap-1">
									<Calendar className="w-3 h-3" />
									{project.date}
								</span>
							</div>
						</div>

						<div className="flex flex-wrap gap-1.5 -space-x-4">
							{project.tech.map((tech, techIndex) => (
								<div key={tech}>
									<div
										className={`group/tech relative flex h-8 w-8 items-center justify-center rounded-full border border-dark bg-background transition-[margin] duration-200 delay-75 ease-in-out ${techIndex === 0 ? "hover:mr-2" : "hover:mx-2"
											}`}
									>
										<img
											src={getTechIcon(tech)}
											alt={tech}
											className="h-4 w-4 object-contain"
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
							{/* {project.tech.length > 5 && (
							<Badge variant="outline" className="text-xs">
								+{project.tech.length - 5}
							</Badge>
						)} */}
						</div>

						<div className="flex gap-4 text-sm">
							{Object.entries(project.stats).map(([key, value]) => (
								<div key={key} className="flex items-center gap-1 text-muted-foreground">
									{key === "users" && <Users className="w-3 h-3" />}
									{key === "performance" && <Clock className="w-3 h-3" />}
									{key === "rating" && <Star className="w-3 h-3" />}
									<span className="text-xs">{value}</span>
								</div>
							))}
						</div>

						<div className="flex-1">
							<span className="font-medium text-green-400 text-sm">Impact:</span>
							<p className="text-green-400 mt-1 font-medium text-sm">{project.impact}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default function ProjectsSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const pinRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)

	const router = useRouter()
	const featuredProjects = projects.filter((project) => project.featured)

	gsap.registerPlugin(useGSAP, ScrollTrigger)

	useGSAP(
		() => {
			if (!sectionRef.current || !trackRef.current || !pinRef.current) return

			const EXTRA_TRAVEL_PX = 100

			let scrollAmount = 0

			const compute = () => {
				const trackWidth = trackRef.current?.scrollWidth ?? 0
				const viewport = pinRef.current?.clientWidth ?? window.innerWidth
				scrollAmount = Math.max(0, trackWidth - viewport + EXTRA_TRAVEL_PX)
				return scrollAmount
			}

			const isTouch = ScrollTrigger.isTouch > 0

			const tween = gsap.to(trackRef.current, {
				x: () => -scrollAmount,
				ease: "none",
				overwrite: "auto",
				scrollTrigger: {
					id: "projects-pin",
					trigger: pinRef.current,
					pin: pinRef.current,
					pinType: isTouch ? "fixed" : "transform",
					start: "top top",
					end: () => `+=${compute()}`,
					scrub: 0.6,
					anticipatePin: 1,
					pinSpacing: true,
					invalidateOnRefresh: true,
					refreshPriority: 1,
				},
			})

			const ro = new ResizeObserver(() => ScrollTrigger.refresh())
			if (trackRef.current) {
				ro.observe(trackRef.current)
			}

			const onResize = () => ScrollTrigger.refresh()
			window.addEventListener("resize", onResize)

			const onLoad = () => ScrollTrigger.refresh()
			window.addEventListener("load", onLoad)

			return () => {
				window.removeEventListener("resize", onResize)
				window.removeEventListener("load", onLoad)
				ro.disconnect()
				tween.scrollTrigger?.kill()
				tween.kill()
			}
		},
		{ scope: sectionRef, dependencies: [] }
	)

	useGSAP(
		() => {
			if (!sectionRef.current) return

			gsap.from(headerRef.current, {
				opacity: 0,
				y: 50,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})

			gsap.from(headerRef.current?.querySelectorAll("[data-projects-line]") ?? [], {
				scaleX: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
			})
		},
		{ scope: sectionRef },
	)

	const closeModal = () => {
		setSelectedProject(null)
	}

	return (
		<section id="projects" ref={sectionRef} className="relative bg-background">
			<div
				ref={pinRef}
				className="relative flex min-h-screen flex-col items-start gap-6 overflow-x-hidden overflow-y-visible will-change-transform sm:gap-8 lg:min-h-screen lg:flex-row lg:items-center lg:gap-0"
			>

				{/* Header */}
				<div ref={headerRef} className="relative left-0 right-0 z-10 text-center pt-6 sm:pt-8 lg:absolute lg:top-20 lg:pt-0">
					<div data-projects-line className="h-px bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8 w-[200px] origin-left" />
					<p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
						Curated Works
					</p>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
						Projects
					</h2>
					<p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Real problems solved with thoughtful engineering and modern technology
					</p>
				</div>

				{/* Horizontal Row */}
				<motion.div
					className="pt-2 sm:pt-4 lg:pt-52 h-auto lg:h-full w-full px-4 sm:px-8 lg:px-16 overflow-hidden touch-pan-y"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<div
						ref={trackRef}
						className="flex h-full flex-row items-stretch gap-3 px-2 sm:px-4 lg:items-center lg:gap-4 lg:px-6 will-change-transform snap-x snap-mandatory"
					>
						{featuredProjects.map((project) => (
							<ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
						))}

						{/* View all */}
						<div className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[440px] h-[360px] sm:h-[390px] lg:h-[430px] snap-start lg:mr-96">
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
					</div>
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
