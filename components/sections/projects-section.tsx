"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
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
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { allProjects as projects, skillsByDomain } from "@/lib/data"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { hoverSpring, loopTransition, slowFade, smoothFade } from "@/lib/motion"
import ContentContainer from "@/components/layout/container"

type ProjectCardProps = {
	project: Project
	index: number
	onSelect: (p: Project) => void
}

const MotionImage = motion(Image)

const techLogoOverrides: Record<string, string> = {
	react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	"react.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	"react native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	"next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
	"node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	"express.js": "https://cdn.simpleicons.org/express/white",
	mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
	postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
	prisma: "https://cdn.simpleicons.org/prisma/white",
	tailwind: "https://cdn.simpleicons.org/tailwindcss/white",
	"tailwind css": "https://cdn.simpleicons.org/tailwindcss/white",
	typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
	javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
	"framer motion": "https://cdn.simpleicons.org/framer/white",
	"socket.io": "https://cdn.simpleicons.org/socketdotio/white",
	sockio: "https://cdn.simpleicons.org/socketdotio/white",
	jwt: "https://cdn.simpleicons.org/jsonwebtokens/white",
	razorpay: "https://cdn.simpleicons.org/razorpay/white",
	"shadcn ui": "https://cdn.simpleicons.org/shadcnui/white",
	shadcn: "https://cdn.simpleicons.org/shadcnui/white",
	"three.js": "https://cdn.simpleicons.org/threedotjs/white",
	"three js": "https://cdn.simpleicons.org/threedotjs/white",
	blender: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
	ffmpeg: "https://cdn.simpleicons.org/ffmpeg/white",
	ffmped: "https://cdn.simpleicons.org/ffmpeg/white",
	nodemailer: "/icons/nodemailer.svg",
	indexeddb: "/icons/indexeddb.svg",
	"indexed db": "/icons/indexeddb.svg",
	"transaction management": "/icons/transaction-management.svg",
	"adobe cep": "/icons/adobe-cep.svg",
	"ppro api": "/icons/ppro-api.svg",
	uxp: "/icons/uxp.svg",
	"qr parser": "/icons/qr-parser.svg",
	ollama: "/icons/ollama.svg",
	"llama 3.2": "/icons/llama.svg",
	"pdf-parser": "/icons/pdf-parser.svg",
}

const normalizeTechName = (value: string) => value.toLowerCase().trim()

const techLogoMap = new Map<string, string>()
skillsByDomain.forEach((category) => {
	category.skills.forEach((skill) => {
		techLogoMap.set(normalizeTechName(skill.name), skill.logo || "/placeholder.svg")
	})
})
Object.entries(techLogoOverrides).forEach(([name, logo]) => {
	techLogoMap.set(normalizeTechName(name), logo)
})

