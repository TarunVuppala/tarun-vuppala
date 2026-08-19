"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ContentContainer from "@/components/layout/container"
import { MotionStrip } from "@/components/ui/motion-strip"
import TechIcon from "@/components/ui/tech-icon"
import { skillsByDomain } from "@/lib/data"
import { easeOutExpo, whenMotion } from "@/lib/motion"

const skillByName = new Map(skillsByDomain.flatMap((domain) => domain.skills).map((skill) => [skill.name, skill]))

type SkillCluster = {
  title: string
  skills?: string[]
  concepts?: string[]
}

const WORKFLOW_AREAS = [
  {
    title: "AI",
    description: "AI and machine learning tools and concepts I have used while learning and building AI systems.",
    icon: skillsByDomain.find((domain) => domain.title === "AI")!.icon,
    clusters: [
      {
        title: "Languages & frameworks",
        skills: ["Python", "PyTorch", "TensorFlow", "NumPy", "Pandas"],
      },
      {
        title: "Retrieval",
        skills: ["RAG", "Embeddings", "Vector Search"],
      },
      {
        title: "AI engineering",
        concepts: [
          "memory usage",
          "latency",
          "resource optimization",
          "Fine-tuning",
          "Tokenization",
          "Context Windows",
          "Semantic Search",
        ],
      },
      {
        title: "Machine learning",
        concepts: [
          "ML Algorithms",
          "Data Preprocessing",
          "Model Training",
          "Neural Networks",
          "CNNs",
        ],
      },
    ],
  },
  {
    title: "Backend",
    description: "Services, APIs, and systems I have worked with across projects.",
    icon: skillsByDomain.find((domain) => domain.title === "Backend")!.icon,
    clusters: [
      {
        title: "Services",
        skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL", "gRPC"],
      },
      {
        title: "Languages",
        skills: ["Java", "Go", "Python", "TypeScript", "JavaScript"],
      },
      {
        title: "Real-time",
        skills: ["WebSockets"],
      },
      {
        title: "Architecture",
        concepts: ["API design", "system design", "microservices", "message queues", "scalability"],
      },
    ],
  },
  {
    title: "Databases",
    description: "Databases and data-layer concepts I have worked with.",
    icon: skillsByDomain.find((domain) => domain.title === "Databases")!.icon,
    clusters: [
      {
        title: "Databases",
        skills: ["MongoDB", "PostgreSQL", "MySQL"],
      },
      {
        title: "Caching",
        skills: ["Redis"],
      },
      {
        title: "Data concepts",
        concepts: ["data modeling", "query design", "indexing", "caching", "transactions"],
      },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces and application code I have worked with across web and mobile projects.",
    icon: skillsByDomain.find((domain) => domain.title === "Frontend")!.icon,
    clusters: [
      {
        title: "Applications",
        skills: ["React", "Next.js", "React Native"],
      },
      {
        title: "UI & motion",
        skills: ["Tailwind CSS", "GSAP"],
      },
      {
        title: "Interface concerns",
        concepts: ["component design", "responsive UI", "client state", "accessibility", "performance"],
      },
    ],
  },
  {
    title: "Tools",
    description: "The tools I use to build, collaborate, deploy, and debug projects.",
    icon: skillsByDomain.find((domain) => domain.title === "Tools")!.icon,
    clusters: [
      {
        title: "Development",
        skills: ["Git", "GitHub", "Postman"],
      },
      {
        title: "Deployment",
        skills: ["Docker", "AWS", "Linux", "CI/CD"],
      },
      {
        title: "Engineering",
        concepts: ["version control", "debugging", "documentation", "testing", "deployment"],
      },
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
        <div className="mb-10 grid min-w-0 gap-5 xl:grid-cols-[0.68fr_1.32fr] xl:items-end">
          <div className="min-w-0">
            <p className="section-kicker">Tools and technologies</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] text-foreground sm:text-5xl">
              What I&apos;ve been working with
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-700 dark:text-stone-300">
              Tools and technologies I&apos;ve used across internships and personal projects.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500 dark:text-stone-400">
              Currently exploring: system design, distributed systems, performance, and production engineering.
            </p>
          </div>

          <div className="hidden min-w-0 space-y-3 sm:block">
            <div className="flex items-center justify-between px-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stone-500">
              <span>
                stack
                <span className="caret-blink" aria-hidden="true" />
              </span>
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
                  {area.clusters.map((cluster: SkillCluster) => (
                    <div key={cluster.title} className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[150px_1fr] sm:items-start">
                      <span className="pt-0.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                        {cluster.title}
                      </span>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {cluster.skills?.map((skillName) => {
                          const skill = skillByName.get(skillName)
                          if (!skill) return null
                          return (
                            <span key={skill.name} className="inline-flex items-center gap-2 text-[0.9rem] text-foreground/85">
                              <SkillIcon logo={skill.logo} name={skill.name} />
                              {skill.name}
                            </span>
                          )
                        })}
                        {cluster.concepts?.map((concept) => (
                          <span
                            key={concept}
                            className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {concept}
                          </span>
                        ))}
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
