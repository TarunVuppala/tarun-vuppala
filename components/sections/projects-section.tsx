"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
  import { ArrowRight, ExternalLink, Github, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContentContainer from "@/components/layout/container"
import { ProjectModal } from "@/components/project-modal"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { allProjects } from "@/lib/data"

type ProjectCardProps = {
  index: number
  project: Project
  onSelect: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const visibleCategories = project.categories.filter((item) => item !== "Published").slice(0, 2)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="h-107.5 w-[84vw] shrink-0 snap-start sm:h-109.5 sm:w-[70vw] lg:w-130"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-stone-950/10 bg-white/78 p-0 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/3 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_110px_-48px_rgba(15,23,42,0.95)]">
        <div className="p-4">
          <ProjectPreviewPanel project={project} index={index} />
        </div>

        <CardContent className="flex flex-1 flex-col p-5 pt-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-stone-400 dark:text-stone-500">
                {visibleCategories.join(" · ")}
              </span>
            </div>

            <div className="flex gap-2">
              {project.liveUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
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
                  asChild
                  className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelect(project)}
                className="border-stone-950/10 bg-white/75 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-stone-700/80 dark:text-stone-300/78">{project.impact}</p>
        </CardContent>
      </Card>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRangeRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [endX, setEndX] = useState(0)
  const router = useRouter()
  const sectionProgress = useMotionValue(0)
  const progressBarRaw = useMotionValue(0)

  const featuredProjects = useMemo(() => allProjects.filter((project) => project.featured), [])

  const { scrollY } = useScroll()
  const rawX = useTransform(sectionProgress, [0, 1], [0, -endX])
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.35 })
  const progressScale = useSpring(progressBarRaw, { stiffness: 120, damping: 28, mass: 0.28 })

  useMotionValueEvent(scrollY, "change", (latest) => {
    const section = sectionRef.current
    const range = progressRangeRef.current

    if (!section) return

    const viewportHeight = window.innerHeight
    const sectionRect = section.getBoundingClientRect()
    const sectionTop = sectionRect.top + latest
    const sectionEnd = sectionTop + section.offsetHeight - viewportHeight
    const sectionDistance = Math.max(sectionEnd - sectionTop, 1)
    const nextSectionProgress = Math.min(Math.max((latest - sectionTop) / sectionDistance, 0), 1)
    sectionProgress.set(nextSectionProgress)

    if (!range) return

    const rangeRect = range.getBoundingClientRect()
    const rangeTop = rangeRect.top + latest
    const rangeStart = rangeTop - viewportHeight
    const rangeDistance = Math.max(sectionEnd - rangeStart, 1)
    const nextBarProgress = Math.min(Math.max((latest - rangeStart) / rangeDistance, 0), 1)
    progressBarRaw.set(nextBarProgress)
  })

  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return
      const viewportWidth = window.innerWidth
      const contentWidth = contentRef.current.scrollWidth
      const distance = contentWidth - viewportWidth + 96
      setEndX(Math.max(0, distance))

      const latest = scrollY.get()
      const section = sectionRef.current
      const range = progressRangeRef.current

      if (!section) return

      const viewportHeight = window.innerHeight
      const sectionRect = section.getBoundingClientRect()
      const sectionTop = sectionRect.top + latest
      const sectionEnd = sectionTop + section.offsetHeight - viewportHeight
      const sectionDistance = Math.max(sectionEnd - sectionTop, 1)
      sectionProgress.set(Math.min(Math.max((latest - sectionTop) / sectionDistance, 0), 1))

      if (!range) return

      const rangeRect = range.getBoundingClientRect()
      const rangeTop = rangeRect.top + latest
      const rangeStart = rangeTop - viewportHeight
      const rangeDistance = Math.max(sectionEnd - rangeStart, 1)
      progressBarRaw.set(Math.min(Math.max((latest - rangeStart) / rangeDistance, 0), 1))
    }

    measure()
    const observer = new ResizeObserver(measure)

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      observer.disconnect()
    }
  }, [progressBarRaw, scrollY, sectionProgress])

  return (
    <section id="projects" ref={sectionRef} className="relative h-[310vh] bg-transparent">
      <div
        ref={progressRangeRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[28vh]"
      />

      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="relative z-10 pt-[calc(var(--nav-height,72px)+8px)] sm:pt-[calc(var(--nav-height,72px)+12px)]">
          <ContentContainer>
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
                A few projects
                <span className="block text-stone-700 dark:text-stone-300">I&apos;m proud of.</span>
              </h2>
            </motion.div>

            <div className="mx-auto mt-4 max-w-3xl">
              <div className="h-1.5 rounded-full bg-stone-950/10 dark:bg-white/8">
                <motion.div
                  style={{ scaleX: progressScale, transformOrigin: "left center" }}
                  className="h-full rounded-full bg-sky-300"
                />
              </div>
            </div>
          </ContentContainer>
        </div>

        <motion.div
          ref={contentRef}
          style={{ x }}
          className="relative flex min-h-0 flex-1 items-start gap-4 px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:gap-5 lg:px-12"
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} onSelect={setSelectedProject} />
          ))}

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative h-107.5 w-[84vw] shrink-0 sm:h-109.5 sm:w-[70vw] lg:w-100"
          >
            <Card className="flex h-full flex-col items-center justify-center rounded-[2.25rem] border border-stone-950/10 bg-white/78 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/3">
              <ArrowRight className="h-10 w-10 text-stone-400 dark:text-stone-500" />
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">Full archive</h3>
              <Button
                onClick={() => router.push("/projects")}
                className="mt-6 rounded-full bg-sky-300 px-6 text-slate-950 hover:bg-sky-200"
              >
                Browse all projects
              </Button>
            </Card>
          </motion.div>

          <div className="hidden w-[16vw] shrink-0 lg:block" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            index={featuredProjects.findIndex((item) => item.id === selectedProject.id)}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
