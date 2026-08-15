"use client"

import { useEffect, useRef, useState } from "react"
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
  const trackRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const widthRef = useRef(0)
  const positionRef = useRef(0)
  const reverseRef = useRef(reverse)
  const pausedRef = useRef(false)
  const initializedRef = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  reverseRef.current = reverse

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const track = trackRef.current
    const group = groupRef.current

    if (!track || !group) return

    const applyTransform = () => {
      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`
    }

    const measure = () => {
      const nextWidth = group.getBoundingClientRect().width
      if (!nextWidth) return

      widthRef.current = nextWidth

      if (!initializedRef.current) {
        positionRef.current = reverseRef.current ? -nextWidth : 0
        initializedRef.current = true
      } else {
        while (positionRef.current <= -nextWidth) {
          positionRef.current += nextWidth
        }

        while (positionRef.current > 0) {
          positionRef.current -= nextWidth
        }
      }

      applyTransform()
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(group)

    let animationFrame = 0
    let lastTimestamp = 0

    const step = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp
      }

      const delta = timestamp - lastTimestamp
      lastTimestamp = timestamp

      if (!pausedRef.current && widthRef.current > 0) {
        const speed = widthRef.current / (duration * 1000)
        const direction = reverseRef.current ? 1 : -1

        positionRef.current += direction * speed * delta

        while (positionRef.current <= -widthRef.current) {
          positionRef.current += widthRef.current
        }

        while (positionRef.current > 0) {
          positionRef.current -= widthRef.current
        }

        applyTransform()
      }

      animationFrame = window.requestAnimationFrame(step)
    }

    animationFrame = window.requestAnimationFrame(step)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [duration, reduceMotion])

  if (reduceMotion) {
    return (
      <div className="overflow-x-auto scrollbar-hide">
        <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-2", className)}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className="motion-strip overflow-hidden whitespace-nowrap"
      onPointerEnter={() => {
        pausedRef.current = true
      }}
      onPointerLeave={() => {
        pausedRef.current = false
      }}
    >
      <div ref={trackRef} className="motion-strip-track-base will-change-transform">
        <div ref={groupRef} className={cn("motion-strip-group", className)}>
          {children}
        </div>
        <div className={cn("motion-strip-group", className)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
