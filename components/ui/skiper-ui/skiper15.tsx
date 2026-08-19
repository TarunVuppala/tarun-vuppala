"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const BOX_COUNT = 10

export function PreLoader_006({
  className,
  duration = 2300,
}: {
  className?: string
  duration?: number
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - started) / duration) * 100))
      setProgress(next)
      if (next < 100) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [duration])

  const filled = Math.ceil((progress / 100) * BOX_COUNT)

  return (
    <div
      className={cn(
        "flex h-full min-h-svh w-full items-center justify-center bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="w-[min(22rem,calc(100vw-2.5rem))] rounded-[1.35rem] border border-zinc-950/8 bg-white shadow-[0_18px_50px_-24px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Loader
          </p>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </span>
        </div>

        <div className="border-t border-zinc-950/6 px-4 pb-4 pt-5 dark:border-white/8">
          <div className="flex items-center justify-between gap-1.5 rounded-xl bg-zinc-100 px-2 py-2 dark:bg-zinc-800/80">
            {Array.from({ length: BOX_COUNT }, (_, index) => {
              const isFilled = index < filled
              const isCurrent = index === filled - 1 && progress < 100

              return (
                <motion.span
                  key={index}
                  className={cn(
                    "h-7 w-7 rounded-md",
                    isFilled
                      ? isCurrent
                        ? "bg-zinc-500 dark:bg-zinc-400"
                        : "bg-zinc-700 dark:bg-zinc-200"
                      : "bg-zinc-200 dark:bg-zinc-700",
                  )}
                  initial={{ opacity: 0.35, scale: 0.88 }}
                  animate={{
                    opacity: isFilled ? 1 : 0.55,
                    scale: isFilled ? 1 : 0.94,
                  }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                />
              )
            })}
          </div>

          <p className="mt-3 text-right text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
