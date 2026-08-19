"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const COLUMN_COUNT = 12
const ROW_COUNT = 8
const STEP = 0.016

function shuffle<T>(items: T[]) {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export function Preloader_005({
  className,
  onComplete,
}: {
  className?: string
  onComplete?: () => void
}) {
  const [phase, setPhase] = useState<"in" | "out">("in")
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const delays = useMemo(
    () =>
      Array.from({ length: COLUMN_COUNT }, () =>
        shuffle(Array.from({ length: ROW_COUNT }, (_, index) => index)).map((index) => index * STEP),
      ),
    [],
  )

  useEffect(() => {
    const coverMs = ROW_COUNT * STEP * 1000 + 60
    const revealMs = coverMs + 80

    const cover = window.setTimeout(() => setPhase("out"), coverMs)
    const done = window.setTimeout(() => onCompleteRef.current?.(), coverMs + revealMs)

    return () => {
      window.clearTimeout(cover)
      window.clearTimeout(done)
    }
  }, [])

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-10 flex overflow-hidden", className)}
      role="status"
      aria-live="polite"
      aria-label="Opening project"
    >
      {delays.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-1 flex-col">
          {column.map((delay, rowIndex) => (
            <motion.div
              key={`${columnIndex}-${rowIndex}`}
              className="w-full flex-1 bg-stone-900/18 dark:bg-white/12"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "in" ? 1 : 0 }}
              transition={{ duration: 0.12, delay, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
