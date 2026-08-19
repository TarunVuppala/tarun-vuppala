"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePageTransition } from "@/components/page-transition"
import { Card, CardContent } from "@/components/ui/card"
import ContentContainer from "@/components/layout/container"
import { ProjectModal } from "@/components/project-modal"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { TextRoll } from "@/components/ui/skiper-ui/skiper58"
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
      data-project-index={index}
      className="h-96 w-[84vw] shrink-0 snap-start sm:h-98 sm:w-[70vw] lg:w-130"
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
      <Card className="viewfinder-tilt flex h-full flex-col gap-0 overflow-hidden rounded-[1.4rem] border border-stone-950/10 bg-white/82 p-0 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 hover:border-sky-300/50 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_110px_-48px_rgba(15,23,42,0.95)]">
        <div className="p-4">
          <ProjectPreviewPanel project={project} index={index} onSelect={onSelect} />
        </div>

        <CardContent className="flex flex-1 flex-col gap-4 p-5 pt-1">
          <p className="[display:-webkit-box] min-h-10 overflow-hidden text-sm leading-6 text-stone-700 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-stone-300">
            {project.description}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid min-w-0 grid-cols-3 divide-x divide-stone-950/10 dark:divide-white/10">
              {project.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="min-w-0 px-2.5 first:pl-0 last:pr-0">
                  <p className="truncate text-sm font-semibold tracking-tight text-stone-950 dark:text-white">{metric.value}</p>
                  <p className="mt-1 truncate text-xs font-medium uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-stone-950/10 pt-3 dark:border-white/10">
            <div className="flex min-w-0 flex-wrap gap-2">
              {visibleCategories.map((category) => (
                <span
                  key={`${project.id}-${category}`}
                  className="rounded-full border border-stone-950/10 px-2.5 py-1 text-xs font-medium text-stone-500 dark:border-white/10 dark:text-stone-400"
                >
                  {category}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-label={`View details for ${project.title}`}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-950/5 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
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
  const { transitionTo } = usePageTransition()
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

  const updateActiveIndex = useCallback(() => {
    const viewport = viewportRef.current
    const track = contentRef.current
    if (!viewport || !track) return

    const threshold = viewport.getBoundingClientRect().left + viewport.clientWidth * 0.75
    const cards = track.querySelectorAll<HTMLElement>("[data-project-index]")
    let next = 0

    cards.forEach((card) => {
      const cardIndex = Number(card.dataset.projectIndex)
      if (card.getBoundingClientRect().left <= threshold) next = cardIndex
    })

    setActiveIndex((current) => (current === next ? current : next))
  }, [])

  useMotionValueEvent(x, "change", updateActiveIndex)

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

      updateActiveIndex()
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
  }, [endX, featuredProjects.length, reduceMotion, sectionDistance, sectionStart, updateActiveIndex])

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
                <p className="section-kicker">Things I&apos;ve built</p>
                <h2 className="mt-2 text-4xl font-black tracking-tighter text-stone-950 sm:text-5xl dark:text-stone-50">
                  <TextRoll
                    key={
                      activeIndex >= featuredProjects.length
                        ? "full-archive"
                        : featuredProjects[activeIndex]?.id
                    }
                    className="whitespace-nowrap"
                  >
                    {activeIndex >= featuredProjects.length
                      ? "Full archive"
                      : featuredProjects[activeIndex]?.title ?? ""}
                  </TextRoll>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-stone-700 dark:text-stone-300">
                  A mix of projects from internships, college, and experiments I started because I wanted to understand something better.
                </p>
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
                ? "flex w-max items-start gap-4 snap-x snap-mandatory lg:gap-5"
                : "flex w-max items-start gap-4 lg:gap-5"
            }
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} index={index} project={project} onSelect={setSelectedProject} />
            ))}

            <article
              data-project-index={featuredProjects.length}
              className="relative h-96 w-[84vw] shrink-0 snap-start sm:h-98 sm:w-[70vw] lg:w-130"
            >
              <Card className="flex h-full flex-col items-center justify-center rounded-[2.25rem] border border-stone-950/10 bg-white/82 p-8 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <ArrowRight className="h-10 w-10 text-stone-500 dark:text-stone-400" aria-hidden="true" />
                <h3 className="mt-6 text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">Full archive</h3>
                <Button
                  onClick={() => transitionTo("/projects")}
                  className="mt-6 h-11 rounded-full bg-sky-300 px-6 text-slate-950 hover:bg-sky-200"
                >
                  Browse all projects
                </Button>
              </Card>
            </article>

            <div
              aria-hidden="true"
              className="h-96 w-96 shrink-0 sm:h-98"
            />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            index={featuredProjects.findIndex((item) => item.id === selectedProject.id)}
            projects={featuredProjects}
            onClose={() => setSelectedProject(null)}
            onNavigate={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
