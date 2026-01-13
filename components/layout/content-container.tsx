"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ContentContainerProps = {
  children: ReactNode
  className?: string
}

export default function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-32", className)}>
      {children}
    </div>
  )
}
