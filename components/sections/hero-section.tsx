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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="section-kicker">Hi, I&apos;m Tarun.</p>

            <h1 className="mt-4 text-[clamp(3.75rem,8vw,5.3rem)] font-black leading-[0.92] tracking-[-0.055em] text-stone-50">
              <span className="block">I build web experiences</span>
              <span className="block text-stone-300">that feel sharp, calm,</span>
              <span className="block">and genuinely yours.</span>
            </h1>

            <p className="section-copy mt-5 max-w-xl">
              Fast systems, restrained motion, and interfaces that still feel like a person made them.
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
                className="h-10 rounded-full border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-stone-100 hover:bg-white/[0.06]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-10 px-1 text-sm font-medium text-stone-300 hover:bg-transparent hover:text-stone-100"
              >
                <a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
                  Download resume
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[330px] lg:max-w-[360px] xl:mr-0 xl:max-w-[390px]"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#12100f] p-2 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.85)]">
              <Image
                src="/image.webp"
                alt="Tarun Vuppala portrait"
                width={1024}
                height={1024}
                className="aspect-[4/4.9] w-full rounded-[1.45rem] object-cover object-center"
                priority
                draggable={false}
              />
            </div>
          </motion.figure>
        </div>
      </ContentContainer>
    </section>
  )
}
