"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, MapPin, Clock } from "lucide-react"
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border bg-background/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <ContentContainer className="py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tarun Vuppala</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Full Stack Developer crafting digital experiences that solve real problems and scale beautifully. Always
              excited to work on meaningful projects that make a difference.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg border border-border/60 bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-border"
                  aria-label={social.label}
                >
                  <span className="flex h-full w-full items-center justify-center">
                    <social.icon size={18} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2.5 text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Get In Touch</h4>
            <div className="space-y-2.5 text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:tarun.vuppala26@gmail.com" className="transition-colors hover:text-foreground">
                  tarun.vuppala26@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Available for opportunities
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {currentYear} Tarun Vuppala. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> by Tarun
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="h-8 w-8 rounded-full p-0 hover:bg-muted"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}
