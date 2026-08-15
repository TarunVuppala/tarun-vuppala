export default function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="pointer-spot absolute inset-0" />

      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px] dark:bg-sky-500/5" />
      <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-stone-500/8 blur-[150px] dark:bg-stone-400/5" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.18)_100%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.035] dark:opacity-[0.055]" />
    </div>
  )
}
