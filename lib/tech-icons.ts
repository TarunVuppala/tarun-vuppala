export function getTechIconImageClass(src: string | undefined) {
  if (!src) return ""

  if (src.startsWith("/icons/")) {
    return "invert dark:invert-0"
  }

  if (src.includes("cdn.simpleicons.org")) {
    return "invert dark:invert-0"
  }

  if (src.includes("/nextjs/nextjs-original.svg")) {
    return "dark:invert"
  }

  return ""
}
