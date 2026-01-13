"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { skillsByDomain as categories } from "@/lib/data"
import ContentContainer from "@/components/layout/container"

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
			className="relative overflow-hidden bg-background py-10 sm:py-12"
		>
      <ContentContainer className="flex flex-col gap-6">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Arsenal & Tools</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base max-w-2xl mx-auto leading-relaxed">
            A curated toolkit that balances velocity, reliability, and thoughtful UI.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:mx-auto lg:[&>*:last-child]:max-w-2xl">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex h-full flex-col gap-5"
            >
              <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>

              <div className="flex flex-wrap -space-x-1">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    custom={skillIndex}
                    variants={skillVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="group relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 hover:z-10"
                  >
                    <img
                      src={skill.logo || "/placeholder.svg"}
                      alt={skill.name}
                      className="h-5 w-5 object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none"
                      }}
                    />
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </ContentContainer>
		</section>
	)
}
