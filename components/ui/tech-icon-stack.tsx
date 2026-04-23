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
  const iconSizeClass = size === "sm" ? "h-7 w-7" : "h-8 w-8"
  const imageSizeClass = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {tech.slice(0, limit).map((item) => {
        const iconSrc = getTechIcon(item)
        const iconToneClass = getTechIconImageClass(iconSrc)

        return (
          <div
            key={item}
            className={`flex ${iconSizeClass} items-center justify-center rounded-md bg-stone-950/[0.04] text-stone-700 dark:bg-white/[0.05] dark:text-stone-200`}
            title={item}
            aria-label={item}
          >
            <img
              src={iconSrc}
              alt={item}
              draggable={false}
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
