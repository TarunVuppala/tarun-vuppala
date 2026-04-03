import Image from "next/image"

const PROJECT_ACCENTS = [
  {
    glow: "rgba(56, 189, 248, 0.28)",
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.92) 0%, rgba(23,37,84,0.96) 52%, rgba(15,23,42,0.98) 100%)",
    chip: "bg-sky-300/10 text-sky-100 border-sky-300/20",
  },
  {
    glow: "rgba(45, 212, 191, 0.24)",
    gradient: "linear-gradient(135deg, rgba(13,148,136,0.92) 0%, rgba(17,24,39,0.96) 48%, rgba(8,145,178,0.9) 100%)",
    chip: "bg-cyan-300/10 text-cyan-100 border-cyan-300/20",
  },
  {
    glow: "rgba(96, 165, 250, 0.24)",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.92) 0%, rgba(30,41,59,0.96) 52%, rgba(29,78,216,0.92) 100%)",
    chip: "bg-blue-300/10 text-blue-100 border-blue-300/20",
  },
  {
    glow: "rgba(34, 197, 94, 0.22)",
    gradient: "linear-gradient(135deg, rgba(22,163,74,0.9) 0%, rgba(17,24,39,0.96) 50%, rgba(3,105,161,0.9) 100%)",
    chip: "bg-emerald-300/10 text-emerald-100 border-emerald-300/20",
  },
]

type ProjectPreviewPanelProps = {
  project: Project
  index: number
  compact?: boolean
}

export default function ProjectPreviewPanel({
  project,
  index,
  compact = false,
}: ProjectPreviewPanelProps) {
  const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length]
  const projectNumber = `${index + 1}`.padStart(2, "0")
  const previewSkills = project.tech.slice(0, compact ? 2 : 4)
  const hasRealImage = !project.image.includes("placeholder")

  return (
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 ${
          compact ? "h-48" : "h-60"
        }`}
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px -40px ${accent.glow}` }}
      >
      <div className="absolute inset-0 opacity-95" style={{ background: accent.gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)]" />

      {hasRealImage && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-[0.18] mix-blend-screen"
          sizes={compact ? "50vw" : "70vw"}
        />
      )}

      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className={`rounded-full border px-3 py-1 text-[11px] font-medium ${accent.chip}`}>
          {project.categories[0] ?? "Project"}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
          {project.date}
        </span>
      </div>

      <div
        className={`absolute right-4 top-3 font-black leading-none text-white/[0.08] ${
          compact ? "text-[4.25rem] sm:text-[4.75rem]" : "text-[5rem] sm:text-[6rem]"
        }`}
      >
        {projectNumber}
      </div>

      <div className="absolute inset-x-4 bottom-4 space-y-2">
        <div className="flex items-end justify-between gap-3">
          <div className={compact ? "min-w-0 max-w-[11.5rem]" : "min-w-0 max-w-[18rem] sm:max-w-[21rem]"}>
            <h3 className={`font-playfair text-white ${compact ? "text-2xl" : "text-3xl"}`}>{project.title}</h3>
            {!compact && <p className="mt-1 max-w-md text-sm leading-6 text-white/70">{project.subtitle}</p>}
          </div>

          <div
            className={`shrink-0 rounded-2xl border bg-black/20 text-white/70 ${
              compact
                ? "max-w-[8.75rem] border-white/10 px-3 py-2 text-right text-[10px] leading-4"
                : "hidden max-w-[10rem] border-white/12 px-4 py-3 text-right text-xs sm:block"
            }`}
          >
            <p className="text-white/40">Impact</p>
            <p className="mt-1 leading-relaxed">{project.impact}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {previewSkills.map((tech) => (
            <span
              key={`${project.id}-${tech}`}
              className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
