"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type MotionStripProps = {
  children: ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}

export function MotionStrip({
  children,
  className,
  duration = 20,
  reverse = false,
}: MotionStripProps) {
  return (
    <div
      className="motion-strip overflow-hidden whitespace-nowrap"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(
          "motion-strip-track-base",
          reverse ? "motion-strip-track-reverse" : "motion-strip-track",
        )}
      >
        <div className={cn("motion-strip-group", className)}>{children}</div>
        <div className={cn("motion-strip-group", className)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
