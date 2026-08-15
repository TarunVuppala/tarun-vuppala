import { socialProfiles } from "@/lib/seo"

export { socialProfiles }

export const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/#contact" },
] as const

export const socialLinks = [
  { key: "github" as const, href: socialProfiles.github, label: "GitHub" },
  { key: "linkedin" as const, href: socialProfiles.linkedin, label: "LinkedIn" },
  { key: "twitter" as const, href: socialProfiles.twitter, label: "X" },
  { key: "email" as const, href: socialProfiles.email, label: "Email" },
]

export const footerLinks = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/#contact" },
] as const
