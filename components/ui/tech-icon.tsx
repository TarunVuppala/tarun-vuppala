import Image from "next/image"
import { getTechIconImageClass } from "@/lib/tech-icons"
import { cn } from "@/lib/utils"

type TechIconProps = {
  src: string
  name: string
  className?: string
}

function isRemoteOrSvg(src: string) {
  return src.startsWith("http") || src.endsWith(".svg")
}

export default function TechIcon({ src, name, className }: TechIconProps) {
  return (
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      unoptimized={isRemoteOrSvg(src)}
      draggable={false}
      className={cn("h-3.5 w-3.5 shrink-0 object-contain opacity-70", getTechIconImageClass(src), className)}
      onError={(event) => {
        event.currentTarget.style.visibility = "hidden"
      }}
    />
  )
}
