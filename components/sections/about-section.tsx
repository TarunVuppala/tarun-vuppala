"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"
import { Quote } from "lucide-react"
import { codingQuotes, codingStats, highlights, journeyExpanded } from "@/lib/data"
import { hoverSpring, slowFade, smoothFade, subtleStaggerChildren } from "@/lib/motion"

const containerVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...slowFade,
      ...subtleStaggerChildren,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      ...smoothFade,
      duration: 0.5,
      ...subtleStaggerChildren,
      staggerDirection: -1,
    },
  },
} satisfies Variants

const itemVariants = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1, transition: { ...smoothFade } },
  exit: { opacity: 0, scale: 0.94, transition: { ...smoothFade, duration: 0.45 } },
} satisfies Variants

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [featuredQuote] = useState(() => codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
  const [featuredStat] = useState(() => codingStats[Math.floor(Math.random() * codingStats.length)])

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 sm:py-32 relative overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {isInView && (
            <motion.div
              key="about-content"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-16"
            >

              <motion.div variants={itemVariants} className="text-center mb-16">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  exit={{ width: 0 }}
                  transition={{ ...slowFade, delay: 0.3 }}
                  className="h-px bg-border mx-auto mb-8"
                />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  About{" "}
                <motion.span className="inline-block text-primary" whileHover={{ scale: 1.05 }} transition={hoverSpring}>
                  Me
                </motion.span>
              </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Passionate developer crafting meaningful digital experiences with code as my canvas.
                </p>
              </motion.div>


              <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="space-y-8">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Hey there! I'm <span className="text-primary font-semibold">Tarun Vuppala</span>, a Computer Science student who turned late-night coding curiosity into a passion for building scalable web solutions.
                    </p>
                    <p>
                      From internships solving real-world challenges to dreaming of my own startup, I thrive on clean design and innovative problem-solving.
                    </p>
                  </div>

                  <motion.div
                    variants={itemVariants}
                    className="relative p-6 bg-card rounded-xl border border-border shadow-sm"
                  >
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/30" />
                  <motion.blockquote
                    className="text-lg md:text-xl font-light italic text-foreground pl-8 border-l-2 border-primary/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { ...slowFade, duration: 1.2 } }}
                  >
                    {featuredQuote}
                  </motion.blockquote>
                </motion.div>

                </div>

                <div className="space-y-8">
                  {/* Animated Fun Fact */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={hoverSpring}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
                  >
                    <featuredStat.icon className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">Fun Fact</p>
                      <p className="text-sm text-muted-foreground">{featuredStat.text}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">Experience</h3>
                  <p className="text-muted-foreground mt-2">
                    Roles where I shipped real products and learned fast.
                  </p>
                </div>
                <div className="mx-auto max-w-5xl space-y-8">
                  {journeyExpanded.map((item, index) => (
                    <motion.div
                      key={`${item.year}-${item.company}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...smoothFade, delay: index * 0.08 }}
                      className="border-b border-border pb-8"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-xl font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.year}</span>
                      </div>
                      <p className="mt-4 text-muted-foreground">{item.description}</p>
                      <ul className="mt-4 space-y-2">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="text-sm text-muted-foreground flex items-start"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Highlights Grid */}
              <div className="hidden sm:block">
                <motion.div variants={itemVariants}
                className="flex flex-col items-center"
                >
                  <h3 className="text-2xl font-bold text-center mb-8">What Sets Me Apart</h3>
                  <div className="grid md:grid-cols-2 gap-6 w-3xl">
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight.title}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                        className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        <highlight.icon className="w-8 h-8 text-primary mb-4 mx-auto" />
                        <h4 className="font-semibold mb-2 text-center">{highlight.title}</h4>
                        <p className="text-sm text-muted-foreground text-center">{highlight.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
