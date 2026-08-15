"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ExternalLink, Github, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContentContainer from "@/components/layout/container"
import { ProjectModal } from "@/components/project-modal"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { allProjects } from "@/lib/data"
import { progressSpring } from "@/lib/motion"
import type { Project } from "@/types/project"

type ProjectCardProps = {
  index: number
  project: Project
  onSelect: (project: Project) => void
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const visibleCategories = project.categories.filter((item) => item !== "Published").slice(0, 2)
  const cardRef = useRef<HTMLElement>(null)

  return (
    <article
      ref={cardRef}
      className="h-107.5 w-[84vw] shrink-0 snap-start sm:h-109.5 sm:w-[70vw] lg:w-130"
      onPointerMove={(event) => {
        const node = cardRef.current
        if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (!window.matchMedia("(pointer: fine)").matches) return
        const box = node.getBoundingClientRect()
        const px = (event.clientX - box.left) / box.width - 0.5
        const py = (event.clientY - box.top) / box.height - 0.5
        node.style.setProperty("--tilt-x", `${(-py * 3.5).toFixed(2)}deg`)
        node.style.setProperty("--tilt-y", `${(px * 3.5).toFixed(2)}deg`)
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg")
        event.currentTarget.style.setProperty("--tilt-y", "0deg")
      }}
    >
      <Card className="viewfinder-tilt flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-stone-950/10 bg-white/82 p-0 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 hover:border-sky-300/50 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_110px_-48px_rgba(15,23,42,0.95)]">
        <div className="p-4">
          <ProjectPreviewPanel project={project} index={index} />
        </div>

        <CardContent className="flex flex-1 flex-col justify-end p-5 pt-0">
          <div className="flex items-start justify-between gap-4">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-stone-600 dark:text-stone-400">
              {visibleCategories.join(" · ")}
            </span>

            <div className="flex gap-1">
              {project.liveUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
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
                  asChild
                  className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open GitHub repository for ${project.title}`}>
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSelect(project)}
                aria-label={`View ${project.title} project details`}
                className="h-11 w-11 border-stone-950/10 bg-white/80 p-0 text-stone-800 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Info className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const sectionStart = useMotionValue(0)
  const sectionDistance = useMotionValue(1)
  const endX = useMotionValue(0)

  const featuredProjects = useMemo(() => allProjects.filter((project) => project.featured), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = featuredProjects.length + 1

  const scrollProgress = useTransform([scrollY, sectionStart, sectionDistance], ([y, start, distance]) => {
    const range = Number(distance) || 1
    return Math.min(1, Math.max(0, (Number(y) - Number(start)) / range))
  })
  const x = useTransform([scrollProgress, endX], ([progress, distance]) => -Number(distance) * Number(progress))
  const progressScale = useSpring(scrollProgress, progressSpring)

  useMotionValueEvent(scrollProgress, "change", (progress) => {
    const next = Math.min(featuredProjects.length, Math.floor(progress * slideCount))
    setActiveIndex((current) => (current === next ? current : next))
  })

  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current
      const track = contentRef.current
      const viewport = viewportRef.current
      if (!section) return

      const top = section.getBoundingClientRect().top + window.scrollY
      sectionStart.set(top)
      sectionDistance.set(Math.max(section.offsetHeight - window.innerHeight, 1))

      if (track && viewport) {
        endX.set(Math.max(0, track.scrollWidth - viewport.clientWidth))
      }
    }

    measure()
    const observer = new ResizeObserver(measure)

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (contentRef.current) observer.observe(contentRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)

    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      observer.disconnect()
    }
  }, [endX, featuredProjects.length, reduceMotion, sectionDistance, sectionStart])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ position: "relative" }}
      className={reduceMotion ? "relative" : "relative h-[310vh] bg-transparent"}
    >
      <div className={reduceMotion ? "relative flex flex-col" : "sticky top-0 flex h-screen flex-col"}>
        <div className="relative z-10 shrink-0 pt-[calc(var(--nav-height,72px)+8px)] sm:pt-[calc(var(--nav-height,72px)+12px)]">
          <ContentContainer>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="section-kicker">Selected work</p>
                <h2 className="mt-2 text-4xl font-black tracking-tighter text-stone-950 sm:text-5xl dark:text-stone-50">
                  {activeIndex >= featuredProjects.length
                    ? "Full archive"
                    : featuredProjects[activeIndex]?.title}
                </h2>
              </div>
              <p className="font-serif text-5xl leading-none tracking-[-0.08em] text-stone-300 tabular-nums sm:text-7xl dark:text-white/15">
                {String(Math.min(activeIndex + 1, slideCount)).padStart(2, "0")}
              </p>
            </div>

            <div className="mt-4" aria-hidden={!reduceMotion}>
              <div className="h-px overflow-hidden bg-stone-950/10 dark:bg-white/10">
                <motion.div
                  style={reduceMotion ? undefined : { scaleX: progressScale, transformOrigin: "left center" }}
                  className="h-full origin-left bg-sky-300"
                />
              </div>
            </div>
          </ContentContainer>
        </div>

        <div
          ref={viewportRef}
          className={
            reduceMotion
              ? "relative min-h-0 flex-1 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-12"
              : "relative min-h-0 flex-1 overflow-hidden px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-12"
          }
        >
          <motion.div
            ref={contentRef}
            style={reduceMotion ? undefined : { x }}
            className={
              reduceMotion
                ? "flex items-start gap-4 snap-x snap-mandatory lg:gap-5"
                : "flex items-start gap-4 lg:gap-5"
            }
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} index={index} project={project} onSelect={setSelectedProject} />
            ))}

            <article className="relative h-107.5 w-[84vw] shrink-0 snap-start sm:h-109.5 sm:w-[70vw] lg:w-100">
              <Card className="flex h-full flex-col items-center justify-center rounded-[2.25rem] border border-stone-950/10 bg-white/82 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <ArrowRight className="h-10 w-10 text-stone-500 dark:text-stone-400" aria-hidden="true" />
                <h3 className="mt-6 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">Full archive</h3>
                <Button
                  onClick={() => router.push("/projects")}
                  className="mt-6 h-11 rounded-full bg-sky-300 px-6 text-slate-950 hover:bg-sky-200"
                >
                  Browse all projects
                </Button>
              </Card>
            </article>
          </motion.div>
        </div>
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
