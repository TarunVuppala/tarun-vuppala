"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

const ease = [0.76, 0, 0.24, 1] as const

const opacity = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease, delay: 0.2 },
  },
}

export function Preloader_002() {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (index >= words.length - 1) return

    const timeout = window.setTimeout(
      () => setIndex((current) => current + 1),
      index === 0 ? 1000 : 150,
    )

    return () => window.clearTimeout(timeout)
  }, [index])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease, delay: 0.3 },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex h-svh w-screen items-center justify-center bg-[#141516]"
      variants={slideUp}
      initial="initial"
      exit="exit"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {dimension.width > 0 ? (
        <>
          <motion.p
            className="absolute z-10 flex items-center text-[2.625rem] text-white"
            variants={opacity}
            initial="initial"
            animate="enter"
          >
            <span className="mr-2.5 block size-2.5 rounded-full bg-white" aria-hidden />
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full" aria-hidden>
            <motion.path className="fill-[#141516]" variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      ) : null}
    </motion.div>
  )
}
