export default function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base background color from theme */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Soft dynamic atmospheric gradients */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 16% 18%, rgba(56, 189, 248, 0.06), transparent 28%),
            radial-gradient(circle at 84% 12%, rgba(168, 85, 247, 0.04), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.02), transparent 50%)
          `,
        }}
      />
      
      {/* Thematic blobs */}
      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px] dark:bg-sky-500/5" />
      <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-purple-500/8 blur-[150px] dark:bg-purple-400/5" />
      
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  )
}
