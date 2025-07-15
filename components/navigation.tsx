"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Github, Linkedin, Twitter, Mail, Menu, X, Sun, Moon, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass bg-background/50 backdrop-blur-md border-b border-border/50 shadow-xl" : ""
          }`}

      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <button onClick={() => handleNavClick("/")} className="text-xl sm:text-2xl font-bold">
                <motion.span
                  className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                  whileHover={{
                    backgroundImage: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary)/0.8))",
                  }}
                >
                  {/* Change this */}
                  Tarun Vuppala
                </motion.span>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                    className={`relative py-2 px-1 transition-colors duration-300 hover:text-foreground ${pathname === item.href ? "text-foreground" : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/50 rounded-full origin-left"
                      initial={{ scaleX: pathname === item.href ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Theme Toggle, Console & Social Links */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 p-0 hover:bg-muted/50"
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
                  className="w-9 h-9 p-0 hover:bg-muted/50"
                  title="Dev Console"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
              </motion.div>

              <div className="h-6 w-px border-l" />

              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-2 rounded-lg hover:bg-muted/50"
                >
                  <social.icon size={16} className="lg:w-[18px] lg:h-[18px]" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConsole(true)}
                className="w-9 h-9 p-0"
                title="Dev Console"
              >
                <Terminal className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0"
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
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 pb-4 border-t border-border overflow-hidden"
              >
                <div className="flex flex-col space-y-4 pt-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`block py-2 transition-colors ${pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between pt-4 border-t border-border"
                  >
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <social.icon size={18} />
                        </a>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-9 h-9 p-0"
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
      </motion.nav>

      {/* Dev Console Modal */}
      <DevConsoleModal isOpen={showConsole} onClose={() => setShowConsole(false)} />
    </>
  )
}

// Dev Console Modal Component
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
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-end p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="w-full max-w-md h-[70vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Console Header */}
        <div className="bg-muted/30 border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="font-medium text-sm">Dev Console</span>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose} className="h-6 w-6 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Console Output */}
        <div className="p-4 font-mono text-xs h-full overflow-y-auto bg-background/50">
          {consoleOutput.map((line, index) => (
            <div
              key={index}
              className={`mb-1 ${line.startsWith(">")
                  ? "text-blue-400 font-semibold"
                  : line.startsWith("✅")
                    ? "text-green-400"
                    : line.startsWith("❌")
                      ? "text-red-400"
                      : line.startsWith("💡")
                        ? "text-yellow-400 italic"
                        : "text-muted-foreground"
                }`}
            >
              {line}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">{">"}</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && executeCommand(currentInput)}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs"
              placeholder="Enter command..."
              autoFocus
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
