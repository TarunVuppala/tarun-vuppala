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
    once: false, // This allows animations to retrigger
    margin: "-20% 0px -20% 0px", // Trigger when 20% of the section is visible
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  }

  const profileVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      x: -100,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      rotate: 10,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      skewY: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      skewY: -3,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  }

  const badgeVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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

        {/* Animated Mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,50 Q25,20 50,50 T100,30 V100 H0 Z"
              fill="url(#meshGradient)"
              animate={
                isInView
                  ? {
                    d: [
                      "M0,50 Q25,20 50,50 T100,30 V100 H0 Z",
                      "M0,30 Q25,60 50,30 T100,50 V100 H0 Z",
                      "M0,50 Q25,20 50,50 T100,30 V100 H0 Z",
                    ],
                  }
                  : {}
              }
              transition={{
                duration: 8,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isInView ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "exit"}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Picture */}
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
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
              >
                <img
                  src="/placeholder.svg?height=320&width=320"
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

          {/* Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-border/50 shadow-2xl"
            >
              <motion.div
                animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="text-xs sm:text-sm font-medium">Available for opportunities</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={titleVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
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

            {/* Typewriter Subtitle */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6 h-12 sm:h-16 flex items-center justify-center lg:justify-start"
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
                key={isInView ? "active" : "inactive"} // Reset typewriter when view changes
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              I craft digital experiences that solve real problems and scale beautifully. From concept to deployment, I
              build systems that are efficient today and adaptable tomorrow.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleScrollToProjects}
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full shadow-2xl"
                >
                  View My Work
                  <motion.div
                    animate={isInView ? { y: [0, 3, 0] } : { y: 0 }}
                    transition={{
                      duration: 2,
                      repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                    }}
                  >
                    <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full bg-transparent backdrop-blur-sm"
                  onClick={handleScrollToContact}
                >
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full"
                >
                  <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Resume
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div variants={itemVariants} className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={isInView ? { y: [0, 8, 0] } : { y: 0 }}
          transition={{
            duration: 2,
            repeat: isInView ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground hidden sm:block">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-border rounded-full flex justify-center">
            <motion.div
              animate={isInView ? { y: [0, 10, 0] } : { y: 0 }}
              transition={{
                duration: 2,
                repeat: isInView ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-foreground rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
