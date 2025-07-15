"use client"

import { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github, Info, Calendar, ArrowRight, Star, Users, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

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
]

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="group flex-shrink-0 w-80 sm:w-96"
      >
        <Card className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm h-full flex flex-col">
          {/* Floating Badge */}
          {project.featured && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-4 right-4 z-10"
            >
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Project Image */}
          <div className="relative overflow-hidden h-48">
            <motion.img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Date Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/80 bg-black/50 rounded-full px-3 py-1">
              <Calendar className="w-3 h-3" />
              {project.date}
            </div>
          </div>

          <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
            {/* Title Section */}
            <div className="min-h-[60px]">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.subtitle}</p>
            </div>

            {/* Tech Stack */}
            <div className="min-h-[32px] flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tech.length - 3}
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="min-h-[24px] flex gap-4 text-sm">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="flex items-center gap-1 text-muted-foreground">
                  {key === "users" && <Users className="w-3 h-3" />}
                  {key === "performance" && <Clock className="w-3 h-3" />}
                  {key === "rating" && <Star className="w-3 h-3" />}
                  <span className="text-xs">{value}</span>
                </div>
              ))}
            </div>

            {/* Impact */}
            <div className="flex-1 min-h-[60px]">
              <span className="font-medium text-green-400 text-sm">Impact:</span>
              <p className="text-green-400 mt-1 font-medium text-sm">{project.impact}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-border/30">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="flex-1" onClick={() => window.open(project.liveUrl, "_blank")}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button size="sm" variant="outline" onClick={() => window.open(project.githubUrl, "_blank")}>
                  <Github className="w-4 h-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button size="sm" variant="outline" onClick={() => setSelectedProject(project)}>
                  <Info className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>

          {/* Hover Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 pointer-events-none"
          />
        </Card>
      </motion.div>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                  <p className="text-muted-foreground">{selectedProject.subtitle}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setSelectedProject(null)}>
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
                      {selectedProject.details.results.map((result, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-muted-foreground flex items-start"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                          {result}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-purple-400">Key Learnings</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedProject.details.learnings}</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h4 className="font-semibold mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10%" })
  const router = useRouter()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0.2, 0.8], [0, -300])

  return (
    <section id="projects" ref={containerRef} className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Featured{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Projects
            </motion.span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Real problems solved with thoughtful engineering and modern technology
          </p>
        </motion.div>

        {/* Horizontal Scrolling Projects */}
        <div className="relative">
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-6 sm:gap-8 pb-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isVisible={isInView} />
            ))}
          </motion.div>
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/projects")}
              className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full bg-transparent backdrop-blur-sm"
            >
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
