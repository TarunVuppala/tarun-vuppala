import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ContentContainer from "@/components/layout/container"
import ViewfinderFrame from "@/components/viewfinder-frame"
import { resumeFilePath } from "@/lib/seo"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-start overflow-hidden pb-16 pt-[calc(var(--nav-height,72px)+3rem)] sm:pb-20 lg:items-center lg:pt-[calc(var(--nav-height,72px)+1.75rem)]"
    >

      <ContentContainer>
        <div className="hero-layout grid grid-cols-1 items-start gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.55fr)] sm:gap-2 md:grid-cols-[minmax(0,1.15fr)_minmax(12rem,0.85fr)] md:gap-4 lg:items-center lg:gap-x-10 lg:gap-y-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] xl:gap-x-14 xl:gap-y-6">
          <div className="hero-heading min-w-0 text-center sm:text-left">
            <div className="hero-kicker flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-stone-600 dark:text-stone-400 sm:justify-start">
              <span>I am Tarun Vuppala</span>
            </div>

            <h1 className="hero-title mx-auto mt-6 max-w-[14ch] overflow-visible text-[clamp(3.5rem,14vw,5.5rem)] font-bold leading-none tracking-[-0.07em] text-foreground sm:mx-0 sm:max-w-full sm:text-[clamp(3.75rem,8.8vw,5.75rem)] md:text-[clamp(4.25rem,8.5vw,6.5rem)] lg:max-w-[14ch] lg:text-[clamp(4.5rem,7vw,6.8rem)]">
              <span className="hero-line block">Building</span>
              <span className="hero-line hero-line-delay-1 block italic text-stone-500 dark:text-stone-400">things.</span>
              <span className="hero-line hero-line-delay-2 block">Figuring out how they work.</span>
            </h1>
          </div>

          <figure className="hero-portrait mx-auto mt-6 w-full max-w-56 sm:order-none sm:mx-0 sm:mt-4 sm:max-w-64 sm:justify-self-end md:row-span-1 md:mt-6 md:mr-2 md:max-w-72 lg:row-span-2 lg:mt-8 lg:max-w-96 lg:mr-4 xl:mt-6 xl:mr-6 xl:max-w-md 2xl:max-w-[30rem]">
            <ViewfinderFrame>
              <div className="relative aspect-4/5 overflow-hidden bg-stone-200 dark:bg-stone-900">
                <Image
                  src="/tarun_white.png"
                  alt="Tarun Vuppala portrait"
                  fill
                  className="object-cover object-[46%_14%] dark:hidden"
                  sizes="(min-width: 1536px) 480px, (min-width: 1280px) 448px, (min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 224px"
                  priority
                  draggable={false}
                />
                <Image
                  src="/tarun_black.png"
                  alt="Tarun Vuppala portrait"
                  fill
                  className="hidden object-cover object-[46%_14%] dark:block"
                  sizes="(min-width: 1536px) 480px, (min-width: 1280px) 448px, (min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 224px"
                  priority
                  draggable={false}
                />
              </div>
            </ViewfinderFrame>
            <figcaption className="mt-3 flex items-center justify-center gap-3 sm:justify-between">
              <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-widest text-stone-600 dark:text-stone-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" aria-hidden="true" />
                Available for work
              </span>
            </figcaption>
          </figure>

          <div className="hero-details min-w-0 text-center sm:col-span-2 sm:text-left md:col-span-2 lg:col-span-1">
            <div className="hero-actions mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-nowrap sm:items-center">
              <Button
                size="lg"
                asChild
                className="ink-button col-span-2 h-11 min-h-11 rounded-full bg-sky-300 px-5 text-sm font-medium text-slate-950 hover:bg-sky-200 sm:col-auto sm:w-fit"
              >
                <a href="#projects">
                  See what I&apos;ve built
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-11 min-h-11 rounded-full border-border bg-background/80 px-5 text-sm font-medium text-foreground hover:bg-background dark:bg-white/3 dark:hover:bg-white/6 sm:w-fit"
              >
                <a href="#contact">
                  Get in touch
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-11 min-h-11 px-3 text-sm font-medium text-stone-700 hover:bg-transparent hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-50 sm:w-fit"
              >
                <a href={resumeFilePath} download="Tarun-Vuppala-Resume.pdf">
                  Download resume
                  <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}
