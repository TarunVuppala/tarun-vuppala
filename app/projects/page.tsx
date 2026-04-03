"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ExternalLink, Github, Search, Star, Users, Clock } from "lucide-react"
import Link from "next/link"
import { allProjects, getTechIcon } from "@/lib/data"
import Image from "next/image"

const categories = ["All", "Web App", "Mobile", "AI", "Productivity", "SaaS", "3D", "Finance", "Plugin", "Personalization", "Audio Processing", "Tool"]
const featuredProjectsCount = allProjects.filter((project) => project.featured).length

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesFilter = filter === "all" || project.featured
      const matchesCategory = category === "All" || project.categories.includes(category)
      const matchesSearch =
        !normalizedSearchTerm ||
        project.title.toLowerCase().includes(normalizedSearchTerm) ||
        project.description.toLowerCase().includes(normalizedSearchTerm) ||
        project.tech.some((tech) => tech.toLowerCase().includes(normalizedSearchTerm))

      return matchesFilter && matchesCategory && matchesSearch
    })
  }, [category, filter, normalizedSearchTerm])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center sm:mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mx-auto mb-8 h-px bg-border"
            />
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">My Projects</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A collection of projects that showcase my problem-solving approach and technical skills
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
                  All Projects ({allProjects.length})
                </Button>
                <Button
                  variant={filter === "featured" ? "default" : "outline"}
                  onClick={() => setFilter("featured")}
                  size="sm"
                >
                  Featured ({featuredProjectsCount})
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 outline-none focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
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

          <div className="grid gap-5 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="group"
              >
                <Card className="flex h-full flex-col overflow-hidden border-border/50 bg-card/80 transition-colors duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-44 w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {project.featured && (
                      <div className="absolute left-3 top-3 text-primary">
                        <Star className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <CardContent className="flex flex-1 flex-col p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <Button size="sm" variant="outline" className="h-9 w-9 p-0" asChild>
                              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}

                          {project.githubUrl && (
                            <Button size="sm" variant="outline" className="h-9 w-9 p-0" asChild>
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                        <span>{project.subtitle}</span>
                        <span>•</span>
                        <span>{project.date}</span>
                      </div>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

                    <div className="mb-2 mt-2 flex gap-3 text-xs text-muted-foreground">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          {key === "users" && <Users className="h-3 w-3" />}
                          {key === "performance" && <Clock className="h-3 w-3" />}
                          {key === "rating" && <Star className="h-3 w-3" />}
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-3 pt-2">
                      <div className="flex flex-wrap -space-x-2.5">
                        {project.tech.map((tech, idx) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div
                              className={`group/tech relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-[margin] duration-200 delay-75 ease-in-out hover:z-10 ${
                                idx === 0 ? "hover:mr-2.5" : "hover:mx-2.5"
                              }`}
                            >
                              <img
                                src={getTechIcon(tech)}
                                alt={tech}
                                className="h-5 w-5 object-contain"
                                loading="lazy"
                                decoding="async"
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
                      <div className="flex flex-wrap gap-2">
                        {project.categories.map((cat, idx) => (
                          <motion.div
                            className="flex flex-wrap gap-2"
                            key={cat}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Badge variant="secondary" className="cursor-pointer text-xs">
                              {cat}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
              <p className="text-lg text-muted-foreground">Under Dev.</p>
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
  )
}
