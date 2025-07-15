"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const textInView = useInView(textRef, { once: true, margin: "-10%" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="about" ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-border/20 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-primary to-transparent mb-6"
              />

              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                About{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Me
                </motion.span>
              </motion.h2>
            </div>

            <motion.div ref={textRef} variants={itemVariants} className="space-y-6">
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={textInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/30" />
                <blockquote className="text-lg md:text-xl font-light italic text-muted-foreground pl-8 border-l-2 border-primary/30">
                  "Code is poetry written in logic, and I'm here to craft verses that solve real problems."
                </blockquote>
              </motion.div>

              {/* Story paragraphs with staggered animation */}
              {[
                "I'm Tarun, a Computer Science student with an insatiable curiosity for web development. What started as late-night coding sessions has evolved into a passion for building systems that solve real problems and scale beautifully.",
                "I believe in writing code that's not just functional, but elegant and maintainable. Every project is an opportunity to learn something new and push the boundaries of what's possible on the web.",
                "My goal is to launch a startup that makes a meaningful impact, one line of code at a time. I'm driven by the challenge of turning complex problems into simple, intuitive solutions.",
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30">
              {[
                { number: "50+", label: "Projects Built" },
                { number: "3+", label: "Years Coding" },
                { number: "∞", label: "Problems Solved" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Simple Visual */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full h-96 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
              <div className="absolute inset-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <h3 className="text-xl font-bold mb-2">Always Building</h3>
                  <p className="text-muted-foreground">Turning ideas into reality</p>
                </div>
              </div>
            </motion.div>

            {/* Floating cards around visual */}
            {["Creative", "Analytical", "Passionate"].map((trait, index) => (
              <motion.div
                key={trait}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.2 }}
                className={`absolute ${
                  index === 0
                    ? "top-10 left-10"
                    : index === 1
                      ? "top-20 right-10"
                      : "bottom-10 left-1/2 transform -translate-x-1/2"
                }`}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3">
                    <span className="text-sm font-medium">{trait}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
