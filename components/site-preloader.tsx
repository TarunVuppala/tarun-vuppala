"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, useReducedMotion } from "framer-motion"
import { Preloader_002 } from "@/components/ui/skiper-ui/skiper8"

export default function SitePreloader() {
  const reduceMotion = useReducedMotion()
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    if (reduceMotion) {
      setShowPreloader(false)
      return
    }

    const timer = window.setTimeout(() => {
      setShowPreloader(false)
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  useEffect(() => {
    const root = document.documentElement

    if (showPreloader) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    root.dataset.introReady = "true"
    delete root.dataset.preloader
  }, [showPreloader])

  return (
    <AnimatePresence mode="wait">
      {showPreloader ? <Preloader_002 /> : null}
    </AnimatePresence>
  )
}
