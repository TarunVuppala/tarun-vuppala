"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Zap, Quote, Sparkles, } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { codingQuotes, codingStats, highlights, stats, journeyTimeline } from "@/lib/data"

const codingQuote = codingQuotes[Math.floor(Math.random() * codingQuotes.length)]
const codingStat = codingStats[Math.floor(Math.random() * codingStats.length)]

const containerVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
}

const itemVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4 } },
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 sm:py-32 relative overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      <div className="absolute inset-0 opacity-10">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/50 rounded-full blur-3xl animate-pulse"
        />

        <Sparkles className="absolute top-10 left-20 w-8 h-8 text-primary animate-twinkle" />
        <Sparkles className="absolute bottom-20 right-30 w-6 h-6 text-primary animate-twinkle delay-300" />
      </div>

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
                    className="relative p-6 bg-card/20 rounded-xl border border-primary/20 shadow-lg"
                  >
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/30" />
                    <motion.blockquote
                      className="text-lg md:text-xl font-light italic text-foreground pl-8 border-l-2 border-primary/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
                    >
                      {codingQuote}
                    </motion.blockquote>
                  </motion.div>

                  {/* Journey Timeline */}
                  <h3 className="text-xl font-semibold mb-6">My Journey</h3>
                  <motion.div
                    variants={containerVariants}
                    className="relative space-y-6 pl-6 border-l-2 border-primary/20"
                  >
                    {journeyTimeline.map((item, index) => (
                      <motion.div
                        key={item.year}
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={index}
                        whileHover={{ x: 10 }}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors relative"
                      >
                        <div className="absolute -left-7 w-4 h-4 bg-primary rounded-full ring-4 ring-background" />
                        <div className="w-20 font-bold text-primary">{item.year}</div>
                        <div className="flex-1 flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <span className="text-muted-foreground">{item.event}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="space-y-8">
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="text-center p-6 bg-gradient-to-br from-card/80 to-card/40 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                      >
                        <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-primary/20">
                    <Zap className="absolute top-4 left-4 w-6 h-6 text-primary animate-spin-slow" />
                    <h3 className="font-semibold mb-4 text-center">Currently Focused On</h3>
                    <div className="flex justify-center flex-wrap gap-2">
                      {["Next.js 15", "React Server Components", "TypeScript", "System Design"].map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                          whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}
                        >
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Animated Fun Fact */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-card/30 rounded-lg border border-border/50"
                  >
                    <codingStat.icon className="w-8 h-8 text-primary animate-bounce" />
                    <div>
                      <p className="font-medium">Fun Fact</p>
                      <p className="text-sm text-muted-foreground">{codingStat.text}</p>
                    </div>
                  </motion.div>
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
