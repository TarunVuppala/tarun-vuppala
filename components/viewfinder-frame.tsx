"use client"

import { useRef, type ReactNode } from "react"

export default function ViewfinderFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="group relative"
      onPointerMove={(event) => {
        const node = ref.current
        if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (!window.matchMedia("(pointer: fine)").matches) return
        const box = node.getBoundingClientRect()
        const px = (event.clientX - box.left) / box.width - 0.5
        const py = (event.clientY - box.top) / box.height - 0.5
        node.style.setProperty("--tilt-x", `${(-py * 6).toFixed(2)}deg`)
        node.style.setProperty("--tilt-y", `${(px * 6).toFixed(2)}deg`)
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg")
        event.currentTarget.style.setProperty("--tilt-y", "0deg")
      }}
    >
      <div className="viewfinder-tilt relative">
        <span aria-hidden className="viewfinder-corner viewfinder-corner-tl" />
        <span aria-hidden className="viewfinder-corner viewfinder-corner-tr" />
        <span aria-hidden className="viewfinder-corner viewfinder-corner-bl" />
        <span aria-hidden className="viewfinder-corner viewfinder-corner-br" />
        {children}
      </div>
    </div>
  )
}
