"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ContentContainer from "@/components/layout/container"
import { MotionStrip } from "@/components/ui/motion-strip"
import { skillsByDomain } from "@/lib/data"
import { getTechIconImageClass } from "@/lib/tech-icons"

const PRIMARY_DOMAIN_TITLES = ["AI Engineering", "Backend, Data & APIs"]

const primaryDomains = PRIMARY_DOMAIN_TITLES
  .map((title) => skillsByDomain.find((domain) => domain.title === title))
  .filter(Boolean) as (typeof skillsByDomain)[number][]
const secondaryDomains = skillsByDomain.filter((domain) => !PRIMARY_DOMAIN_TITLES.includes(domain.title))
const allDomains = [...primaryDomains, ...secondaryDomains]

const PRIMARY_SKILL_CLUSTERS: Record<
  string,
  {
    title: string
    skills: string[]
  }[]
> = {
  "Backend, Data & APIs": [
    {
      title: "API & Services",
      skills: ["Node.js", "Express.js", "Nest.js", "REST APIs", "Prisma"],
    },
    {
      title: "Data & Infra",
      skills: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker"],
    },
    {
      title: "Realtime & Security",
      skills: ["Socket.io", "JWT", "Authentication", "Observability"],
    },
  ],
  "AI Engineering": [
    {
      title: "Foundation Models",
      skills: ["Python", "OpenAI", "Hugging Face", "Ollama"],
    },
    {
      title: "ML Stack",
      skills: ["PyTorch", "TensorFlow", "scikit-learn", "LangChain"],
    },
    {
      title: "Retrieval & Media",
      skills: ["RAG", "MLflow"],
    },
  ],
}

const movingSkills = Array.from(
  new Map(
    primaryDomains
      .flatMap((domain) => {
        const clusterSkillNames = (PRIMARY_SKILL_CLUSTERS[domain.title] ?? []).flatMap((cluster) => cluster.skills)
        return clusterSkillNames
          .map((skillName) => domain.skills.find((skill) => skill.name === skillName))
          .filter(Boolean)
      })
      .map((skill) => [skill!.name, skill!]),
  ).values(),
)

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

function SkillIcon({ logo, name, className }: { logo: string; name: string; className?: string }) {
  return (
    <img
      src={logo}
      alt={name}
      draggable={false}
      className={`h-3.5 w-3.5 shrink-0 object-contain opacity-70 ${getTechIconImageClass(logo)} ${className ?? ""}`}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
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
      <ContentContainer>
        {/* Header + ticker */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 6 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 grid gap-5 xl:grid-cols-[0.78fr_1.22fr] xl:items-end"
        >
          <div className="max-w-xl">
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-stone-950 sm:text-5xl dark:text-stone-50">
              AI/ML, systems, and frontend.
            </h2>
          </div>

          <div className="space-y-3 overflow-hidden border-y border-stone-950/10 py-4 dark:border-white/10">
            <MotionStrip duration={110} reverse={isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`forward-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-800/86 dark:text-stone-200/86"
                >
                  <SkillIcon logo={skill.logo} name={skill.name} className="h-4 w-4 opacity-80" />
                  {skill.name}
                </span>
              ))}
            </MotionStrip>

            <MotionStrip duration={110} reverse={!isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`reverse-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-700/78 dark:text-stone-200/70"
                >
                  <SkillIcon logo={skill.logo} name={skill.name} className="h-4 w-4 opacity-65" />
                  {skill.name}
                </span>
              ))}
            </MotionStrip>
          </div>
        </motion.div>

        {/* Unified skill index */}
        <div>
          {allDomains.map((domain, index) => {
            const Icon = domain.icon
            const clusters = PRIMARY_SKILL_CLUSTERS[domain.title]

            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-stone-950/10 py-6 last:border-b dark:border-white/10"
              >
                {/* Domain label row */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-stone-400 dark:text-stone-500">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                    {domain.title}
                  </span>
                  <div className="h-px flex-1 bg-stone-950/8 dark:bg-white/8" />
                </div>

                {/* Clustered or flat skills */}
                {clusters ? (
                  <div className="space-y-3">
                    {clusters.map((cluster) => (
                      <div
                        key={cluster.title}
                        className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[155px_1fr] sm:items-start"
                      >
                        <span className="pt-0.5 text-[0.78rem] leading-relaxed text-stone-400 dark:text-stone-500">
                          {cluster.title}
                        </span>
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                          {cluster.skills.map((skillName) => {
                            const skill = domain.skills.find((s) => s.name === skillName)
                            if (!skill) return null
                            return (
                              <span
                                key={skill.name}
                                className="inline-flex items-center gap-2 text-[0.9rem] text-stone-800/90 dark:text-stone-200/85"
                              >
                                <SkillIcon logo={skill.logo} name={skill.name} />
                                {skill.name}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 text-[0.9rem] text-stone-800/90 dark:text-stone-200/85"
                      >
                        <SkillIcon logo={skill.logo} name={skill.name} />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </ContentContainer>
    </section>
  )
}
