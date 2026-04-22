import Image from "next/image"

import TechIconStack from "@/components/ui/tech-icon-stack"

const PROJECT_ACCENTS = [
  {
    lightGradient:
      "linear-gradient(135deg, rgba(240,249,255,0.98) 0%, rgba(224,242,254,0.96) 52%, rgba(186,230,253,0.94) 100%)",
    darkGradient:
      "linear-gradient(135deg, rgba(14,165,233,0.92) 0%, rgba(23,37,84,0.96) 52%, rgba(15,23,42,0.98) 100%)",
    chip: "bg-sky-600/10 text-sky-800 border-sky-600/20 dark:bg-sky-300/10 dark:text-sky-100 dark:border-sky-300/20",
  },
  {
    lightGradient:
      "linear-gradient(135deg, rgba(240,253,250,0.98) 0%, rgba(204,251,241,0.96) 48%, rgba(165,243,252,0.93) 100%)",
    darkGradient:
      "linear-gradient(135deg, rgba(13,148,136,0.92) 0%, rgba(17,24,39,0.96) 48%, rgba(8,145,178,0.9) 100%)",
    chip: "bg-cyan-600/10 text-cyan-900 border-cyan-600/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:border-cyan-300/20",
  },
  {
    lightGradient:
      "linear-gradient(135deg, rgba(239,246,255,0.98) 0%, rgba(219,234,254,0.96) 52%, rgba(191,219,254,0.94) 100%)",
    darkGradient:
      "linear-gradient(135deg, rgba(59,130,246,0.92) 0%, rgba(30,41,59,0.96) 52%, rgba(29,78,216,0.92) 100%)",
    chip: "bg-blue-600/10 text-blue-900 border-blue-600/20 dark:bg-blue-300/10 dark:text-blue-100 dark:border-blue-300/20",
  },
  {
    lightGradient:
      "linear-gradient(135deg, rgba(240,253,244,0.98) 0%, rgba(220,252,231,0.96) 50%, rgba(186,230,253,0.92) 100%)",
    darkGradient:
      "linear-gradient(135deg, rgba(22,163,74,0.9) 0%, rgba(17,24,39,0.96) 50%, rgba(3,105,161,0.9) 100%)",
    chip: "bg-emerald-600/10 text-emerald-900 border-emerald-600/20 dark:bg-emerald-300/10 dark:text-emerald-100 dark:border-emerald-300/20",
  },
]

type ProjectPreviewPanelProps = {
  project: Project
  index: number
  compact?: boolean
  bare?: boolean
}

export default function ProjectPreviewPanel({
  project,
  index,
  compact = false,
  bare = false,
}: ProjectPreviewPanelProps) {
  const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length]
  const projectNumber = `${index + 1}`.padStart(2, "0")
  const previewSkills = project.tech.slice(0, compact ? 2 : 4)
  const hasRealImage = !project.image.includes("placeholder")
  const visibleCategories = project.categories.filter((item) => item !== "Published").slice(0, 2)

  if (bare) {
    return (
      <div
        className="relative h-52 overflow-hidden rounded-[2rem] border border-stone-950/10 bg-white/72 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-black/30 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_-40px_rgba(15,23,42,0.55)] sm:h-56"
      >
        <div className="absolute inset-0 opacity-95 dark:hidden" style={{ background: accent.lightGradient }} />
        <div className="absolute inset-0 hidden opacity-95 dark:block" style={{ background: accent.darkGradient }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)]" />

        {hasRealImage && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-[0.12] mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
            sizes="70vw"
          />
        )}

        <div className="absolute right-4 top-3 text-[5rem] font-black leading-none text-stone-950/[0.08] dark:text-white/[0.08] sm:text-[6rem]">
          {projectNumber}
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
          <div className="max-w-[22rem]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-stone-700/72 dark:text-white/58">
              {project.date}
              {visibleCategories[0] ? ` / ${visibleCategories[0]}` : ""}
            </p>
            <h3 className="font-playfair text-[2rem] leading-[0.92] text-stone-950 dark:text-white sm:text-[2.3rem]">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-800/78 dark:text-white/68 sm:max-w-[18rem]">{project.subtitle}</p>
          </div>

          <TechIconStack tech={project.tech} limit={5} className="mt-4" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-stone-950/10 bg-white/72 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-black/30 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_-40px_rgba(15,23,42,0.55)] ${
        compact ? "h-48" : "h-60"
      }`}
    >
      <div className="absolute inset-0 opacity-95 dark:hidden" style={{ background: accent.lightGradient }} />
      <div className="absolute inset-0 hidden opacity-95 dark:block" style={{ background: accent.darkGradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)]" />

      {hasRealImage && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-[0.12] mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
          sizes={compact ? "50vw" : "70vw"}
        />
      )}

      <div
        className={`absolute right-4 top-3 font-black leading-none text-stone-950/[0.08] dark:text-white/[0.08] ${
          compact ? "text-[4rem] sm:text-[4.5rem]" : "text-[5rem] sm:text-[6rem]"
        }`}
      >
        {projectNumber}
      </div>

      <div className="absolute inset-x-4 bottom-4 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-700/72 dark:text-white/58">
          {project.date}
          {visibleCategories[0] ? ` / ${visibleCategories[0]}` : ""}
        </p>

        <div className="flex items-end justify-between gap-3">
          <div className={compact ? "min-w-0 max-w-[11.5rem]" : "min-w-0 max-w-[18rem] sm:max-w-[21rem]"}>
            <h3 className={`font-playfair text-stone-950 dark:text-white ${compact ? "text-2xl" : "text-3xl"}`}>{project.title}</h3>
            {!compact && <p className="mt-1 max-w-md text-sm leading-6 text-stone-800/78 dark:text-white/70">{project.subtitle}</p>}
          </div>

          <div
            className={`shrink-0 rounded-2xl border border-stone-950/10 bg-white/46 text-stone-700 dark:border-white/12 dark:bg-black/20 dark:text-white/70 ${
              compact
                ? "max-w-[8.75rem] px-3 py-2 text-right text-[10px] leading-4"
                : "hidden max-w-[10rem] px-4 py-3 text-right text-xs sm:block"
            }`}
          >
            <p className="text-stone-500 dark:text-white/40">Impact</p>
            <p className="mt-1 leading-relaxed">{project.impact}</p>
          </div>
        </div>

        <TechIconStack tech={previewSkills} limit={previewSkills.length} size={compact ? "sm" : "md"} />
      </div>
    </div>
  )
}
