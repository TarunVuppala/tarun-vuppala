import { getTechIcon } from "@/lib/data"
import TechIcon from "@/components/ui/tech-icon"

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
  const imageSizeClass = size === "sm" ? "h-4 w-4" : "h-4.5 w-4.5"

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`.trim()}>
      {tech.slice(0, limit).map((item) => {
        const iconSrc = getTechIcon(item)

        return (
          <div
            key={item}
            className={`flex ${iconSizeClass} items-center justify-center rounded-md bg-stone-950/4 text-stone-700 dark:bg-white/5 dark:text-stone-200`}
            title={item}
          >
            <TechIcon src={iconSrc} name={item} className={`${imageSizeClass} opacity-100`} />
            <span className="sr-only">{item}</span>
          </div>
        )
      })}
    </div>
  )
}
