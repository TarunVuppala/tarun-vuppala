import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContentContainer from "@/components/layout/container"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: "https://github.com/tarunvuppala", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/tarunvuppala", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/tarunvuppala", label: "Twitter" },
    { icon: Mail, href: "mailto:tarun.vuppala26@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <footer className="relative border-t border-stone-950/10 bg-transparent dark:border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <ContentContainer className="py-8 sm:py-10">
        <div className="grid gap-8 border-b border-stone-950/10 pb-6 dark:border-white/10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-stone-50">
                AI/ML and backend software engineer.
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-10 rounded-full bg-sky-300 px-5 text-sm font-medium text-slate-950 hover:bg-sky-200"
              >
                <a href="mailto:tarun.vuppala26@gmail.com">
                  Email me
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>

              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-950/10 bg-white/75 text-stone-700 transition-colors hover:border-stone-950/20 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-stone-100"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="meta-label">Links</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
                {quickLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="transition-colors hover:text-stone-950 dark:hover:text-stone-100">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-3 text-sm text-stone-600 sm:flex-row sm:items-center dark:text-stone-400">
          <p>© {currentYear} Tarun Vuppala</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="transition-colors hover:text-stone-950 dark:hover:text-stone-100">
                    {link.name}
                </Link>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0 text-stone-700 hover:bg-white/70 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-stone-100"
              aria-label="Back to top"
              asChild
            >
              <Link href="#">
                <ArrowUp className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}
