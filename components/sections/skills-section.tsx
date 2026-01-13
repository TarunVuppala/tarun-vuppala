"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { skillsByDomain as categories } from "@/lib/data"
import ContentContainer from "@/components/layout/content-container"

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} satisfies Variants

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: index * 0.12 },
  }),
} satisfies Variants

const skillVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: index * 0.04 },
  }),
} satisfies Variants

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16"
    >
      <ContentContainer className="flex flex-col gap-8">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary">Skills</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Full-stack focus with product polish
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            A curated toolkit that balances velocity, reliability, and thoughtful UI.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group flex h-full flex-col gap-4 rounded-[2.5rem] border border-border bg-background p-5 shadow-sm"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Layer</p>
                <h3 className="mt-1 text-2xl font-semibold text-foreground">{category.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {category.description ?? "Balanced for DX, reliability, and crisp hand-off between design and engineering."}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    custom={skillIndex}
                    variants={skillVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground/90"
                  >
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
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto rounded-4xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                <p className="text-xs uppercase tracking-widest text-primary">Highlights</p>
                <p className="mt-2">
                  {category.skills.slice(0, 2).map((s) => s.name).join(" + ")} focus with shipping speed in mind.
                </p>
                <p className="mt-2">
                  {category.skills.length} go-to technologies for this layer.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </ContentContainer>
    </section>
  )
}
