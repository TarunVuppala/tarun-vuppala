"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Twitter, Mail, Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import DevConsole from "@/components/DevConsole"
import { usePageTransition } from "@/components/page-transition"
import { ThemeToggleButton2 } from "@/components/ui/skiper-ui/skiper4"
import { useThemeToggle } from "@/components/ui/skiper-ui/skiper26"
import Image from "next/image"
import ContentContainer from "@/components/layout/container"
import { navItems, socialLinks } from "@/lib/site"
import { easeOutExpo, whenMotion } from "@/lib/motion"

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

function NavThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "rectangle",
    start: "top-down",
    blur: false,
  })

  return (
    <ThemeToggleButton2
      isDark={isDark}
      onToggle={toggleTheme}
      className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-transparent p-0 text-foreground/70 hover:bg-transparent hover:text-foreground [&_svg]:h-4 [&_svg]:w-4"
    />
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { transitionTo } = usePageTransition()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.getBoundingClientRect().height
        document.documentElement.style.setProperty("--nav-height", `${height}px`)
      }
    }
    updateNavHeight()
    window.addEventListener("resize", updateNavHeight)
    return () => window.removeEventListener("resize", updateNavHeight)
  }, [isMobileMenuOpen])

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      if (path && path !== pathname) {
        transitionTo(href)
      } else if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
        }
      }
    } else {
      transitionTo(href)
    }
    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/projects") return pathname === "/projects"
    return false
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={whenMotion(reduceMotion, { y: -24 }, false)}
        animate={{ y: 0 }}
        transition={whenMotion(reduceMotion, { duration: 0.45, ease: easeOutExpo }, { duration: 0 })}
        className="fixed left-0 right-0 top-0 z-50 pt-3"
      >
        <ContentContainer>
          <div
            className={`relative transition-colors duration-200 ${
              isScrolled
                ? "border border-border/70 bg-background/94 shadow-sm"
                : "border border-border/50 bg-background/82"
            } rounded-[1.4rem]`}
          >
            <div className="relative px-4 py-2 sm:px-5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleNavClick("/")}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center"
                  aria-label="Go to homepage"
                >
                  <Image src="/main.png" alt="Tarun Vuppala" width={40} height={40} sizes="40px" draggable={false} />
                </button>

                <div className="hidden items-center md:flex">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      data-active={isActive(item.href)}
                      className="nav-link relative h-11 rounded-md px-3 text-sm font-medium text-foreground/80 hover:bg-transparent hover:text-foreground"
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>

                <div className="hidden items-center gap-0.5 md:flex">
                  <NavThemeToggle />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConsole(true)}
                    className="h-11 w-11 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
                    title="Dev Console"
                    aria-label="Open developer console"
                  >
                    <Terminal className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <div className="mx-2 h-6 w-px bg-border" />
                  <div className="flex items-center">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.key]
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-foreground/70 transition-colors duration-200 hover:text-foreground"
                        >
                          <Icon size={16} aria-hidden="true" />
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-1 md:hidden">
                  <NavThemeToggle />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 w-11 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                  >
                    {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    id="mobile-navigation"
                    initial={whenMotion(reduceMotion, { opacity: 0, height: 0 }, { opacity: 1, height: "auto" })}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={whenMotion(reduceMotion, { opacity: 0, height: 0 }, { opacity: 1, height: 0 })}
                    transition={whenMotion(reduceMotion, { duration: 0.24, ease: easeOutExpo }, { duration: 0 })}
                    className="mt-4 overflow-hidden md:hidden"
                  >
                    <div className="space-y-1 border-t border-foreground/10 pt-3">
                      {navItems.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => handleNavClick(item.href)}
                          className={`block min-h-11 w-full cursor-pointer px-1 py-3 text-left font-medium ${
                            isActive(item.href) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                      <div className="mt-2 flex items-center justify-between border-t border-foreground/10 pt-3">
                        <div className="flex">
                          {socialLinks.map((social) => {
                            const Icon = socialIcons[social.key]
                            return (
                              <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-foreground/70 hover:text-foreground"
                              >
                                <Icon size={16} aria-hidden="true" />
                              </a>
                            )
                          })}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowConsole(true)}
                          className="h-11 w-11 rounded-md p-0 text-foreground/70 hover:bg-transparent hover:text-foreground"
                          title="Dev Console"
                          aria-label="Open developer console"
                        >
                          <Terminal className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ContentContainer>
      </motion.nav>

      <DevConsole isOpen={showConsole} onClose={() => setShowConsole(false)} />
    </>
  )
}
