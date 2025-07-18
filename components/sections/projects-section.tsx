"use client"

import { useState, useRef } from "react"
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github, Calendar, ArrowRight, Star, Users, Clock, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Project {
	id: string
	title: string
	subtitle: string
	problem: string
	solution: string
	impact: string
	tech: string[]
	image: string
	liveUrl: string
	githubUrl: string
	date: string
	featured: boolean
	stats: {
		users?: string
		performance?: string
		rating?: string
	}
	details: {
		challenge: string
		approach: string
		results: string[]
		learnings: string
	}
}

const projects: Project[] = [
  {
    id: "acethletics",
    title: "Acethletics",
    subtitle: "All-in-One College Sports Management",
    problem: "College sports events lacked centralized scheduling, team coordination, and transparent results tracking.",
    solution: "Built a platform for event scheduling, participant management, and real-time score updates.",
    impact: "Digitized 10+ sports events and improved communication across 15+ colleges.",
    tech: ["Next.js", "MongoDB", "Node.js", "Tailwind", "Socket.io"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://acethletics.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/acethletics",
    date: "2024",
    featured: true,
    stats: {
      users: "1.5K+",
      performance: "Instant Sync",
      rating: "4.8/5",
    },
    details: {
      challenge: "Coordinating live match updates and team logistics during a multi-day, multi-sport event.",
      approach: "Used WebSockets for live scores and built an intuitive admin panel for real-time control.",
      results: [
        "Live updates with 0 delays during 30+ matches",
        "300+ participants registered via platform",
        "10K+ page views during event days",
        "Reduced miscommunication across teams",
      ],
      learnings: "Handled production stress during live events and optimized real-time data flows.",
    },
  },
  {
    id: "quickfuel",
    title: "QuickFuel",
    subtitle: "Smart Fuel Station Locator & Tracker",
    problem: "Users often faced long queues or dry pumps at fuel stations without real-time status.",
    solution: "Built a crowdsourced fuel availability tracker with GPS-based smart station finder.",
    impact: "Saved users 30+ mins/day and reduced congestion at fuel pumps.",
    tech: ["React Native", "Firebase", "Google Maps API", "Express.js"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://quickfuel.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/quickfuel",
    date: "2024",
    featured: false,
    stats: {
      users: "700+",
      performance: "30min saved",
      rating: "4.6/5",
    },
    details: {
      challenge: "Crowdsourcing accurate real-time data and ensuring geolocation accuracy.",
      approach: "Implemented upvoting for station status and used Firestore for real-time updates.",
      results: [
        "95% accuracy in fuel status predictions",
        "500+ stations mapped",
        "Geo-alerts based on fuel availability",
        "Reduced user wait time significantly",
      ],
      learnings: "The power of community data and the importance of trust systems in public-facing apps.",
    },
  },
  {
    id: "tedxaceec",
    title: "TEDxACEEC 2024",
    subtitle: "Event Website & Collaborator Portal",
    problem: "Managing TEDx outreach, ticketing, and team coordination lacked a centralized solution.",
    solution: "Developed a portal for team management, collaborator onboarding, and attendee engagement.",
    impact: "Streamlined operations for 20+ teams, 50+ collaborators, and 300+ attendees.",
    tech: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://tedxaceec.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/tedxaceec",
    date: "2024",
    featured: true,
    stats: {
      users: "500+",
      performance: "High Engagement",
      rating: "5.0/5",
    },
    details: {
      challenge: "Orchestrating multiple roles (design, outreach, speakers) via one digital interface.",
      approach: "Built modular components for team dashboards, ticket verification, and mail flows.",
      results: [
        "Onboarded 50+ collaborators",
        "Processed 300+ tickets",
        "Improved outreach through built-in analytics",
        "Ensured smooth coordination across all teams",
      ],
      learnings: "The value of internal tooling in large-scale event success.",
    },
  },
  {
    id: "trimlyai",
    title: "Trimly.ai",
    subtitle: "AI-Powered Video Trimming",
    problem: "Content creators spent hours manually trimming and editing raw footage for highlights.",
    solution: "Developed an AI-driven tool that auto-detects key moments and trims videos with one click.",
    impact: "Reduced editing time by 80%, empowering creators to publish faster.",
    tech: ["Next.js", "Python", "OpenAI API", "FFmpeg"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://trimly.ai",
    githubUrl: "https://github.com/tarunvuppala/trimlyai",
    date: "2025",
    featured: true,
    stats: {
      users: "1K+",
      performance: "5x faster",
      rating: "4.7/5",
    },
    details: {
      challenge: "Automatically identifying contextually important clips without false positives.",
      approach: "Built a machine-learning pipeline using scene detection and audio cues to locate highlights.",
      results: [
        "Processed 500+ videos in beta",
        "90% user satisfaction in trimming accuracy",
        "Cut average edit time from 2h to 15m",
        "Integrated with YouTube API for direct uploads",
      ],
      learnings: "Tuned ML thresholds for precision-recall balance and optimized FFmpeg performance in serverless functions.",
    },
  },
  {
    id: "autopodcast",
    title: "AutoPodcast",
    subtitle: "Automated Podcast Editing & Publishing",
    problem: "Podcasters spent hours removing silence, leveling audio, and segmenting episodes manually.",
    solution: "Created an end-to-end pipeline that auto-detects silence, balances sound, and publishes with metadata.",
    impact: "Saved creators 70% of post-production time and standardized quality across episodes.",
    tech: ["React", "Node.js", "FFmpeg", "Adobe CEP", "MongoDB"],
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://autopodcast.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/autopodcast",
    date: "2025",
    featured: false,
    stats: {
      users: "200+",
      performance: "8min/process",
      rating: "4.9/5",
    },
    details: {
      challenge: "Integrating with multiple audio formats and ensuring lossless editing in batch jobs.",
      approach: "Leveraged FFmpeg filters for silence removal, custom gain control algorithms, and CEP scripting for Adobe workflows.",
      results: [
        "Automated editing of 150+ podcast episodes",
        "Maintained audio fidelity with <1% bitrate loss",
        "Reduced manual editing hours by 70%",
        "Seamless publishing to RSS feeds",
      ],
      learnings: "Balanced server load for concurrent FFmpeg tasks and improved UX for workflow customization.",
    },
  },
];


type ProjectCardProps = {
	project: Project;
	index: number;
	onSelect: (p: Project) => void;
};

const MotionImage = motion(Image);

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -10, scale: 1.02 }}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			className="group flex-shrink-0 w-[450px] h-[450px]"
		>
			<Card className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm h-full flex flex-col">
				{/* Floating Badge */}
				{project.featured && (
					<motion.div
						initial={{ scale: 0, rotate: -45 }}
						animate={{ scale: 1, rotate: 0 }}
						whileHover={{ scale: 1.1, rotate: 5 }}
						className="absolute top-4 right-4 z-10"
					>
						<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
							<Star className="w-3 h-3 mr-1" />
							Featured
						</Badge>
					</motion.div>
				)}

				{/* Project Image */}
				<div className="relative overflow-hidden">
					<MotionImage
						src={project.image || "/placeholder.svg"}
						alt={project.title}
						width={600}
						height={400}
						className="w-full h-full object-cover"
						animate={{ scale: isHovered ? 1.1 : 1 }}
						transition={{ duration: 0.6 }}
					/>
					<motion.div
						className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
						animate={{ opacity: isHovered ? 0.8 : 1 }}
						transition={{ duration: 0.3 }}
					/>

					{/* Date Badge */}
					<motion.div
						className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/80 bg-black/50 rounded-full px-3 py-1"
						whileHover={{ scale: 1.05 }}
					>
						<Calendar className="w-3 h-3" />
						{project.date}
					</motion.div>
				</div>

				<CardContent className="p-6 space-y-4 flex-1 flex flex-col">
					{/* Title Section */}
					<div>
						<motion.h3
							className="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer"
							whileHover={{ x: 5 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{project.title}
						</motion.h3>
						<p className="text-sm text-muted-foreground">{project.subtitle}</p>
					</div>

					{/* Tech Stack */}
					<div className="flex flex-wrap gap-2">
						{project.tech.slice(0, 3).map((tech, techIndex) => (
							<motion.div
								key={tech}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.1 + techIndex * 0.05 }}
								whileHover={{ scale: 1.1, y: -2 }}
							>
								<Badge variant="secondary" className="text-xs cursor-pointer">
									{tech}
								</Badge>
							</motion.div>
						))}
						{project.tech.length > 3 && (
							<Badge variant="outline" className="text-xs">
								+{project.tech.length - 3}
							</Badge>
						)}
					</div>

					{/* Stats */}
					<div className="flex gap-4 text-sm">
						{Object.entries(project.stats).map(([key, value], statIndex) => (
							<motion.div
								key={key}
								className="flex items-center gap-1 text-muted-foreground"
								whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
								transition={{ delay: statIndex * 0.1 }}
							>
								{key === "users" && <Users className="w-3 h-3" />}
								{key === "performance" && <Clock className="w-3 h-3" />}
								{key === "rating" && <Star className="w-3 h-3" />}
								<span className="text-xs">{value}</span>
							</motion.div>
						))}
					</div>

					{/* Impact */}
					<div className="flex-1">
						<span className="font-medium text-green-400 text-sm">Impact:</span>
						<motion.p
							className="text-green-400 mt-1 font-medium text-sm"
							whileHover={{ x: 5 }}
							transition={{ type: "spring", stiffness: 300 }}
						>
							{project.impact}
						</motion.p>
					</div>

					{/* Action buttons */}
					<div className="flex gap-3 pt-4 border-t border-border/30">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
							<Button
								size="sm"
								className="w-full relative overflow-hidden group"
								onClick={() => window.open(project.liveUrl, "_blank")}
							>
								<span className="relative z-10 flex items-center">
									<ExternalLink className="w-4 h-4 mr-2" />
									Live Demo
								</span>
								<motion.div
									className="absolute inset-0 bg-primary/20"
									initial={{ x: "-100%" }}
									whileHover={{ x: "0%" }}
									transition={{ duration: 0.3 }}
								/>
							</Button>
						</motion.div>

						<motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
							<Button size="sm" variant="outline" onClick={() => window.open(project.githubUrl, "_blank")}>
								<Github className="w-4 h-4" />
							</Button>
						</motion.div>

						<motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}>
							<Button size="sm" variant="outline" onClick={() => onSelect(project)}>
								<Info className="w-4 h-4" />
							</Button>
						</motion.div>
					</div>
				</CardContent>

				{/* Hover Glow Effect */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 0.1 : 0 }}
					className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 pointer-events-none"
				/>
			</Card>
		</motion.div>
	)
}

