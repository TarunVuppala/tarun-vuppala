import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ContentContainer from "@/components/layout/container"
import LocalClock from "@/components/local-clock"
import ViewfinderFrame from "@/components/viewfinder-frame"
import { resumeFilePath } from "@/lib/seo"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-[calc(var(--nav-height,72px)+1.75rem)] sm:pb-20"
    >

      <ContentContainer>
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] xl:gap-14">
          <div className="min-w-0">
            <div className="hero-kicker flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-stone-600 dark:text-stone-400">
              <span>I am Tarun Vuppala</span>
            </div>

            <h1 className="mt-6 max-w-[14ch] text-[clamp(3.2rem,8.4vw,7.1rem)] font-bold leading-[0.86] tracking-[-0.07em] text-foreground">
              <span className="hero-line block">Systems</span>
              <span className="hero-line hero-line-delay-1 block italic text-stone-500 dark:text-stone-400">that hold</span>
              <span className="hero-line hero-line-delay-2 block">under load.</span>
            </h1>

            <p className="hero-copy mt-6 max-w-md text-[0.98rem] leading-7 text-stone-700 dark:text-stone-300">
              Backend and on-device AI. Recently: RAG in Atlas, and a Premiere Pro plugin that cut podcast edits from three hours to under eight minutes.
            </p>

            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                size="lg"
                asChild
                className="ink-button h-11 min-h-11 rounded-full bg-sky-300 px-5 text-sm font-medium text-slate-950 hover:bg-sky-200"
              >
                <a href="#projects">
                  See selected work
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-11 min-h-11 rounded-full border-border bg-background/80 px-5 text-sm font-medium text-foreground hover:bg-background dark:bg-white/3 dark:hover:bg-white/6"
              >
                <a href="#contact">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-11 min-h-11 px-3 text-sm font-medium text-stone-700 hover:bg-transparent hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-50"
              >
                <a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
                  Download resume
                  <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <figure className="hero-portrait mx-auto w-full max-w-96 xl:mr-6 xl:max-w-none">
            <ViewfinderFrame>
              <div className="relative aspect-4/5 overflow-hidden bg-stone-200 dark:bg-stone-900">
                <Image
                  src="/tarun_white.png"
                  alt="Tarun Vuppala portrait"
                  fill
                  className="object-cover object-[46%_14%] dark:hidden"
                  sizes="(min-width: 1280px) 420px, 360px"
                  priority
                  draggable={false}
                />
                <Image
                  src="/tarun_black.png"
                  alt="Tarun Vuppala portrait"
                  fill
                  className="hidden object-cover object-[46%_14%] dark:block"
                  sizes="(min-width: 1280px) 420px, 360px"
                  priority
                  draggable={false}
                />
              </div>
            </ViewfinderFrame>
            <figcaption className="mt-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-stone-600 dark:text-stone-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
                Available for work
              </span>
            </figcaption>
          </figure>
        </div>
      </ContentContainer>
    </section>
  )
}
