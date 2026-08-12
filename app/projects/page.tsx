"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github, Info, Search, Star } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContentContainer from "@/components/layout/container"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { ProjectModal } from "@/components/sections/projects-section"
import TechIconStack from "@/components/ui/tech-icon-stack"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { allProjects } from "@/lib/data"

const categories = [
  "All",
  "Website",
  "Mobile",
  "AI",
  "Automation",
  "SaaS",
]

const featuredProjectsCount = allProjects.filter((project) => project.featured).length

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
    <div className="min-h-screen bg-transparent text-foreground">
      <Navigation />

      <main className="pb-14 pt-[calc(var(--nav-height,72px)+1.5rem)]">
        <ContentContainer className="space-y-6">
          <motion.section
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
                  Project archive.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-stone-700/80 sm:text-lg dark:text-stone-300/76">
                  AI/ML, backend, automation, and product builds.
                </p>
              </div>

              {/* <div className="flex flex-wrap gap-6 border-t border-stone-950/10 pt-4 text-sm dark:border-white/10 xl:border-t-0 xl:pt-0">
                <div>
                  <p className="meta-label">All</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-950 dark:text-stone-50">{allProjects.length}</p>
                </div>
                <div>
                  <p className="meta-label">Featured</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-950 dark:text-stone-50">{featuredProjectsCount}</p>
                </div>
                <div>
                  <p className="meta-label">Categories</p>
                  <p className="mt-1 text-2xl font-semibold text-stone-950 dark:text-stone-50">{categories.length - 1}</p>
                </div>
              </div> */}
            </div>

            <div className="grid gap-4 border-t border-stone-950/10 pt-5 dark:border-white/10 xl:grid-cols-[280px_1fr] xl:items-start">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500 dark:text-white/34" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="h-11 rounded-full border-stone-950/10 bg-white/82 pl-11 text-stone-950 placeholder:text-stone-500 dark:border-white/10 dark:bg-black/24 dark:text-white dark:placeholder:text-white/30"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <Button
                      key={item}
                      variant={category === item ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(item)}
                      className={
                        category === item
                          ? "rounded-full bg-stone-200 text-stone-950 hover:bg-stone-100 dark:bg-stone-200 dark:text-stone-950"
                          : "rounded-full border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200/80 dark:hover:bg-white/10"
                      }
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 24 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.02, 0.16), ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="flex h-full flex-col overflow-hidden rounded-4xl border border-stone-950/10 bg-white/78 p-0 backdrop-blur-xl dark:border-white/10 dark:bg-white/3">
                  <div className="p-4">
                    <ProjectPreviewPanel project={project} index={index} compact />
                  </div>

                  <CardContent className="flex flex-1 flex-col p-5 pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {project.categories.slice(0, 3).map((item) => (
                          <Badge
                            key={`${project.id}-${item}`}
                            variant="secondary"
                            className="rounded-full border border-stone-950/10 bg-black/3 px-3 py-1 text-[11px] text-stone-700 dark:border-white/10 dark:bg-black/24 dark:text-stone-300"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                            asChild
                          >
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                            asChild
                          >
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedProject(project)}
                          className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                          aria-label={`View ${project.title} project details`}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-stone-700/80 dark:text-stone-300/76">{project.description}</p>

                    <TechIconStack tech={project.tech} limit={4} size="sm" className="mt-4" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-4xl border border-stone-950/10 bg-white/78 py-16 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/3">
              <p className="text-lg text-stone-700/80 dark:text-white/68">No projects match this slice.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilter("all")
                  setCategory("All")
                  setSearchTerm("")
                }}
                className="mt-5 rounded-full border-stone-950/10 bg-white/75 text-stone-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Clear filters
              </Button>
            </motion.div>
          )}

          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                index={allProjects.findIndex((project) => project.id === selectedProject.id)}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </ContentContainer>
      </main>

      <Footer />
    </div>
  )
}
