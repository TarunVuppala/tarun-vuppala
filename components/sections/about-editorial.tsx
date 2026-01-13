"use client"

import type { ComponentType, SVGProps } from "react"
import { Quote } from "lucide-react"

type StatItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  text: string
}

type JourneyItem = {
  year: string
  title: string
  company: string
  description: string
  achievements: string[]
}

type AboutVariantProps = {
  featuredQuote: string
  featuredStat: StatItem
  journey: JourneyItem[]
}

const storyBody = [
  "Hey there! I'm Tarun Vuppala, a Computer Science student who turned late-night coding curiosity into a passion for building scalable web solutions.",
  "From internships solving real-world challenges to dreaming of my own startup, I thrive on clean design and innovative problem-solving.",
]

function QuoteBlock({ featuredQuote }: { featuredQuote: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-border/60" />
      <Quote className="absolute right-5 top-5 h-9 w-9 text-primary/15" />
      <blockquote className="text-base md:text-lg font-light italic text-foreground/90 pr-10 leading-relaxed">
        {featuredQuote}
      </blockquote>
    </div>
  )
}

function FunFact({ featuredStat }: { featuredStat: StatItem }) {
  const Icon = featuredStat.icon
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <Icon className="h-8 w-8 text-primary" />
      <div>
        <p className="font-medium">Fun Fact</p>
        <p className="text-sm text-muted-foreground">{featuredStat.text}</p>
      </div>
    </div>
  )
}

export function AboutEditorialVariant({ featuredQuote, featuredStat, journey }: AboutVariantProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8">
        <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-primary">Profile</p>
          <h3 className="mt-3 text-3xl font-semibold">I build products that feel crafted, not rushed.</h3>
          <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
            <p>{storyBody[0]}</p>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-3">
            <featuredStat.icon className="h-7 w-7 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Fun Fact</p>
              <p className="text-sm text-foreground">{featuredStat.text}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <QuoteBlock featuredQuote={featuredQuote} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
        <div className="mt-4 space-y-4">
          {journey.map((item) => (
            <div key={`${item.year}-${item.company}`} className="flex flex-col gap-2 border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-xl font-semibold tracking-tight text-foreground">{item.title}</h4>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.company}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{item.year}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
