import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContentContainer from "@/components/layout/container"
import { siteConfig } from "@/lib/seo"
import { footerLinks, socialLinks } from "@/lib/site"

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-stone-950/10 bg-transparent dark:border-white/10">
      <ContentContainer className="py-8 sm:py-10">
        <div className="grid gap-8 border-b border-stone-950/10 pb-6 dark:border-white/10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-4">
            <h2 className="max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-stone-950 dark:text-stone-50">
              Building things I want to understand.
              <span className="block italic text-stone-500 dark:text-stone-400">Write when you&apos;re ready.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-11 min-h-11 rounded-full bg-sky-300 px-5 text-sm font-medium text-slate-950 hover:bg-sky-200"
              >
                <a href={`mailto:${siteConfig.email}`}>
                  Email me
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              {socialLinks.map((social) => {
                const Icon = socialIcons[social.key]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-stone-950/10 bg-white/80 text-stone-700 transition-colors hover:border-stone-950/20 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-stone-100"
                    aria-label={social.label}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <p className="meta-label">Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
              {footerLinks.map((link) => (
                <Link key={link.name} href={link.href} className="cursor-pointer transition-colors hover:text-stone-950 dark:hover:text-stone-100">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-3 text-sm text-stone-600 sm:flex-row sm:items-center dark:text-stone-400">
          <p>© {currentYear} {siteConfig.name}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11 rounded-full p-0 text-stone-700 hover:bg-white/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-stone-100"
            aria-label="Back to top"
            asChild
          >
            <Link href="#main-content">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </ContentContainer>
    </footer>
  )
}
