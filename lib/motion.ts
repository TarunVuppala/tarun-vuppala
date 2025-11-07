import type { Transition } from "framer-motion"

export const smoothEase: Transition["ease"] = [0.16, 1, 0.3, 1]

export const smoothFade: Transition = {
  duration: 0.7,
  ease: smoothEase,
}

export const slowFade: Transition = {
  duration: 1,
  ease: smoothEase,
}

export const gentleSpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 0.9,
}

export const hoverSpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  mass: 0.8,
}

type LoopOptions = {
  delay?: number
  repeatType?: Transition["repeatType"]
}

export const loopTransition = (duration: number, options: LoopOptions = {}): Transition => ({
  duration,
  ease: smoothEase,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: options.repeatType ?? "mirror",
  delay: options.delay,
})

export const staggerChildren = {
  staggerChildren: 0.18,
  delayChildren: 0.12,
}

export const subtleStaggerChildren = {
  staggerChildren: 0.12,
  delayChildren: 0.08,
}

export const scrollOpacity: Transition = {
  duration: 0.6,
  ease: smoothEase,
}
