"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { skillsByDomain as categories } from "@/lib/data"
import ContentContainer from "@/components/layout/container"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      gsap.from(cardsRef.current?.querySelectorAll("[data-skill-card]") ?? [], {
        opacity: 0,
        y: 16,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })

      gsap.from(cardsRef.current?.querySelectorAll("[data-skill-chip]") ?? [], {
        opacity: 0,
        y: 8,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-10 sm:py-12"
    >
      <ContentContainer className="flex flex-col gap-6">
        <div ref={headerRef} className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Arsenal & Tools</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated toolkit that balances velocity, reliability, and thoughtful UI.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-6 lg:grid-cols-2 lg:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:max-w-2xl"
        >
          {categories.map((category) => (
            <article
              key={category.title}
              data-skill-card
              className="flex h-full flex-col gap-5"
            >
              <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>

              <div className="flex flex-wrap">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    data-skill-chip
                    className={`group relative z-0 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background transition-[margin] duration-200 delay-75 ease-out hover:z-10 ${
                      skillIndex === 0 ? "" : "-ml-2.5"
                    } hover:ml-0 hover:mr-2.5`}
                  >
                    <img
                      src={skill.logo || "/placeholder.svg"}
                      alt={skill.name}
                      className="h-6 w-6 object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none"
                      }}
                    />
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </ContentContainer>
    </section>
  )
}
