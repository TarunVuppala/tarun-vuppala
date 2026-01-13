"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { TypewriterText } from "../ui/typewriter-text"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import Image from "next/image"
import { gentleSpring, hoverSpring, loopTransition, smoothFade, staggerChildren } from "@/lib/motion"
import ContentContainer from "@/components/layout/content-container"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Track if the hero section is in view
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-20% 0px -20% 0px",
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...staggerChildren,
      },
    },
  } satisfies Variants

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...smoothFade,
      },
    },
  } satisfies Variants

  const profileVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      x: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        ...smoothFade,
        duration: 0.8,
      },
    },
  } satisfies Variants

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...smoothFade,
        duration: 0.75,
      },
    },
  } satisfies Variants

  const badgeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        ...gentleSpring,
      },
    },
  } satisfies Variants

  const shouldAnimate = !prefersReducedMotion && isInView

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen min-w-screen flex items-center justify-center overflow-hidden pt-16 pb-12"
    >
      {/* Content */}
      <ContentContainer className="relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mobile Layout - Vertical */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:hidden">
          {/* Profile Picture - Mobile */}
          <motion.div variants={profileVariants} className="flex justify-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={hoverSpring}
                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-border"
              >
                <Image
                  src="/image.png"
                  alt="Tarun Vuppala"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 192px"
                  priority
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title - Mobile */}
          <motion.h1 variants={titleVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <motion.span className="inline-block text-foreground" whileHover={{ scale: 1.02 }} transition={hoverSpring}>
              Tarun
            </motion.span>
            <br />
            <motion.span className="inline-block text-foreground" whileHover={{ scale: 1.02 }} transition={hoverSpring}>
              Vuppala
            </motion.span>
          </motion.h1>

          {/* Typewriter Subtitle - Mobile */}
          <motion.div
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground min-h-6 sm:min-h-8 md:min-h-10 flex items-center justify-center"
          >
            <TypewriterText
              texts={[
                "Full Stack Developer",
                "System Architect",
                "Problem Solver",
                "Code Craftsman",
                "Digital Innovator",
              ]}
              speed={80}
              deleteSpeed={40}
              pauseTime={2500}
              key={isInView ? "active" : "inactive"}
            />
          </motion.div>

          {/* CTA Buttons - Mobile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-2 justify-center items-center w-full max-w-sm pt-1"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring} className="w-full">
              <Button
                onClick={handleScrollToProjects}
                size="lg"
                className="w-full px-5 py-2 text-sm font-semibold rounded-full"
              >
                View My Work
                <motion.div
                  animate={isInView ? { y: [0, 3, 0] } : { y: 0 }}
                  transition={isInView ? loopTransition(2.4) : smoothFade}
                >
                  <ArrowDown className="ml-2 w-3 h-3" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring} className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full px-5 py-2 text-sm rounded-full bg-transparent"
                onClick={handleScrollToContact}
              >
                Get In Touch
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring} className="w-full">
              <a href={"/resume.pdf"} download={"Tarun-Vuppala's-Resume.pdf"}>
                <Button variant="ghost" size="lg" className="w-full px-5 py-2 text-sm rounded-full">
                  <Download className="mr-2 w-3 h-3" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
          {/* Profile Picture - Desktop */}
          <motion.div variants={profileVariants} className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={hoverSpring}
                className="relative w-56 h-56 xl:w-72 xl:h-72 rounded-full overflow-hidden border border-border"
              >
                <Image
                  src="/image.png"
                  alt="Tarun Vuppala"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 256px, 320px"
                  priority
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content - Desktop */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            {/* Main Title - Desktop */}
            <motion.h1 variants={titleVariants} className="text-5xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              <motion.span className="inline-block text-foreground" whileHover={{ scale: 1.05 }} transition={hoverSpring}>
                Tarun
              </motion.span>
              <br />
              <motion.span className="inline-block text-foreground" whileHover={{ scale: 1.05 }} transition={hoverSpring}>
                Vuppala
              </motion.span>
            </motion.h1>

            {/* Typewriter Subtitle - Desktop */}
            <motion.div
              variants={itemVariants}
              className="text-xl xl:text-2xl 2xl:text-3xl text-muted-foreground min-h-12 flex items-center justify-center lg:justify-start"
            >
              <TypewriterText
                texts={[
                  "Full Stack Developer",
                  "System Architect",
                  "Problem Solver",
                  "Code Craftsman",
                  "Digital Innovator",
                ]}
                speed={80}
                deleteSpeed={40}
                pauseTime={2500}
                key={isInView ? "active" : "inactive"}
              />
            </motion.div>

            {/* CTA Buttons - Desktop */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring}>
                <Button
                  onClick={handleScrollToProjects}
                  size="lg"
                  className="px-6 py-2.5 text-base font-semibold rounded-full min-w-36"
                >
                  View My Work
                  <motion.div
                    animate={isInView ? { y: [0, 3, 0] } : { y: 0 }}
                    transition={isInView ? loopTransition(2.4) : smoothFade}
                  >
                    <ArrowDown className="ml-2 w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 py-2.5 text-base rounded-full bg-transparent min-w-36"
                  onClick={handleScrollToContact}
                >
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={hoverSpring} className="w-full">
                <a href={"/Tarun-Vuppala's-Resume.pdf"} download={"Tarun-Vuppala's-Resume.pdf"}>
                  <Button variant="ghost" size="lg" className="w-full px-5 py-2 text-sm rounded-full">
                    <Download className="mr-2 w-3 h-3" />
                    Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </ContentContainer>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-3 sm:bottom-5 lg:bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={isInView ? { y: [0, 6, 0] } : { y: 0 }}
          transition={isInView ? loopTransition(2.8) : smoothFade}
          className="flex flex-col items-center gap-1 sm:gap-2"
        >
          <span className="text-xs text-muted-foreground hidden sm:block">Scroll to explore</span>
          <div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-border rounded-full flex justify-center">
            <motion.div
              animate={isInView ? { y: [0, 8, 0] } : { y: 0 }}
              transition={isInView ? loopTransition(2.8) : smoothFade}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-foreground rounded-full mt-0.5 sm:mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
