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
		id: "streamsync",
		title: "StreamSync",
		subtitle: "Real-time Video Syncing Platform",
		problem: "Remote teams couldn't watch videos together seamlessly during virtual meetings.",
		solution: "Built with React, Node.js, and WebSockets for <50ms synchronization accuracy.",
		impact: "98% sync accuracy, setup reduced from 5 minutes to 30 seconds.",
		tech: ["React", "Node.js", "WebSockets", "MongoDB", "Redis"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://streamsync-demo.vercel.app",
		githubUrl: "https://github.com/tarunvuppala/streamsync",
		date: "2024",
		featured: true,
		stats: {
			users: "1K+",
			performance: "<50ms",
			rating: "4.8/5",
		},
		details: {
			challenge:
				"Creating real-time synchronization across multiple clients with minimal latency while handling network inconsistencies.",
			approach:
				"Implemented a custom WebSocket protocol with heartbeat monitoring and automatic reconnection. Used Redis for session management.",
			results: [
				"Achieved <50ms synchronization latency",
				"Supports up to 100 concurrent users per room",
				"Zero data loss during network interruptions",
				"99.9% uptime in production",
			],
			learnings:
				"Learned the importance of graceful degradation and how to optimize WebSocket connections for different network conditions.",
		},
	},
	{
		id: "taskflow",
		title: "TaskFlow AI",
		subtitle: "AI-Powered Project Management",
		problem: "Teams struggled with task prioritization and deadline management across projects.",
		solution: "Integrated machine learning for smart task scheduling and priority recommendations.",
		impact: "40% improvement in project delivery times, 60% reduction in missed deadlines.",
		tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "OpenAI"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://taskflow-ai.vercel.app",
		githubUrl: "https://github.com/tarunvuppala/taskflow",
		date: "2024",
		featured: true,
		stats: {
			users: "500+",
			performance: "40%↑",
			rating: "4.9/5",
		},
		details: {
			challenge:
				"Building an intelligent system that could learn from team patterns and predict optimal task scheduling.",
			approach:
				"Developed a hybrid recommendation system combining collaborative filtering with time-series analysis for deadline prediction.",
			results: [
				"40% faster project completion",
				"60% fewer missed deadlines",
				"85% user satisfaction rate",
				"Reduced planning time by 3 hours/week per team",
			],
			learnings:
				"Understanding user behavior patterns is crucial for building effective AI recommendations in productivity tools.",
		},
	},
	{
		id: "codereviewer",
		title: "CodeReviewer Pro",
		subtitle: "Automated Code Quality Analysis",
		problem: "Manual code reviews were time-consuming and inconsistent across team members.",
		solution: "Built an automated system using AST parsing and custom rules engine for instant feedback.",
		impact: "70% reduction in review time, 50% fewer bugs in production.",
		tech: ["TypeScript", "AST Parser", "Docker", "GitHub API", "ML"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://codereviewer-pro.vercel.app",
		githubUrl: "https://github.com/tarunvuppala/codereviewer",
		date: "2023",
		featured: false,
		stats: {
			users: "200+",
			performance: "70%↓",
			rating: "4.7/5",
		},
		details: {
			challenge:
				"Creating a system that could understand code context and provide meaningful suggestions beyond basic linting.",
			approach:
				"Built custom AST parsers for multiple languages and implemented a rules engine with configurable quality gates.",
			results: [
				"70% faster code review process",
				"50% reduction in production bugs",
				"Standardized code quality across teams",
				"Integrated with 15+ popular IDEs",
			],
			learnings: "The importance of balancing automation with human insight in code quality processes.",
		},
	},
	{
		id: "ecommerce",
		title: "ShopFlow",
		subtitle: "Modern E-commerce Platform",
		problem: "Small businesses needed an affordable, feature-rich e-commerce solution.",
		solution: "Built a scalable platform with inventory management, payment processing, and analytics.",
		impact: "Helped 50+ businesses increase online sales by 200% on average.",
		tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Tailwind"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://shopflow-demo.vercel.app",
		githubUrl: "https://github.com/tarunvuppala/shopflow",
		date: "2023",
		featured: true,
		stats: {
			users: "2K+",
			performance: "200%↑",
			rating: "4.6/5",
		},
		details: {
			challenge: "Creating a comprehensive e-commerce solution that's both powerful and easy to use.",
			approach: "Focused on user experience while building robust backend systems for inventory and payments.",
			results: [
				"50+ businesses onboarded",
				"200% average sales increase",
				"99.9% payment success rate",
				"Mobile-first responsive design",
			],
			learnings: "The importance of understanding business needs beyond just technical requirements.",
		},
	},
	{
		id: "portfolio",
		title: "Personal Portfolio",
		subtitle: "Interactive Developer Portfolio",
		problem: "Needed a unique way to showcase projects and skills that stands out.",
		solution: "Built with Next.js, Three.js, and Framer Motion for immersive 3D experiences.",
		impact: "Increased client inquiries by 300% and improved professional visibility.",
		tech: ["Next.js", "Three.js", "Framer Motion", "Tailwind", "TypeScript"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://tarunvuppala.dev",
		githubUrl: "https://github.com/tarunvuppala/portfolio",
		date: "2024",
		featured: true,
		stats: {
			users: "5K+",
			performance: "Fast",
			rating: "4.9/5",
		},
		details: {
			challenge: "Creating a portfolio that showcases both technical skills and creative design thinking.",
			approach: "Combined modern web technologies with interactive 3D elements and smooth animations.",
			results: [
				"300% increase in client inquiries",
				"Featured in design showcases",
				"Improved professional network",
				"Enhanced personal brand",
			],
			learnings: "The importance of balancing creativity with usability in portfolio design.",
		},
	},
	{
		id: "analytics",
		title: "DataViz Pro",
		subtitle: "Advanced Analytics Dashboard",
		problem: "Companies needed better ways to visualize complex data sets and trends.",
		solution: "Built interactive dashboards with real-time data processing and custom visualizations.",
		impact: "Reduced data analysis time by 80% and improved decision-making speed.",
		tech: ["React", "D3.js", "Python", "FastAPI", "WebSockets"],
		image: "/placeholder.svg?height=400&width=600",
		liveUrl: "https://dataviz-pro.vercel.app",
		githubUrl: "https://github.com/tarunvuppala/dataviz",
		date: "2023",
		featured: true,
		stats: {
			users: "800+",
			performance: "80%↓",
			rating: "4.7/5",
		},
		details: {
			challenge: "Creating intuitive visualizations for complex data while maintaining performance.",
			approach: "Used D3.js for custom charts and WebSockets for real-time updates with optimized rendering.",
			results: [
				"80% faster data analysis",
				"Real-time dashboard updates",
				"Custom visualization library",
				"Improved business insights",
			],
			learnings: "The importance of user-centered design in data visualization tools.",
		},
	},
]

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
								animate={{ y: [0, 5, 0] }}
								transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
								className="text-primary"
							>
								↓
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
