"use client"

import { motion, useReducedMotion } from "framer-motion"
import { codingStats, journeyExpanded } from "@/lib/data"
import ContentContainer from "@/components/layout/container"
import { easeOutExpo, whenMotion } from "@/lib/motion"

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

export default function AboutSection() {
  const featuredStats = codingStats.slice(0, 2)
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20" style={sectionScrollOffset}>
      <p aria-hidden className="watermark-year absolute -right-6 top-8 text-[22vw] leading-none xl:right-10">
        25
      </p>

      <ContentContainer className="relative space-y-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker">A little about how I work</p>
            <h2 className="mt-4 text-4xl font-black tracking-tighter text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
              I like understanding the problem first.
              <span className="mt-1 block italic text-stone-500 dark:text-stone-400">Then I decide how to build it.</span>
            </h2>
          </div>

          <blockquote className="max-w-sm border-l-2 border-sky-300 pl-4 text-lg leading-8 text-stone-800 dark:text-stone-200">
            I understand things better after I build them.
          </blockquote>
        </div>

        <div className="grid gap-6 border-y border-stone-950/10 py-6 sm:grid-cols-2 dark:border-white/10">
          {featuredStats.map((stat) => (
            <p key={stat.text} className="text-sm leading-6 text-stone-700 dark:text-stone-300">
              {stat.text}
            </p>
          ))}
        </div>

        <div className="relative space-y-0">
          {journeyExpanded.map((item, index) => (
            <motion.article
              key={`${item.year}-${item.company}`}
              initial={whenMotion(reduceMotion, { opacity: 0, clipPath: "inset(0 28% 0 0)" }, false)}
              whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, amount: 0.18 }}
              transition={whenMotion(reduceMotion, { duration: 0.55, delay: index * 0.08, ease: easeOutExpo }, { duration: 0 })}
              className="grid gap-4 border-b border-stone-950/10 py-6 last:border-b-0 md:grid-cols-[11rem_1fr] dark:border-white/10"
            >
              <div className="font-mono text-xs tracking-[0.14em] text-stone-500 uppercase">{item.year}</div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">{item.title}</h3>
                  <span className="meta-label">{item.company}</span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-800 dark:text-stone-200">
                  {item.achievements.slice(0, 3).map((achievement) => (
                    <span key={achievement} className="inline-flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300/70" aria-hidden="true" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </ContentContainer>
    </section>
  )
}
