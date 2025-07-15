"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export function TypewriterText({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          setCurrentText(fullText.slice(0, currentText.length + 1))

          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className="font-mono">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
