"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Code, Coffee, Lightbulb, Target, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const highlights = [
  {
    icon: Code,
    title: "Clean Architecture",
    description: "I believe in writing code that's not just functional, but maintainable and scalable.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Every challenge is an opportunity to learn and create innovative solutions.",
  },
  {
    icon: Target,
    title: "Goal Oriented",
    description: "Focused on delivering results that make a real impact on users and businesses.",
  },
]

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "2+", label: "Years Experience" },
  { number: "10+", label: "Technologies" },
  { number: "100%", label: "Client Satisfaction" },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={containerRef} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div style={{ y }} className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/50 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Me
            </motion.span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a love for creating meaningful digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hey there! I'm <span className="text-primary font-semibold">Tarun Vuppala</span>, a Computer Science
                student who fell in love with web development during those late-night coding sessions as a beginner.
              </p>

              <p>
                What started as curiosity evolved through internships where I solved real problems, and now drives me to
                build systems that scale. I dig into every challenge—researching, questioning, testing—until I craft
                solutions that are efficient today and adaptable tomorrow.
              </p>

              <p>
                My goal? Launch a startup that tackles something big, one flawless line of code at a time. I believe in
                the power of clean architecture, thoughtful design, and code that tells a story.
              </p>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg"
            >
              <p className="text-primary font-medium italic">
                "Code is like humor. When you have to explain it, it's bad."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Cory House</p>
            </motion.div>

            {/* Highlights */}
            <div className="grid gap-4 mt-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <highlight.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="text-center p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-0">
                      <motion.div
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Current Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Currently Focused On</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 15", "React Server Components", "TypeScript", "System Design"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border/50"
            >
              <Coffee className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Fun Fact</p>
                <p className="text-sm text-muted-foreground">
                  I've consumed over 1000 cups of coffee while coding this year ☕
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
