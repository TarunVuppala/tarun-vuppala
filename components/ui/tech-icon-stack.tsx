import { getTechIcon } from "@/lib/data"

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
      {tech.slice(0, limit).map((item, itemIndex) => (
        <div
          key={item}
          className={`group/tech relative z-0 flex ${iconSizeClass} items-center justify-center rounded-full bg-black transition-[margin] duration-200 ease-out hover:z-10 ${
            itemIndex === 0 ? "" : "-ml-2.5"
          } hover:ml-0 hover:mr-2.5`}
        >
          <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/78 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover/tech:opacity-100">
            {item}
          </span>
          <img
            src={getTechIcon(item)}
            alt={item}
            title={item}
            className={`${imageSizeClass} object-contain`}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none"
            }}
          />
        </div>
      ))}
    </div>
  )
}