export default function ProjectsSection() {
	const targetRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: targetRef,
	})

	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])
	const isInView = useInView(targetRef, { once: true, margin: "-100px" })
	const router = useRouter()

	return (
		<section
			id="projects"
			ref={targetRef}
			className="relative h-[300vh] bg-gradient-to-br from-background via-background/95 to-background"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 opacity-5">
				<motion.div
					className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
				/>
				<motion.div
					className="absolute bottom-20 left-20 w-96 h-96 bg-primary/50 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
				/>
			</div>

			<div className="sticky top-0 flex h-screen items-center overflow-hidden">
				{/* Header */}
				<div className="absolute top-20 left-0 right-0 z-10 text-center px-4 sm:px-6">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							initial={{ width: 0 }}
							animate={isInView ? { width: "200px" } : {}}
							transition={{ duration: 1, delay: 0.3 }}
							className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8"
						/>

						<motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6" whileHover={{ scale: 1.02 }}>
							Featured{" "}
							<motion.span
								className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
								whileHover={{ scale: 1.05, rotateY: 10 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								Projects
							</motion.span>
						</motion.h2>

						<motion.p
							className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ delay: 0.5 }}
						>
							Real problems solved with thoughtful engineering and modern technology
						</motion.p>

						{/* Scroll Hint */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: 1 }}
							className="text-sm text-muted-foreground flex items-center justify-center gap-2"
						>
							<span>Scroll to explore projects horizontally</span>
							<motion.div
								animate={{ y: [-5, 15, 0] }}
								transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
								className="text-primary text-md border border-secondary rounded-full w-5 h-5"
							>
								<span className="relative -top-0.5">↓</span>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				{/* Horizontal Scrolling Projects */}
				<div className="pt-72">
					<motion.div style={{ x }} className="flex gap-4 px-6 will-change-transform">
						{projects.map((project, index) => (
							<ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
						))}

						{selectedProject && (
							<AnimatePresence>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
									onClick={() => setSelectedProject(null)}
								>
									<motion.div
										initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
										animate={{ scale: 1, opacity: 1, rotateX: 0 }}
										exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
										className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
										onClick={(e) => e.stopPropagation()}
									>
										<div className="p-6 sm:p-8">
											<div className="flex items-center justify-between mb-6 sm:mb-8">
												<div>
													<motion.h3
														className="text-2xl sm:text-3xl font-bold mb-2"
														initial={{ x: -20 }}
														animate={{ x: 0 }}
													>
														{selectedProject.title}
													</motion.h3>
													<motion.p
														className="text-muted-foreground"
														initial={{ x: -20 }}
														animate={{ x: 0 }}
														transition={{ delay: 0.1 }}
													>
														{selectedProject.subtitle}
													</motion.p>
												</div>
												<motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
													<Button size="sm" variant="ghost" onClick={() => setSelectedProject(null)}>
														<X className="w-5 h-5" />
													</Button>
												</motion.div>
											</div>
											<div className="grid md:grid-cols-2 gap-6 sm:gap-8">
												<div className="space-y-6">
													<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
														<h4 className="font-semibold text-lg mb-3 text-red-400">The Challenge</h4>
														<p className="text-muted-foreground leading-relaxed">{selectedProject.details.challenge}</p>
													</motion.div>
													<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
														<h4 className="font-semibold text-lg mb-3 text-blue-400">My Approach</h4>
														<p className="text-muted-foreground leading-relaxed">{selectedProject.details.approach}</p>
													</motion.div>
												</div>
												<div className="space-y-6">
													<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
														<h4 className="font-semibold text-lg mb-3 text-green-400">Results</h4>
														<ul className="space-y-3">
															{selectedProject.details.results.map((res, idx) => (
																<motion.li
																	key={idx}
																	initial={{ opacity: 0, x: -20 }}
																	animate={{ opacity: 1, x: 0 }}
																	transition={{ delay: 0.5 + idx * 0.1 }}
																	whileHover={{ x: 5 }}
																	className="text-muted-foreground flex items-start cursor-pointer"
																>
																	<motion.span
																		className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"
																		whileHover={{ scale: 1.5 }}
																	/>
																	{res}
																</motion.li>
															))}
														</ul>
													</motion.div>
													<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
														<h4 className="font-semibold text-lg mb-3 text-purple-400">Key Learnings</h4>
														<p className="text-muted-foreground leading-relaxed">{selectedProject.details.learnings}</p>
													</motion.div>
												</div>
											</div>
											<motion.div
												className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.7 }}
											>
												<h4 className="font-semibold mb-4">Technologies Used</h4>
												<div className="flex flex-wrap gap-2">
													{selectedProject.tech.map((tech, ti) => (
														<motion.div
															key={tech}
															initial={{ opacity: 0, scale: 0 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{ delay: 0.8 + ti * 0.05 }}
															whileHover={{ scale: 1.1, y: -2 }}
														>
															<Badge variant="secondary" className="px-3 py-1 cursor-pointer">
																{tech}
															</Badge>
														</motion.div>
													))}
												</div>
											</motion.div>
										</div>
									</motion.div>
								</motion.div>
							</AnimatePresence>
						)}

						{/* View More Projects Card */}
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: projects.length * 0.1 }}
							className="flex-shrink-0 w-[450px] h-[450px]"
						>
							<Card className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm h-full flex items-center justify-center group cursor-pointer">
								<CardContent className="text-center p-8">
									<motion.div
										whileHover={{ scale: 1.1, rotate: 5 }}
										className="w-20 h-20 bg-gradient-to-r from-primary to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-6"
									>
										<ArrowRight className="w-8 h-8 text-white" />
									</motion.div>
									<h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
										View All Projects
									</h3>
									<p className="text-muted-foreground mb-6">
										Explore my complete portfolio including experimental projects and open source contributions.
									</p>
									<Button
										onClick={() => router.push("/projects")}
										className="bg-gradient-to-r from-primary to-primary/60 hover:from-primary/80 hover:to-primary/40"
									>
										See More Projects
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>

			</div>
		</section>
	)
}
