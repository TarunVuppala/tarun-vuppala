"use client"

import { getTechIcon } from "@/lib/data"
import { getTechIconImageClass } from "@/lib/tech-icons"

type TechIconStackProps = {
  tech: string[]
  limit?: number
  size?: "sm" | "md"
  className?: string
}

export default function TechIconStack({
  tech,
  limit = 5,
  size = "md",
  className = "",
}: TechIconStackProps) {
  const iconSizeClass = size === "sm" ? "h-8 w-8" : "h-9 w-9"
  const imageSizeClass = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"

  return (
    <div className={`flex flex-wrap items-center ${className}`.trim()}>
      {tech.slice(0, limit).map((item, itemIndex) => {
        const iconSrc = getTechIcon(item)
        const iconToneClass = getTechIconImageClass(iconSrc)

        return (
          <div
            key={item}
            className={`group/tech relative z-0 flex ${iconSizeClass} items-center justify-center rounded-full bg-white/82 ring-1 ring-stone-950/10 shadow-sm transition-[margin] duration-200 ease-out hover:z-10 dark:bg-black dark:ring-0 dark:shadow-none ${
              itemIndex === 0 ? "" : "-ml-2.5"
            } hover:ml-0 hover:mr-2.5`}
          >
            <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-stone-950/10 bg-white/95 px-2.5 py-1 text-[10px] font-medium text-stone-900 opacity-0 shadow-sm transition-opacity duration-200 group-hover/tech:opacity-100 dark:border-white/10 dark:bg-black/78 dark:text-white dark:shadow-none">
              {item}
            </span>
            <img
              src={iconSrc}
              alt={item}
              title={item}
              className={`${imageSizeClass} ${iconToneClass} object-contain`}
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = "none"
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
