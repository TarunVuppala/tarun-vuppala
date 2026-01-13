"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Github, Linkedin, Twitter, Mail, Menu, X, Sun, Moon, Terminal, Badge, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"
import DevConsole from "@/components/DevConsole"
import Image from "next/image"
import ContentContainer from "@/components/layout/content-container"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConsole, setShowConsole] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/#contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/TarunVuppala", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/tarun26", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/Tarun_Vuppala", label: "Twitter" },
    { icon: Mail, href: "mailto:tarun.vuppala26@gmail.com", label: "Email" },
  ]

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      if (path && path !== pathname) {
        router.push(href)
      } else if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      router.push(href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed max-w-screen top-0 left-0 right-0 z-50 pt-3"
      >
        <ContentContainer>
          <div
            className={`relative transition-all duration-500 ${isScrolled
              ? "bg-background/95 border border-border shadow-sm"
              : "bg-background/85 border border-border/60"
              } rounded-2xl`}
          >

            <div className="relative px-0 py-3">
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <button onClick={() => handleNavClick("/")} className="text-xl sm:text-2xl font-bold">
                  <motion.span className="text-foreground">
                    <Image src={"/main.png"} alt="Tarun Vuppala" width={50} height={50} draggable={false} />
                  </motion.span>
                </button>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      className={`relative py-2.5 px-4 rounded-xl transition-all duration-300 font-medium text-sm hover:text-foreground hover:bg-foreground/5 hover:border-foreground/5"
                        }`}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Desktop icons */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 0.9 }}
                  onClick={() => { }}
                >
                  <Button variant={"outline"} className="text-sm cursor-pointer border-0">
                    <Hammer className="w-4 h-4" />
                    WIP
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-10 h-10 p-0 rounded-full hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConsole(true)}
                    className="w-10 h-10 p-0 rounded-full hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300"
                    title="Dev Console"
                  >
                    <Terminal className="h-4 w-4" />
                  </Button>
                </motion.div>
                <div className="h-8 w-px bg-border mx-2" />
                <div className="flex items-center space-x-1">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    className="text-foreground/60 hover:text-foreground transition-all duration-300 p-2.5 rounded-xl hover:bg-foreground/8 border border-transparent hover:border-foreground/10"
                  >
                      <social.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile icons only */}
              <div className="flex items-center gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 p-0 rounded-full hover:bg-foreground/10 border border-foreground/10"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full hover:bg-foreground/10 border border-foreground/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={18} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="md:hidden mt-6 overflow-hidden"
                >
                  <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-4 space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`block py-3 px-4 rounded-xl transition-all duration-300 font-medium ${pathname === item.href
                            ? "text-foreground bg-foreground/10 border border-foreground/20"
                            : "text-foreground/70 hover:text-foreground hover:bg-foreground/8 border border-transparent hover:border-foreground/10"
                            }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between pt-4 mt-4 border-t border-foreground/10"
                    >
                      <div className="flex space-x-2">
                        {socialLinks.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-foreground transition-all duration-300 p-2.5 rounded-xl hover:bg-foreground/8 border border-transparent hover:border-foreground/10"
                          >
                            <social.icon size={16} />
                          </a>
                        ))}
                      </div>
                      <div className="flex space-x-2 items-center content-center ">
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 0.9 }}
                          onClick={() => { }}
                        >
                          <Button variant={"ghost"} className="text-sm cursor-pointer border-0">
                            <Hammer className="w-4 h-4" />
                            WIP
                          </Button>
                        </motion.div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowConsole(true)}
                          className="w-10 h-10 p-0 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 mr-1"
                          title="Dev Console"
                        >
                          <Terminal className="h-4 w-4" />
                        </Button>
                      </div>

                    </motion.div>
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
