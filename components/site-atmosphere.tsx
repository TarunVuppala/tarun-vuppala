export default function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 16% 18%, rgba(56, 189, 248, 0.14), transparent 24%),
            radial-gradient(circle at 84% 12%, rgba(120, 113, 108, 0.1), transparent 26%),
            linear-gradient(180deg, rgba(251, 249, 245, 0.98) 0%, rgba(241, 236, 229, 1) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 16% 18%, rgba(56, 189, 248, 0.12), transparent 24%),
            radial-gradient(circle at 84% 12%, rgba(120, 113, 108, 0.12), transparent 26%),
            linear-gradient(180deg, rgba(16, 13, 11, 0.98) 0%, rgba(10, 10, 9, 1) 100%)
          `,
        }}
      />
      <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px] dark:bg-sky-500/10" />
      <div className="absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full bg-stone-500/12 blur-[150px] dark:bg-stone-400/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(15,23,42,0.08)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_42%,rgba(8,8,7,0.52)_100%)]" />
    </div>
  )
}
