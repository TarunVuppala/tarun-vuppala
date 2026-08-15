"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Github, Info, Search } from "lucide-react"
import Link from "next/link"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { ProjectModal } from "@/components/project-modal"
import TechIconStack from "@/components/ui/tech-icon-stack"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { allProjects } from "@/lib/data"
import { easeOutExpo, whenMotion } from "@/lib/motion"
import type { Project } from "@/types/project"

const categories = ["All", "Website", "Mobile", "AI", "Automation", "SaaS"]

export default function ProjectsArchive() {
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion()

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = category === "All" || project.categories.includes(category)
      const matchesSearch =
        !normalizedSearchTerm ||
        project.title.toLowerCase().includes(normalizedSearchTerm) ||
        project.description.toLowerCase().includes(normalizedSearchTerm) ||
        project.tech.some((tech) => tech.toLowerCase().includes(normalizedSearchTerm))

      return matchesCategory && matchesSearch
    })
  }, [category, normalizedSearchTerm])

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
            Project archive.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-stone-700 sm:text-lg dark:text-stone-300">
            AI/ML, backend, automation, and product builds.
          </p>
        </div>

        <div className="grid gap-4 border-t border-stone-950/10 pt-5 dark:border-white/10 xl:grid-cols-[280px_1fr] xl:items-start">
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" aria-hidden="true" />
            <Input
              id="project-search"
              type="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-11 rounded-full border-stone-950/10 bg-white/82 pl-11 text-stone-950 placeholder:text-stone-500 dark:border-white/10 dark:bg-black/24 dark:text-white dark:placeholder:text-white/40"
            />
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <Button
                key={item}
                variant={category === item ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={
                  category === item
                    ? "h-11 rounded-full bg-stone-200 text-stone-950 hover:bg-stone-100 dark:bg-stone-200 dark:text-stone-950"
                    : "h-11 rounded-full border-stone-950/10 bg-white/80 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
                }
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={whenMotion(reduceMotion, { opacity: 0, rotateX: 6, y: 18 }, false)}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={whenMotion(reduceMotion, { duration: 0.4, delay: Math.min(index * 0.03, 0.18), ease: easeOutExpo }, { duration: 0 })}
            style={{ transformPerspective: 900 }}
          >
            <Card className="flex h-full flex-col overflow-hidden rounded-4xl border border-stone-950/10 bg-white/82 p-0 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
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

                  <div className="flex gap-1">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        asChild
                      >
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open live site for ${project.title}`}>
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        asChild
                      >
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub repository for ${project.title}`}>
                          <Github className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedProject(project)}
                      className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                      aria-label={`View ${project.title} project details`}
                    >
                      <Info className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-stone-700 dark:text-stone-300">{project.description}</p>

                <TechIconStack tech={project.tech} limit={4} size="sm" className="mt-4" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="rounded-4xl border border-stone-950/10 bg-white/82 py-16 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <p className="text-lg text-stone-700 dark:text-stone-300">No projects match this slice.</p>
          <Button
            variant="outline"
            onClick={() => {
              setCategory("All")
              setSearchTerm("")
            }}
            className="mt-5 h-11 rounded-full border-stone-950/10 bg-white/80 text-stone-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Clear filters
          </Button>
        </div>
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
    </div>
  )
}
