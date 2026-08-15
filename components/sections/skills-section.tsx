"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ContentContainer from "@/components/layout/container"
import { MotionStrip } from "@/components/ui/motion-strip"
import TechIcon from "@/components/ui/tech-icon"
import { skillsByDomain } from "@/lib/data"
import { easeOutExpo, whenMotion } from "@/lib/motion"

const skillByName = new Map(skillsByDomain.flatMap((domain) => domain.skills).map((skill) => [skill.name, skill]))

const WORKFLOW_AREAS = [
  {
    title: "AI systems",
    description: "Model integration, retrieval, and inference for useful product features.",
    icon: skillsByDomain.find((domain) => domain.title === "AI Engineering")!.icon,
    clusters: [
      { title: "Model integration", skills: ["Python", "OpenAI", "Hugging Face", "Ollama"] },
      { title: "Grounding & inference", skills: ["RAG", "Vector Databases", "llama.cpp", "Flask", "FastAPI"] },
      { title: "Experimentation", skills: ["PyTorch", "TensorFlow", "scikit-learn"] },
    ],
  },
  {
    title: "Product backbone",
    description: "Services, data, and infrastructure for dependable production features.",
    icon: skillsByDomain.find((domain) => domain.title === "Backend, Data & APIs")!.icon,
    clusters: [
      { title: "Services & contracts", skills: ["Node.js", "Express.js", "Java", "Spring Boot", "Go", "REST APIs", "GraphQL"] },
      { title: "Data & performance", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
      { title: "Media processing", skills: ["FFmpeg"] },
      { title: "Security, real-time & deployment", skills: ["JWT", "OAuth2", "Authentication", "Socket.io", "Message Queues", "AWS", "Docker"] },
    ],
  },
  {
    title: "Product interface",
    description: "Clear, accessible experiences that make complex capabilities useful.",
    icon: skillsByDomain.find((domain) => domain.title === "Frontend Development")!.icon,
    clusters: [
      { title: "Application foundations", skills: ["React.js", "Next.js", "TypeScript", "JavaScript"] },
      { title: "Interface craft", skills: ["HTML5", "CSS3", "Tailwind CSS", "ShadCN UI"] },
      { title: "Interaction & motion", skills: ["Framer Motion", "GSAP", "Three.js"] },
    ],
  },
  {
    title: "Engineering workflow",
    description: "A disciplined practice for collaboration, iteration, and maintainable delivery.",
    icon: skillsByDomain.find((domain) => domain.title === "Developer Workflow")!.icon,
    clusters: [
      { title: "Build & collaborate", skills: ["Git", "GitHub", "VS Code", "Documentation"] },
      { title: "Product handoff", skills: ["Figma"] },
    ],
  },
]

const movingSkills = Array.from(skillByName.values())

const sectionScrollOffset = {
  scrollMarginTop: "calc(var(--nav-height, 72px) + 24px)",
}

function SkillIcon({ logo, name, className }: { logo: string; name: string; className?: string }) {
  return <TechIcon src={logo} name={name} className={className} />
}

export default function SkillsSection() {
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const reduceMotion = useReducedMotion()

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
    <section id="skills" className="relative py-12 sm:py-14" style={sectionScrollOffset}>
      <ContentContainer>
        <div className="mb-10 grid gap-5 xl:grid-cols-[0.68fr_1.32fr] xl:items-end">
          <div className="max-w-xl">
            <p className="section-kicker">How I build</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] text-foreground sm:text-5xl">
              From AI capability to a shipped product.
            </h2>
          </div>

          <div className="space-y-3 overflow-hidden border border-stone-950/10 bg-background/70 py-4 dark:border-white/10 dark:bg-card/50">
            <div className="flex items-center justify-between px-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stone-500">
              <span>
                stack
                <span className="caret-blink" aria-hidden="true" />
              </span>
              <span>{movingSkills.length} tools</span>
            </div>
            <MotionStrip duration={110} reverse={isScrollingUp} className="gap-10">
              {movingSkills.map((skill) => (
                <span
                  key={`forward-${skill.name}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-foreground/86"
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
                  className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-foreground/70"
                >
                  <SkillIcon logo={skill.logo} name={skill.name} className="h-4 w-4 opacity-65" />
                  {skill.name}
                </span>
              ))}
            </MotionStrip>
          </div>
        </div>

        {/* Skills grouped by how they support delivery, not by vendor taxonomy. */}
        <div>
          {WORKFLOW_AREAS.map((area, index) => {
            const Icon = area.icon

            return (
              <motion.div
                key={area.title}
                initial={whenMotion(reduceMotion, { opacity: 0, x: 18 }, false)}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={whenMotion(reduceMotion, { duration: 0.42, delay: index * 0.06, ease: easeOutExpo }, { duration: 0 })}
                className="grid gap-6 border-t border-border/60 py-6 last:border-b lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1.38fr)] lg:gap-8 xl:gap-10"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {area.clusters.map((cluster) => (
                    <div key={cluster.title} className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[150px_1fr] sm:items-start">
                      <span className="pt-0.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                        {cluster.title}
                      </span>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {cluster.skills.map((skillName) => {
                          const skill = skillByName.get(skillName)
                          if (!skill) return null
                          return (
                            <span
                              key={skill.name}
                              className="inline-flex items-center gap-2 text-[0.9rem] text-foreground/85"
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
              </motion.div>
            )
          })}
        </div>
      </ContentContainer>
    </section>
  )
}
