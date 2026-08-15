"use client"

import { useEffect } from "react"

export default function PointerLight() {
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)")
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!media.matches || motion.matches) return

    const root = document.documentElement
    let frame = 0

    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty("--spot-x", `${(event.clientX / window.innerWidth) * 100}%`)
        root.style.setProperty("--spot-y", `${(event.clientY / window.innerHeight) * 100}%`)
        frame = 0
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
