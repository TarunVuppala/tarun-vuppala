"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { TypewriterText } from "../ui/typewriter-text"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Sparkles } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track if the hero section is in view
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-20% 0px -20% 0px",
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  }

  const badgeVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen min-w-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-16"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={
                isInView
                  ? {
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }
                  : {
                    opacity: 0,
                  }
              }
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Mobile Layout - Vertical */}
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 lg:hidden">
          {/* Profile Picture - Mobile */}
          <motion.div variants={profileVariants} className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 20,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary opacity-20 blur-xl"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-primary/20 shadow-2xl"
              >
                <img
                  src="/image.png"
                  alt="Tarun Vuppala"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </motion.div>
              {/* Floating Elements */}
              <motion.div
                animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                  duration: 2,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-card/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 border border-border/50"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Status Badge - Mobile */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 sm:gap-3 bg-card/80 backdrop-blur-xl rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-border/50 shadow-2xl"
          >
            <motion.div
              animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{
                duration: 2,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
              }}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"
            />
            <span className="text-xs sm:text-sm font-medium">Available for opportunities</span>
          </motion.div>

          {/* Main Title - Mobile */}
          <motion.h1 variants={titleVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Tarun
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground/60 to-foreground bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Vuppala
            </motion.span>
          </motion.h1>

          {/* Typewriter Subtitle - Mobile */}
          <motion.div
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center"
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
            className="flex flex-col gap-3 justify-center items-center w-full max-w-sm pt-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button
                onClick={handleScrollToProjects}
                size="lg"
                className="w-full px-6 py-2.5 text-sm font-semibold rounded-full shadow-2xl"
              >
                View My Work
                <motion.div
                  animate={isInView ? { y: [0, 3, 0] } : { y: 0 }}
                  transition={{
                    duration: 2,
                    repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                  }}
                >
                  <ArrowDown className="ml-2 w-3 h-3" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full px-6 py-2.5 text-sm rounded-full bg-transparent backdrop-blur-sm"
                onClick={handleScrollToContact}
              >
                Get In Touch
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button variant="ghost" size="lg" className="w-full px-6 py-2.5 text-sm rounded-full">
                <Download className="mr-2 w-3 h-3" />
                Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Picture - Desktop */}
          <motion.div variants={profileVariants} className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <motion.div
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 20,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary opacity-20 blur-xl"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
              >
                <img
                  src="/image.png"
                  alt="Tarun Vuppala"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </motion.div>
              {/* Floating Elements */}
              <motion.div
                animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
                transition={{
                  duration: 2,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                }}
                className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-sm rounded-full p-3 border border-border/50"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content - Desktop */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            {/* Status Badge - Desktop */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-xl rounded-full px-6 py-3 border border-border/50 shadow-2xl"
            >
              <motion.div
                animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="text-sm font-medium">Available for opportunities</span>
            </motion.div>

            {/* Main Title - Desktop */}
            <motion.h1 variants={titleVariants} className="text-5xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              <motion.span
                className="inline-block bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Tarun
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-foreground/60 to-foreground bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Vuppala
              </motion.span>
            </motion.h1>

            {/* Typewriter Subtitle - Desktop */}
            <motion.div
              variants={itemVariants}
              className="text-xl xl:text-2xl 2xl:text-3xl text-muted-foreground min-h-[3rem] flex items-center justify-center lg:justify-start"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleScrollToProjects}
                  size="lg"
                  className="px-8 py-3 text-base font-semibold rounded-full shadow-2xl min-w-[160px]"
                >
                  View My Work
                  <motion.div
                    animate={isInView ? { y: [0, 3, 0] } : { y: 0 }}
                    transition={{
                      duration: 2,
                      repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                    }}
                  >
                    <ArrowDown className="ml-2 w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-base rounded-full bg-transparent backdrop-blur-sm min-w-[160px]"
                  onClick={handleScrollToContact}
                >
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="lg" className="px-8 py-3 text-base rounded-full min-w-[160px]">
                  <Download className="mr-2 w-4 h-4" />
                  Resume
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={isInView ? { y: [0, 6, 0] } : { y: 0 }}
          transition={{
            duration: 2,
            repeat: isInView ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1 sm:gap-2"
        >
          <span className="text-xs text-muted-foreground hidden sm:block">Scroll to explore</span>
          <div className="w-4 h-6 sm:w-5 sm:h-8 border-2 border-border rounded-full flex justify-center">
            <motion.div
              animate={isInView ? { y: [0, 8, 0] } : { y: 0 }}
              transition={{
                duration: 2,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-foreground rounded-full mt-0.5 sm:mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