const getTechLogo = (tech: string) =>
	techLogoMap.get(normalizeTechName(tech)) || "/placeholder.svg"

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ ...smoothFade, delay: index * 0.12 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className="group project-card shrink-0 w-[560px] h-[430px]"
		>
			<Card className="relative overflow-hidden border border-border transition-all duration-300 bg-card h-full flex flex-col">
				<div className="relative overflow-hidden">
					<MotionImage
						src={project.image || "/placeholder.svg"}
						alt={project.title}
						width={1000}
						height={520}
						className="w-full h-60 object-cover"
						animate={{ scale: isHovered ? 1.08 : 1 }}
						transition={{ ...smoothFade, duration: 0.6 }}
					/>
					<motion.div
						className="absolute inset-0 bg-black/40"
						animate={{ opacity: isHovered ? 0.75 : 1 }}
						transition={{ ...smoothFade, duration: 0.35 }}
					/>

					<motion.div
						className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/80 bg-black/50 rounded-full px-3 py-1"
						whileHover={{ scale: 1.03, transition: hoverSpring }}
					>
						<Calendar className="w-3 h-3" />
						{project.date}
					</motion.div>
				</div>

				<CardContent className="p-5 space-y-3 flex-1 flex flex-col">
					<div>
						<motion.h3
							className="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer"
							whileHover={{ x: 4, transition: hoverSpring }}
						>
							{project.title}
						</motion.h3>
						<p className="text-sm text-muted-foreground">{project.subtitle}</p>
					</div>

					<div className="flex flex-wrap -space-x-1">
						{project.tech.slice(0, 5).map((tech, techIndex) => (
							<motion.div
								key={tech}
								initial={{ opacity: 0, scale: 0.92 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ ...smoothFade, delay: index * 0.08 + techIndex * 0.05 }}
								whileHover={{ scale: 1.05, transition: hoverSpring }}
								whileTap={{ scale: 0.98, transition: hoverSpring }}
							>
								<div className="group/tech relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 hover:z-10">
									<img
										src={getTechLogo(tech)}
										alt={tech}
										className="h-5 w-5 object-contain"
										onError={(event) => {
											event.currentTarget.style.display = "none"
										}}
									/>
									<span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover/tech:opacity-100">
										{tech}
									</span>
								</div>
							</motion.div>
						))}
						{project.tech.length > 5 && (
							<Badge variant="outline" className="text-xs">
								+{project.tech.length - 5}
							</Badge>
						)}
					</div>

					<div className="flex gap-4 text-sm">
						{Object.entries(project.stats).map(([key, value], statIndex) => (
							<motion.div
								key={key}
								className="flex items-center gap-1 text-muted-foreground"
								whileHover={{ scale: 1.06, color: "hsl(var(--primary))" }}
								transition={{ ...smoothFade, delay: statIndex * 0.06 }}
							>
								{key === "users" && <Users className="w-3 h-3" />}
								{key === "performance" && <Clock className="w-3 h-3" />}
								{key === "rating" && <Star className="w-3 h-3" />}
								<span className="text-xs">{value}</span>
							</motion.div>
						))}
					</div>

					<div className="flex-1">
						<span className="font-medium text-green-400 text-sm">Impact:</span>
						<motion.p
							className="text-green-400 mt-1 font-medium text-sm"
							whileHover={{ x: 4, transition: hoverSpring }}
						>
							{project.impact}
						</motion.p>
					</div>

					<div className="flex gap-3 pt-4 border-t border-border/30">
						<motion.div whileHover={{ scale: 1.03, transition: hoverSpring }} whileTap={{ scale: 0.97, transition: hoverSpring }} className="flex-1">
							<Link href={project.liveUrl ?? "#"} target="_blank">
								<Button size="sm" className="w-full relative overflow-hidden group">
									<span className="relative z-10 flex items-center">
										<ExternalLink className="w-4 h-4 mr-2" />
										Live Demo
									</span>
									<motion.div
										className="absolute inset-0 bg-primary/20"
										initial={{ x: "-100%" }}
										whileHover={{ x: "0%" }}
										transition={{ ...smoothFade, duration: 0.35 }}
									/>
								</Button>
							</Link>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05, transition: hoverSpring }} whileTap={{ scale: 0.92, transition: hoverSpring }}>
							<Link href={project.githubUrl ?? "#"} target="_blank">
								<Button size="sm" variant="outline">
									<Github className="w-4 h-4" />
								</Button>
							</Link>
						</motion.div>

						<motion.div whileHover={{ scale: 1.05, transition: hoverSpring }} whileTap={{ scale: 0.92, transition: hoverSpring }}>
							<Button size="sm" variant="outline" onClick={() => onSelect(project)}>
								<Info className="w-4 h-4" />
							</Button>
						</motion.div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default function ProjectsSection() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const pinRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)

	const [selectedProject, setSelectedProject] = useState<Project | null>(null)

	const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
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

			const tween = gsap.to(trackRef.current, {
				x: () => -scrollAmount,
				ease: "none",
				overwrite: "auto",
				scrollTrigger: {
					id: "projects-pin",

					// ✅ key fix: trigger == pin element
					trigger: pinRef.current,
					pin: pinRef.current,

					start: "top top",

					// ✅ compute once per refresh to avoid mid-pin changes
					end: () => `+=${compute()}`,

					scrub: 0.6,
					anticipatePin: 0, // avoid extra pre-adjustment "nudge"
					pinSpacing: true,
					invalidateOnRefresh: true,

					// optional but helps when fonts/images load:
					refreshPriority: 1,
				},
			})

			const ro = new ResizeObserver(() => ScrollTrigger.refresh())
			ro.observe(trackRef.current)

			const onResize = () => ScrollTrigger.refresh()
			window.addEventListener("resize", onResize)

			// if images affect width after mount, refresh once
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

	return (
		<section id="projects" ref={sectionRef} className="relative bg-background">
			<div ref={pinRef} className="relative flex h-[75vh] items-center  will-change-transform">

				{/* Header */}
				<div className="absolute top-20 left-0 right-0 z-10 text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={isInView ? slowFade : smoothFade}
					>
						<motion.div
							initial={{ width: 0 }}
							animate={isInView ? { width: "200px" } : {}}
							transition={isInView ? { ...slowFade, delay: 0.3 } : smoothFade}
							className="h-px bg-border mx-auto mb-5 sm:mb-6"
						/>

						<motion.p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
							Curated Works
						</motion.p>

						<motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
							Projects
						</motion.h2>

						<motion.p
							className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={isInView ? { ...smoothFade, delay: 0.45 } : smoothFade}
						>
							Real problems solved with thoughtful engineering and modern technology
						</motion.p>
					</motion.div>
				</div>

				{/* Horizontal Row */}
				<div className="pt-[50vh] h-full w-full px-32 mb-32">
					<div ref={trackRef} className="flex h-full items-center gap-8 px-6 will-change-transform">
						{featuredProjects.map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
						))}

						{/* View all */}
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={isInView ? { ...slowFade, delay: projects.length * 0.08 } : smoothFade}
							className="shrink-0 w-[560px] h-[430px] mr-96"
						>
							<Card className="relative overflow-hidden border border-border transition-all duration-300 bg-card h-full flex items-center justify-center group cursor-pointer">
								<CardContent className="text-center p-6">
									<motion.div
										whileHover={{ scale: 1.06, transition: hoverSpring }}
										className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
										onClick={() => router.push("/projects")}
									>
										<ArrowRight className="w-8 h-8 text-white" />
									</motion.div>
									<h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
										View All Projects
									</h3>
									<p className="text-muted-foreground mb-6">
										Explore my complete portfolio including experimental projects and open source contributions.
									</p>
									<Button onClick={() => router.push("/projects")} className="bg-primary hover:bg-primary/90">
										See More Projects
									</Button>
								</CardContent>
							</Card>
						</motion.div>

						{/* End spacer so it can slide further left */}
						<div className="shrink-0 w-[24vw]" />
					</div>
				</div>

			</div>

			{selectedProject && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 sm:p-6"
						onClick={() => setSelectedProject(null)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
							animate={{ scale: 1, opacity: 1, rotateX: 0 }}
							exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
							className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-lg"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-6 sm:p-8">
								<div className="flex items-center justify-between mb-6 sm:mb-8">
									<div>
										<motion.h3 className="text-2xl sm:text-3xl font-bold mb-2" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ ...smoothFade, delay: 0.05 }}>
											{selectedProject.title}
										</motion.h3>
										<motion.p className="text-muted-foreground" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ ...smoothFade, delay: 0.12 }}>
											{selectedProject.subtitle}
										</motion.p>
									</div>
									<motion.div whileHover={{ scale: 1.05, transition: hoverSpring }} whileTap={{ scale: 0.9, transition: hoverSpring }}>
										<Button size="sm" variant="ghost" onClick={() => setSelectedProject(null)}>
											<X className="w-5 h-5" />
										</Button>
									</motion.div>
								</div>

								<div className="grid md:grid-cols-2 gap-6 sm:gap-8">
									<div className="space-y-6">
										<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothFade, delay: 0.2 }}>
											<h4 className="font-semibold text-lg mb-3 text-red-400">The Challenge</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.challenge}</p>
										</motion.div>
										<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothFade, delay: 0.32 }}>
											<h4 className="font-semibold text-lg mb-3 text-blue-400">My Approach</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.approach}</p>
										</motion.div>
									</div>

									<div className="space-y-6">
										<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothFade, delay: 0.44 }}>
											<h4 className="font-semibold text-lg mb-3 text-green-400">Results</h4>
											<ul className="space-y-3">
												{selectedProject.details.results.map((res, idx) => (
													<motion.li
														key={idx}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ ...smoothFade, delay: 0.5 + idx * 0.08 }}
														whileHover={{ x: 5, transition: hoverSpring }}
														className="text-muted-foreground flex items-start cursor-pointer"
													>
														<motion.span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 shrink-0" whileHover={{ scale: 1.2, transition: hoverSpring }} />
														{res}
													</motion.li>
												))}
											</ul>
										</motion.div>

										<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothFade, delay: 0.6 }}>
											<h4 className="font-semibold text-lg mb-3 text-purple-400">Key Learnings</h4>
											<p className="text-muted-foreground leading-relaxed">{selectedProject.details.learnings}</p>
										</motion.div>
									</div>
								</div>

								<motion.div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...smoothFade, delay: 0.68 }}>
									<h4 className="font-semibold mb-4">Technologies Used</h4>
									<div className="flex flex-wrap -space-x-1">
										{selectedProject.tech.map((tech, ti) => (
											<motion.div
												key={tech}
												initial={{ opacity: 0, scale: 0 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ ...smoothFade, delay: 0.78 + ti * 0.05 }}
												whileHover={{ scale: 1.08, transition: hoverSpring }}
												whileTap={{ scale: 0.96, transition: hoverSpring }}
											>
												<div className="group/tech relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 hover:z-10">
													<img
														src={getTechLogo(tech)}
														alt={tech}
														className="h-5 w-5 object-contain"
														onError={(event) => {
															event.currentTarget.style.display = "none"
														}}
													/>
													<span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover/tech:opacity-100">
														{tech}
													</span>
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				</AnimatePresence>
			)}
		</section>
	)
}
