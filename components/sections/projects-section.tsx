"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Info, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContentContainer from "@/components/layout/container"
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
      className="h-[430px] w-[84vw] shrink-0 snap-start sm:h-[438px] sm:w-[70vw] lg:w-[520px]"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-stone-950/10 bg-white/78 p-0 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_110px_-48px_rgba(15,23,42,0.95)]">
        <div className="p-4">
          <ProjectPreviewPanel project={project} index={index} />
        </div>

        <CardContent className="flex flex-1 flex-col p-5 pt-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {visibleCategories.map((item) => (
                <span
                  key={`${project.id}-${item}`}
                  className="inline-flex items-center rounded-full border border-stone-950/10 bg-stone-950/[0.03] px-3 py-1.5 text-[11px] text-stone-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-300"
                >
                  {item}
                </span>
              ))}
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

          <p className="mt-4 max-w-[28rem] text-sm leading-6 text-stone-700/80 dark:text-stone-300/78">{project.impact}</p>
        </CardContent>
      </Card>
    </motion.article>
  )
}

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project
  index: number
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/48 p-4 backdrop-blur-md dark:bg-black/72 sm:p-6"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-auto w-full max-w-4xl rounded-[1.75rem] border border-stone-950/10 bg-[rgba(250,247,241,0.96)] shadow-[0_30px_120px_-60px_rgba(15,23,42,0.38)] dark:border-white/10 dark:bg-[rgba(16,13,11,0.96)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_50px_150px_-50px_rgba(0,0,0,0.78)]"
          onClick={(event) => event.stopPropagation()}
        >
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 shrink-0 rounded-full border-stone-950/10 bg-white/78 text-stone-900 hover:bg-white dark:border-white/10 dark:bg-black/28 dark:text-white dark:hover:bg-white/10 sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="p-5 sm:p-6">
            <ProjectPreviewPanel project={project} index={index} bare />
          </div>

          <div className="grid gap-4 border-t border-stone-950/10 px-5 pb-5 pt-5 dark:border-white/10 sm:px-6 sm:pb-6 sm:pt-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-3">
              <div>
                <p className="meta-label">Problem</p>
                <p className="detail-copy mt-3">{project.problem}</p>
              </div>

              <div className="border-t border-stone-950/10 pt-4 dark:border-white/10">
                <p className="meta-label">Built</p>
                <p className="detail-copy mt-3">{project.solution}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.liveUrl && (
                  <Button asChild className="rounded-full bg-sky-300 px-5 text-slate-950 hover:bg-sky-200">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit live build
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-stone-950/10 bg-white/75 px-5 text-stone-900 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      View repository
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="meta-label">Highlights</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {project.details.results.slice(0, 3).map((result, resultIndex) => (
                    <div
                      key={`${project.id}-${result}`}
                      className={`flex gap-3 rounded-[1rem] border border-stone-950/10 bg-black/[0.02] px-4 py-3 text-sm leading-6 text-stone-700/82 dark:border-white/10 dark:bg-white/[0.03] dark:text-stone-300/80 ${
                        resultIndex === 2 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-sky-300" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-950/10 pt-4 dark:border-white/10">
                <p className="meta-label">Takeaway</p>
                <p className="detail-copy mt-3 text-stone-800 dark:text-stone-200/90">{project.details.learnings}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
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

  const featuredProjects = useMemo(
    () => allProjects.filter((project) => project.featured),
    [],
  )

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

      <div className="sticky top-0 relative flex h-screen flex-col overflow-hidden">
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
            className="relative h-[430px] w-[84vw] shrink-0 sm:h-[438px] sm:w-[70vw] lg:w-[400px]"
          >
            <Card className="flex h-full flex-col items-center justify-center rounded-[2.25rem] border border-stone-950/10 bg-white/78 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
              <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-[2rem] border border-sky-300/20 bg-sky-300/10">
                <ArrowRight className="h-10 w-10 text-sky-700 dark:text-sky-100" />
              </div>
              <h3 className="relative mt-8 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">Full archive</h3>
              <Button
                onClick={() => router.push("/projects")}
                className="relative mt-6 rounded-full bg-sky-300 px-6 text-slate-950 hover:bg-sky-200"
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
