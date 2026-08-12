"use client"

import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import ProjectPreviewPanel from "@/components/project-preview-panel"
import { Button } from "@/components/ui/button"

type ProjectModalProps = {
  project: Project
  index: number
  onClose: () => void
}

export function ProjectModal({ project, index, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusCloseButton = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      window.cancelAnimationFrame(focusCloseButton)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus()
    }
  }, [onClose])

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return

    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/48 p-4 backdrop-blur-md dark:bg-black/72 sm:p-6"
      onMouseDown={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project details`}
          tabIndex={-1}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-auto w-full max-w-4xl rounded-[1.75rem] border border-stone-950/10 bg-[rgba(250,247,241,0.96)] shadow-[0_30px_120px_-60px_rgba(15,23,42,0.38)] dark:border-white/10 dark:bg-[rgba(16,13,11,0.96)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_50px_150px_-50px_rgba(0,0,0,0.78)]"
          onMouseDown={(event) => event.stopPropagation()}
          onKeyDown={trapFocus}
        >
          <Button
            ref={closeButtonRef}
            size="sm"
            variant="outline"
            onClick={onClose}
            aria-label="Close project details"
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
                <div className="mt-4 space-y-2.5">
                  {project.details.results.slice(0, 3).map((result) => (
                    <div key={`${project.id}-${result}`} className="flex items-start gap-3 text-sm leading-6 text-stone-700/82 dark:text-stone-300/80">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
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
