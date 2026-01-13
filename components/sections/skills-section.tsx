"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { skillsByDomain as categories } from "@/lib/data"
import { smoothFade, slowFade } from "@/lib/motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothFade,
    },
  },
} satisfies Variants

const waveVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.15,
    transition: {
      ...slowFade,
      duration: 1.8,
    },
  },
} satisfies Variants

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.25 })

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden bg-linear-to-b from-background via-background/95 to-background py-24">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full opacity-40"
        variants={waveVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.path
          fill="url(#wave-gradient)"
          fillOpacity="1"
          d="M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,224C840,235,960,181,1080,170.7C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </motion.svg>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <motion.div variants={sectionVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center">
          <p className="text-xs uppercase tracking-widest text-primary">How I build fast and beautifully</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">A toolkit tuned for polished delivery</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Frontend craft, backend calm, and the tooling that keeps projects moving.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              variants={sectionVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ ...smoothFade, delay: index * 0.12 }}
              className={`flex flex-col gap-8 rounded-[3rem] border border-white/8 bg-white/[0.03] p-6 shadow-2xl backdrop-blur lg:flex-row ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Layer</p>
                <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">{category.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  {category.description ?? "Balanced for DX, reliability, and thoughtful hand-off between design and engineering."}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground/90">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <img
                          src={skill.logo || "/placeholder.svg"}
                          alt={skill.name}
                          className="h-6 w-6 object-contain"
                          onError={(event) => {
                            event.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">{skill.name}</p>
                        {/* <p className="text-2xs uppercase tracking-wide text-muted-foreground">core</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex-1 rounded-[2.5rem] border border-white/10 bg-linear-to-br from-primary/10 to-primary/5 p-6 shadow-lg">
                <p className="text-xs uppercase tracking-widest text-primary">Highlights</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  These are the tools that power the majority of my recent shipments, chosen for their performance and developer ergonomics.
                </p>
                <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                  <p>• {category.skills.slice(0, 2).map((s) => s.name).join(" + ")} integration on live projects.</p>
                  <p>• {category.skills.length} go-to technologies for this layer.</p>
                  <p>• Tuned for <span className="font-semibold text-primary">fast iteration</span> and <span className="font-semibold text-primary">smooth DX</span>.</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
