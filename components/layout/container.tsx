"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ContentContainerProps = {
  children: ReactNode
  className?: string
}

export default function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-28", className)}>
      {children}
    </div>
  )
}
