"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ContentContainer from "@/components/layout/container"
import { MotionStrip } from "@/components/ui/motion-strip"
import { skillsByDomain } from "@/lib/data"
import { getTechIconImageClass } from "@/lib/tech-icons"

const movingSkills = Array.from(
  new Map(
    skillsByDomain
      .flatMap((domain) => domain.skills)
      .map((skill) => [skill.name, skill]),
  ).values(),
)

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

export default function SkillsSection() {
  const [isScrollingUp, setIsScrollingUp] = useState(false)

  useEffect(() => {
    let previousY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY === previousY) return
      setIsScrollingUp(currentY < previousY)
      previousY = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="skills" className="relative overflow-hidden py-12 sm:py-14" style={sectionScrollOffset}>
      <ContentContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20, y: 6 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr] xl:items-end"
        >
          <div className="max-w-xl">
            <p className="section-kicker">Skills and tools</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl dark:text-stone-50">
              I like tools that stay out of the way.
            </h2>
          </div>

          <div className="space-y-3 overflow-hidden border-y border-stone-950/10 py-4 dark:border-white/10">
            <MotionStrip duration={42} reverse={isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`forward-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-800/86 dark:text-stone-200/86"
                >
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className={`h-4 w-4 object-contain opacity-80 ${getTechIconImageClass(skill.logo || "/placeholder.svg")}`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = "none"
                    }}
                  />
                  {skill.name}
                </span>
              ))}
            </MotionStrip>

            <MotionStrip duration={42} reverse={!isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`reverse-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-700/78 dark:text-stone-200/70"
                >
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className={`h-4 w-4 object-contain opacity-65 ${getTechIconImageClass(skill.logo || "/placeholder.svg")}`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = "none"
                    }}
                  />
                  {skill.name}
                </span>
              ))}
            </MotionStrip>
          </div>
        </motion.div>

        <div className="border-y border-stone-950/10 dark:border-white/10">
          {skillsByDomain.map((domain, index) => {
            const Icon = domain.icon

            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? 14 : -14, y: 6 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 border-t border-stone-950/10 py-6 first:border-t-0 dark:border-white/10 lg:grid-cols-[210px_1fr]"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-stone-500 dark:text-stone-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">{domain.title}</h3>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-800 dark:text-stone-200">
                  {domain.skills.map((skill) => (
                    <span key={`${domain.title}-${skill.name}`} className="inline-flex items-center gap-2">
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className={`h-4 w-4 object-contain opacity-85 ${getTechIconImageClass(skill.logo || "/placeholder.svg")}`}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.style.display = "none"
                        }}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </ContentContainer>
    </section>
  )
}
