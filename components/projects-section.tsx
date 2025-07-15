"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    tech: ["React", "Node.js", "WebSockets", "MongoDB"],
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://streamsync-demo.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/streamsync",
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
    title: "TaskFlow",
    subtitle: "AI-Powered Project Management",
    problem: "Teams struggled with task prioritization and deadline management across projects.",
    solution: "Integrated machine learning for smart task scheduling and priority recommendations.",
    impact: "40% improvement in project delivery times, 60% reduction in missed deadlines.",
    tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://taskflow-ai.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/taskflow",
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
    title: "CodeReviewer",
    subtitle: "Automated Code Quality Analysis",
    problem: "Manual code reviews were time-consuming and inconsistent across team members.",
    solution: "Built an automated system using AST parsing and custom rules engine for instant feedback.",
    impact: "70% reduction in review time, 50% fewer bugs in production.",
    tech: ["TypeScript", "AST Parser", "Docker", "GitHub API"],
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://codereviewer-pro.vercel.app",
    githubUrl: "https://github.com/tarunvuppala/codereviewer",
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
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Challenges are my playground. Here's what I've built to solve real problems.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Projects */}
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-8 w-max">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="w-96 flex-shrink-0"
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{project.subtitle}</p>

                    <div className="space-y-3 mb-6">
                      <div>
                        <h4 className="text-white font-medium text-sm mb-1">Problem</h4>
                        <p className="text-white/70 text-sm">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm mb-1">Solution</h4>
                        <p className="text-white/70 text-sm">{project.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm mb-1">Impact</h4>
                        <p className="text-green-400 text-sm font-medium">{project.impact}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedProject(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">The Challenge</h4>
                  <p className="text-white/80">{selectedProject.details.challenge}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">My Approach</h4>
                  <p className="text-white/80">{selectedProject.details.approach}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Results</h4>
                  <ul className="space-y-2">
                    {selectedProject.details.results.map((result, index) => (
                      <li key={index} className="text-white/80 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Key Learnings</h4>
                  <p className="text-white/80">{selectedProject.details.learnings}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
