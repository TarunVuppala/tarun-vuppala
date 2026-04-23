"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ContentContainer from "@/components/layout/container"
import { resumeFilePath } from "@/lib/seo"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-[calc(var(--nav-height,72px)+2rem)] sm:pb-16 sm:pt-[calc(var(--nav-height,72px)+2.5rem)]"
    >
      <ContentContainer>
        <div className="grid gap-8 lg:gap-9 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
          <motion.div
            initial={{ opacity: 0, x: -22, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-foreground/45">Hi, I&apos;m Tarun.</p>
            <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-foreground/55">
              AI Engineer / Backend Engineer / ML Engineer
            </p>

            <h1 className="mt-4 text-[clamp(3.75rem,8vw,5.3rem)] font-black leading-[0.92] tracking-[-0.055em] text-foreground">
              <span className="block text-foreground">Systems, AI/ML,</span>
              <span className="block text-foreground/72">and software</span>
              <span className="block text-foreground">that ships.</span>
            </h1>

            <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-foreground/62 sm:text-base">
              AI/ML, backend, and product builds.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                size="lg"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="h-10 rounded-full bg-sky-300 px-5 text-sm font-medium text-slate-950 hover:bg-sky-200"
              >
                See selected work
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="h-10 rounded-full border-border bg-background/80 px-5 text-sm font-medium text-foreground hover:bg-background dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-10 px-1 text-sm font-medium text-foreground/70 hover:bg-transparent hover:text-foreground"
              >
                <a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
                  Download resume
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, x: 22, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[330px] lg:max-w-[360px] xl:mr-0 xl:max-w-[390px]"
          >
            <div className="overflow-hidden rounded-[2rem] border border-stone-950/10 bg-white/70 p-2 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#12100f] dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.85)]">
              <div className="relative aspect-[4/4.9] w-full overflow-hidden rounded-[1.45rem]">
                <Image
                  src="/image.webp"
                  alt="Tarun Vuppala portrait"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1280px) 390px, (min-width: 1024px) 360px, 330px"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </ContentContainer>
    </section>
  )
}
