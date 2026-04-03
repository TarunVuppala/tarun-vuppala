"use client"

import { motion } from "framer-motion"
import ContentContainer from "@/components/layout/container"
import { MotionStrip } from "@/components/ui/motion-strip"
import { skillsByDomain } from "@/lib/data"

const workingModes = ["Fast prototypes", "Production cleanup", "Frontend polish", "Backend support"]

const movingSkills = Array.from(
  new Map(
    skillsByDomain
      .flatMap((domain) => domain.skills)
      .map((skill) => [skill.name, skill]),
  ).values(),
)

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden py-12 sm:py-14">
      <ContentContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr] xl:items-end"
        >
          <div className="max-w-xl">
            <p className="section-kicker">Skills and tools</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-50 sm:text-5xl">
              I like tools that stay out of the way.
            </h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300/72">
              {workingModes.map((mode) => (
                <span key={mode} className="inline-flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
                  {mode}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 overflow-hidden border-y border-white/10 py-4">
            <MotionStrip duration={42} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`forward-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-200/86"
                >
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className="h-4 w-4 object-contain opacity-80"
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

            <MotionStrip duration={42} reverse className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`reverse-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-200/70"
                >
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className="h-4 w-4 object-contain opacity-65"
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

        <div className="border-y border-white/10">
          {skillsByDomain.map((domain, index) => {
            const Icon = domain.icon

            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 border-t border-white/10 py-6 first:border-t-0 lg:grid-cols-[210px_1fr]"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-300/10 text-sky-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-stone-50">{domain.title}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-200">
                  {domain.skills.map((skill) => (
                    <span key={`${domain.title}-${skill.name}`} className="inline-flex items-center gap-2">
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className="h-4 w-4 object-contain opacity-85"
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
