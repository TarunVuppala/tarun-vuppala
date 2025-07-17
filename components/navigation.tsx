"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Github, Linkedin, Twitter, Mail, Menu, X, Sun, Moon, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

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
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/TarunVuppala", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/tarun26", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/Tarun_Vuppala", label: "Twitter" },
    { icon: Mail, href: "mailto:tarun.vuppala26@gmail.com", label: "Email" },
  ]

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
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
        className="fixed w-full top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
      >
        <div
          className={`relative max-w-7xl mx-auto transition-all duration-700 ease-out ${isScrolled
            ? "bg-background/20 backdrop-blur-2xl border border-foreground/10 shadow-2xl shadow-primary/5"
            : "bg-background/10 backdrop-blur-xl border border-foreground/5 shadow-lg shadow-primary/2"
            } rounded-2xl overflow-hidden`}
          style={{
            backdropFilter: isScrolled ? "blur(40px) saturate(200%)" : "blur(24px) saturate(150%)",
            WebkitBackdropFilter: isScrolled ? "blur(40px) saturate(200%)" : "blur(24px) saturate(150%)",
          }}
        >
          {/* Refined glass overlay with gradient mesh */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${isScrolled
              ? "bg-gradient-to-r from-background/30 via-background/10 to-background/30"
              : "bg-gradient-to-r from-background/20 via-background/5 to-background/20"
              }`}
          />

          {/* Subtle inner glow */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${isScrolled
              ? "bg-gradient-to-b from-primary/3 via-transparent to-primary/3"
              : "bg-gradient-to-b from-primary/2 via-transparent to-primary/2"
              }`}
          />

          {/* Top highlight */}
          <div
            className={`absolute top-0 left-0 right-0 h-px transition-all duration-700 ${isScrolled
              ? "bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
              }`}
          />

          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <button onClick={() => handleNavClick("/")} className="text-xl sm:text-2xl font-bold">
                  <motion.span
                    className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent"
                    whileHover={{
                      backgroundImage:
                        "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary)/0.8), hsl(var(--foreground)))",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Tarun Vuppala
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
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`relative py-2.5 px-4 rounded-xl transition-all duration-300 font-medium text-sm ${pathname === item.href
                        ? "text-foreground bg-foreground/8 shadow-lg shadow-primary/10 border border-foreground/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5 border border-transparent hover:border-foreground/5"
                        }`}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Theme Toggle, Console & Social Links */}
              <div className="hidden md:flex items-center space-x-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-10 h-10 p-0 rounded-xl hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 backdrop-blur-sm"
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
                    className="w-10 h-10 p-0 rounded-xl hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 backdrop-blur-sm"

                    title="Dev Console"
                  >
                    <Terminal className="h-4 w-4" />
                  </Button>
                </motion.div>

                <div className="h-8 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent mx-2" />

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
                      className="text-foreground/60 hover:text-foreground transition-all duration-300 p-2.5 rounded-xl hover:bg-foreground/8 border border-transparent hover:border-foreground/10 backdrop-blur-sm"
                    >
                      <social.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConsole(true)}
                  className="w-10 h-10 p-0 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10"
                  title="Dev Console"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10"
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
                  <div
                    className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-2xl p-4 space-y-2"
                    style={{
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    }}
                  >
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-10 h-10 p-0 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10"
                      >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Dev Console Modal */}
      <DevConsoleModal isOpen={showConsole} onClose={() => setShowConsole(false)} />
    </>
  )
}

// Enhanced Dev Console Modal Component
function DevConsoleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "🚀 Welcome to Tarun's Dev Console!",
    '💡 "Code is poetry written in logic." - Anonymous',
    "✨ Type JavaScript commands below:",
  ])
  const [currentInput, setCurrentInput] = useState("")

  const executeCommand = (command: string) => {
    const newOutput = [...consoleOutput, `> ${command}`]
    try {
      let result
      if (command.toLowerCase().includes("quote")) {
        result = '"The best error message is the one that never shows up." - Thomas Fuchs'
      } else if (command.toLowerCase().includes("hello")) {
        result = "👋 Hello! I'm Tarun. Thanks for checking out my console!"
      } else if (command.toLowerCase().includes("skills")) {
        result = "🛠️ React, Next.js, TypeScript, Node.js, Python, and many more!"
      } else if (command.toLowerCase().includes("clear")) {
        setConsoleOutput(["🚀 Console cleared!"])
        setCurrentInput("")
        return
      } else {
        result = eval(command)
      }
      newOutput.push(`✅ ${String(result)}`)
    } catch (error) {
      newOutput.push(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
    setConsoleOutput(newOutput)
    setCurrentInput("")
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-lg h-[75vh] bg-background/30 backdrop-blur-2xl border border-foreground/20 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
        }}
      >
        {/* Refined glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20" />

        {/* Console Header */}
        <div className="relative bg-foreground/5 border-b border-foreground/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">Dev Console</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="w-8 h-8 p-0 hover:bg-foreground/10 rounded-lg border border-foreground/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Console Output */}
        <div className="relative p-6 font-mono text-sm h-full overflow-y-auto">
          <div className="space-y-2">
            {consoleOutput.map((line, index) => (
              <div
                key={index}
                className={`${line.startsWith(">")
                  ? "text-blue-400 font-semibold"
                  : line.startsWith("✅")
                    ? "text-green-400"
                    : line.startsWith("❌")
                      ? "text-red-400"
                      : line.startsWith("💡")
                        ? "text-yellow-400 italic"
                        : "text-foreground/80"
                  }`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Input Line */}
          <div className="flex items-center mt-4 pt-4 border-t border-foreground/10">
            <span className="text-green-400 mr-3 font-bold">{">"}</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && currentInput.trim() && executeCommand(currentInput)}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder:text-foreground/40"
              placeholder="Enter command... (try 'hello', 'skills', 'quote', or 'clear')"
              autoFocus
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
