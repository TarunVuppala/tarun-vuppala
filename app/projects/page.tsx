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
import Link from "next/link"
import { allProjects } from "@/lib/data"
import Image from "next/image"

const categories = ["All", "Web App", "Mobile", "AI", "Productivity", "SaaS", "3D", "Finance", "Plugin", "Personalization", "Audio Processing", "Tool",];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = allProjects.filter((project) => {
    const matchesFilter = filter === "all" || project.featured
    const matchesCategory = category === "All" || project.categories.includes(category)
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
                    className="pl-10 w-64 outline-none focus:outline-none"
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
                  transition={{ duration: 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-border/50 hover:border-border hover:shadow-lg hover:bg-black transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 bg-linear-to-r from-yellow-500 to-orange-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
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
                        <div className="flex flex-wrap gap-2 mb-1">
                          {project.tech.map((tech, idx) => (
                            <motion.div
                              className="flex flex-wrap gap-2"
                              key={tech}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((cat, idx) => (
                            <motion.div
                              className="flex flex-wrap gap-2"
                              key={cat}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge variant="secondary" className="text-xs cursor-pointer">
                                {cat}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className={`flex gap-3`}>
                        {project.liveUrl && (
                          <motion.div
                            whileHover={{ scale: project.liveUrl ? 1.05 : 1 }}
                            whileTap={{ scale: project.liveUrl ? 0.95 : 1 }}
                            className={`"hover:cursor-pointer justify-start"`}
                          >
                            <Button size="sm" asChild disabled={!project.liveUrl}>
                              <Link
                                href={project.liveUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                              </Link>
                            </Button>
                          </motion.div>
                        )}

                        {
                          project.githubUrl && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`hover:cursor-pointer justify-start`}
                            >
                              <Button size="sm" variant="outline" asChild>
                                <Link
                                  href={project.githubUrl ?? "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="w-4 h-4" />
                                </Link>
                              </Button>
                            </motion.div>
                          )
                        }
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <p className="text-muted-foreground text-lg">Under Dev.</p>
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
