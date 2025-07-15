"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Calendar, Search, Star, Users, Clock } from "lucide-react"

const allProjects = [
  {
    id: 1,
    title: "StreamSync",
    description: "Real-time video synchronization platform for remote teams",
    longDescription:
      "A comprehensive solution for teams to watch videos together with sub-50ms synchronization accuracy. Built with WebSockets and Redis for optimal performance.",
    tech: ["React", "Node.js", "WebSockets", "Redis", "MongoDB"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/streamsync",
    live: "https://streamsync-demo.vercel.app",
    date: "2024",
    featured: true,
    category: "Web App",
    stats: { users: "1K+", performance: "<50ms", rating: "4.8/5" },
  },
  {
    id: 2,
    title: "TaskFlow AI",
    description: "AI-powered project management with smart scheduling",
    longDescription:
      "Machine learning-driven task prioritization and deadline prediction system that improved team productivity by 40%.",
    tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/taskflow",
    live: "https://taskflow-ai.vercel.app",
    date: "2024",
    featured: true,
    category: "AI/ML",
    stats: { users: "500+", performance: "40%↑", rating: "4.9/5" },
  },
  {
    id: 3,
    title: "CodeReviewer Pro",
    description: "Automated code quality analysis tool",
    longDescription:
      "AST-based code analysis tool that provides intelligent suggestions and reduces review time by 70%.",
    tech: ["TypeScript", "AST Parser", "Docker", "GitHub API"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/codereviewer",
    live: "https://codereviewer-pro.vercel.app",
    date: "2023",
    featured: false,
    category: "Developer Tools",
    stats: { users: "200+", performance: "70%↓", rating: "4.7/5" },
  },
  {
    id: 4,
    title: "ShopFlow",
    description: "Modern e-commerce platform for small businesses",
    longDescription:
      "Complete e-commerce solution with inventory management, payment processing, and analytics dashboard.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Tailwind"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/shopflow",
    live: "https://shopflow-demo.vercel.app",
    date: "2023",
    featured: true,
    category: "E-commerce",
    stats: { users: "2K+", performance: "200%↑", rating: "4.6/5" },
  },
  {
    id: 5,
    title: "WeatherWise",
    description: "Beautiful weather app with location-based forecasts",
    longDescription:
      "Clean, intuitive weather application with detailed forecasts, weather maps, and personalized recommendations.",
    tech: ["React", "Weather API", "Geolocation", "Chart.js"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/weatherwise",
    live: "https://weatherwise-app.vercel.app",
    date: "2023",
    featured: false,
    category: "Mobile App",
    stats: { users: "800+", performance: "Fast", rating: "4.5/5" },
  },
  {
    id: 6,
    title: "DevBlog",
    description: "Technical blog platform for developers",
    longDescription:
      "Feature-rich blogging platform with markdown support, syntax highlighting, and community features.",
    tech: ["Next.js", "MDX", "Prisma", "NextAuth", "Tailwind"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com/tarunvuppala/devblog",
    live: "https://devblog-platform.vercel.app",
    date: "2022",
    featured: false,
    category: "Content Platform",
    stats: { users: "300+", performance: "SEO Optimized", rating: "4.4/5" },
  },
]

const categories = ["All", "Web App", "AI/ML", "Developer Tools", "E-commerce", "Mobile App", "Content Platform"]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = filter === "all" || project.featured
    const matchesCategory = category === "All" || project.category === category
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesCategory && matchesSearch
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-px bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8"
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">My Projects</h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                A collection of projects that showcase my problem-solving approach and technical skills
              </p>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex gap-2">
                  <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
                    All Projects ({allProjects.length})
                  </Button>
                  <Button
                    variant={filter === "featured" ? "default" : "outline"}
                    onClick={() => setFilter("featured")}
                    size="sm"
                  >
                    Featured ({allProjects.filter((p) => p.featured).length})
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="text-xs"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-border/50 hover:border-border transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="absolute top-3 right-3">
                        {project.category}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{project.date}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>

                      {/* Stats */}
                      <div className="flex gap-4 text-sm mb-4">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-1 text-muted-foreground">
                            {key === "users" && <Users className="w-3 h-3" />}
                            {key === "performance" && <Clock className="w-3 h-3" />}
                            {key === "rating" && <Star className="w-3 h-3" />}
                            <span className="text-xs">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" className="flex-1" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilter("all")
                    setCategory("All")
                    setSearchTerm("")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
