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
      className="relative flex min-h-svh items-center overflow-hidden pb-14 pt-[calc(var(--nav-height,72px)+2rem)] sm:pb-16 sm:pt-[calc(var(--nav-height,72px)+2.5rem)]"
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
                className="h-10 rounded-full border-border bg-background/80 px-5 text-sm font-medium text-foreground hover:bg-background dark:bg-white/3 dark:hover:bg-white/6"
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
            className="mx-auto w-full max-w-82.5 lg:max-w-90 xl:mr-0 xl:max-w-97.5"
          >
            <div className="group relative">
              {/* Decorative background glow */}
              <div className="absolute -inset-4 rounded-full bg-linear-to-tr from-sky-500/10 to-purple-500/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:from-sky-400/5 dark:to-purple-400/5" />
              
              <div className="relative rounded-full border border-border/50 bg-background/50 p-3 shadow-2xl backdrop-blur-sm dark:bg-card/50">
                <div className="relative aspect-square w-full overflow-hidden rounded-full bg-linear-to-br from-stone-100 to-stone-200 ring-1 ring-border/50 dark:from-stone-800 dark:to-stone-900">
                  <Image
                    src="/tarun_white.png"
                    alt="Tarun Vuppala portrait"
                    fill
                    className="object-cover object-[46%_18%] scale-105 transition-transform duration-700 group-hover:scale-110 dark:hidden"
                    sizes="(min-width: 1280px) 390px, (min-width: 1024px) 360px, 330px"
                    priority
                    draggable={false}
                  />
                  <Image
                    src="/tarun_black.png"
                    alt="Tarun Vuppala portrait"
                    fill
                    className="hidden object-cover object-[46%_18%] scale-105 transition-transform duration-700 group-hover:scale-110 dark:block"
                    sizes="(min-width: 1280px) 390px, (min-width: 1024px) 360px, 330px"
                    priority
                    draggable={false}
                  />
                  {/* Inner overlay for better differentiation */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/5 dark:ring-white/10" />
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-4 right-4 rounded-full border border-border bg-background p-1.5 shadow-lg dark:bg-card">
                 <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </motion.figure>
        </div>
      </ContentContainer>
    </section>
  )
}
