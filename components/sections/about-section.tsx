"use client"

import { motion } from "framer-motion"
import { codingStats, journeyExpanded } from "@/lib/data"
import ContentContainer from "@/components/layout/container"

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

export default function AboutSection() {
  const featuredStats = codingStats.slice(0, 2)

  return (
    <section id="about" className="relative overflow-hidden py-12 sm:py-14" style={sectionScrollOffset}>
      <ContentContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -18, y: 8 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
        >
          <div className="max-w-2xl">
            <p className="section-kicker">A bit about how I work</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl md:text-6xl dark:text-stone-50">
              I want the work to feel personal,
              <span className="block text-stone-700 dark:text-stone-300">not packaged.</span>
            </h2>
            <p className="section-copy mt-4 max-w-xl">
              I&apos;m a computer science student, but most of what shapes my work comes from building things people
              actually use.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:pt-1">
            <div>
              <p className="meta-label">Working with me</p>
              <div className="mt-3 space-y-2 text-sm text-stone-800 dark:text-stone-200">
                <p>Fast iterations.</p>
                <p>Clear tradeoffs.</p>
                <p>Clean finish.</p>
              </div>
            </div>
            <div>
              <p className="meta-label">In practice</p>
              <div className="mt-3 space-y-3">
                {featuredStats.map((stat) => (
                  <div key={stat.text} className="flex items-start gap-3 text-sm leading-6 text-stone-700/78 dark:text-stone-300/74">
                    <stat.icon className="mt-0.5 h-4 w-4 text-sky-600 dark:text-sky-300" />
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-5 border-t border-stone-950/10 pt-5 dark:border-white/10">
          {journeyExpanded.map((item, index) => (
            <motion.article
              key={`${item.year}-${item.company}`}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4 md:grid-cols-[120px_1fr]"
            >
              <div className="meta-label pt-1">{item.year}</div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">{item.title}</h3>
                  <span className="meta-label">{item.company}</span>
                </div>

                <p className="detail-copy max-w-2xl text-stone-700/78 dark:text-stone-300/72">{item.description}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-800 dark:text-stone-200">
                  {item.achievements.slice(0, 3).map((achievement) => (
                    <span key={achievement} className="inline-flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300/70" />
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
