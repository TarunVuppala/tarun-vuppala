"use client"

import { useEffect, useState } from "react"

const ITEMS = [
  { id: "hero", label: "Intro" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const

export default function SectionIndex() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const nodes = ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.08, 0.2, 0.4] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto flex flex-col gap-2">
        {ITEMS.map((item, index) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group flex items-center justify-end gap-3 py-1 text-right ${
                  isActive ? "text-foreground" : "text-stone-500 hover:text-foreground dark:text-stone-500"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`text-[0.62rem] font-medium uppercase tracking-[0.16em] transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
                <span className="font-mono text-[0.68rem] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={`block h-px transition-[width,background-color] duration-200 ${
                    isActive ? "w-6 bg-sky-300" : "w-3 bg-stone-400 group-hover:w-5 dark:bg-stone-600"
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
