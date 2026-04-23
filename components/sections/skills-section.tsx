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
          className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr] xl:items-end"
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
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    draggable={false}
                    className={`h-4 w-4 object-contain opacity-80 ${getTechIconImageClass(skill.logo)}`}
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

            <MotionStrip duration={110} reverse={!isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`reverse-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-stone-700/78 dark:text-stone-200/70"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    draggable={false}
                    className={`h-4 w-4 object-contain opacity-65 ${getTechIconImageClass(skill.logo)}`}
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
          <div className="grid gap-0 py-6 lg:grid-cols-2">
            {primaryDomains.map((domain, index) => {
              const Icon = domain.icon
              const clusters = PRIMARY_SKILL_CLUSTERS[domain.title] ?? []

              return (
                <motion.article
                  key={domain.title}
                  initial={{ opacity: 0, y: 16, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden px-0 py-2 ${index === 0 ? "lg:pr-8" : "border-t border-stone-950/10 pt-8 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-2"}`}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-32 opacity-[0.16] blur-3xl dark:opacity-[0.18]"
                    style={{
                      background:
                        index === 0
                          ? "radial-gradient(circle at left top, rgba(34,197,94,0.34), transparent 65%)"
                          : "radial-gradient(circle at right top, rgba(245,158,11,0.28), transparent 65%)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="text-stone-500 dark:text-stone-400">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-[2.35rem] font-semibold leading-[0.92] tracking-[-0.045em] text-stone-950 dark:text-stone-50 sm:text-[2.7rem]">
                        {domain.title}
                      </h3>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {clusters.map((cluster, clusterIndex) => (
                        <div
                          key={`${domain.title}-${cluster.title}`}
                          className={`rounded-[1.55rem] border border-stone-950/10 bg-white/[0.04] px-4 py-4 dark:border-white/10 dark:bg-white/[0.02] ${
                            clusterIndex === 0 ? "sm:col-span-2" : ""
                          }`}
                        >
                          <p className="text-[1.15rem] font-semibold tracking-[-0.04em] text-stone-900 dark:text-stone-100">
                            {cluster.title}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[0.95rem] text-stone-700 dark:text-stone-300">
                            {cluster.skills.map((skillName) => {
                              const skill = domain.skills.find((item) => item.name === skillName)
                              if (!skill) return null

                              return (
                                <span
                                  key={`${domain.title}-${cluster.title}-${skill.name}`}
                                  className="inline-flex items-center gap-2 text-stone-800/88 dark:text-stone-200/82"
                                >
                                  <img
                                    src={skill.logo}
                                    alt={skill.name}
                                    draggable={false}
                                    className={`h-4 w-4 shrink-0 object-contain opacity-80 ${getTechIconImageClass(skill.logo)}`}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(event) => {
                                      event.currentTarget.style.display = "none"
                                    }}
                                  />
                                  <span>{skill.name}</span>
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="border-t border-stone-950/10 py-6 dark:border-white/10">
            <div className="space-y-4">
              {secondaryDomains.map((domain, index) => {
                const Icon = domain.icon

                return (
                  <motion.div
                    key={domain.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 14 : -14, y: 6 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-3 border-t border-stone-950/10 pt-4 first:border-t-0 first:pt-0 dark:border-white/10 lg:grid-cols-[220px_1fr]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-stone-500 dark:text-stone-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h4 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                        {domain.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-stone-700 dark:text-stone-300">
                      {domain.skills.map((skill) => (
                        <span key={`${domain.title}-${skill.name}`} className="inline-flex items-center gap-2">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            draggable={false}
                            className={`h-4 w-4 object-contain opacity-80 ${getTechIconImageClass(skill.logo)}`}
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
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}
