"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DevConsoleProps {
    isOpen: boolean
    onClose: () => void
}

export default function DevConsole({ isOpen, onClose }: DevConsoleProps) {
    const [consoleOutput, setConsoleOutput] = useState<string[]>([
        "Dev Console ready.",
        "Try: help, projects, contact, resume",
    ])
    const [currentInput, setCurrentInput] = useState("")
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)

    const quotes = [
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
        '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
    ]

    const skills = [
        "Frontend: React, Next.js, TypeScript, Tailwind CSS, Motion, Three.js, R3f",
        "Backend: Node.js, Nest.js, Express",
        "Database: PostgreSQL, MongoDB",
        "Cloud: AWS, Vercel, Docker",
        "Tools: Git, VS Code, Figma",
    ]

    const projects = [
        "Acethletics: All-in-One College Sports Management; ",
        "QuickFuel: Smart Fuel Station Locator & Tracker; ",
        "TEDxACEEC 2024: Event Website & Collaborator Portal; ",
        "Trimly.ai: AI-Powered Book Trimming; ",
        "AutoPodcast: Automated Podcast Editing & Publishing"
    ]

    const quickCommands = ["help", "projects", "contact", "resume"]

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isOpen])

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
    }, [consoleOutput])

    const appendOutput = (lines: string[]) => {
        setConsoleOutput((prev) => [...prev, ...lines])
    }

    const scrollToSection = (id: string) => {
        onClose()
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }, 120)
    }

    const handleOpen = (target: string | undefined) => {
        if (!target) return "Try: open projects, open contact, or open resume."
        if (target === "projects") {
            scrollToSection("projects")
            return "Opening Projects section..."
        }
        if (target === "contact") {
            scrollToSection("contact")
            return "Opening Contact section..."
        }
        if (target === "resume") {
            window.open("/resume.pdf", "_blank", "noopener")
            return "Opening resume..."
        }
        return "Unknown destination. Try: open projects, contact, or resume."
    }

    const executeCommand = (command: string) => {
        const trimmedCommand = command.trim()
        if (!trimmedCommand) return

        setCommandHistory((prev) => [...prev, trimmedCommand])
        setHistoryIndex(-1)
        appendOutput([`> ${trimmedCommand}`])

        const normalized = trimmedCommand.toLowerCase()
        const [cmd, ...args] = normalized.split(/\s+/)
        const primary = cmd === "show" && args[0] ? args[0] : cmd

        try {
            if (["hello", "hi", "hey"].includes(primary)) {
                appendOutput([
                    "Hello there! I'm Tarun, a full-stack developer who loves building polished, reliable products.",
                ])
                setCurrentInput("")
                return
            }

            if (primary === "about") {
                appendOutput([
                    "About:",
                    "• Full-stack developer focused on clean architecture and thoughtful UX.",
                    "• I ship scalable products and internal tools end-to-end.",
                ])
                setCurrentInput("")
                return
            }

            if (primary === "skills") {
                appendOutput(["Technical Arsenal:", ...skills.map((skill) => `• ${skill}`)])
                setCurrentInput("")
                return
            }

            if (primary === "projects") {
                appendOutput(["Featured Projects:", ...projects.map((project) => `• ${project}`), "→ open projects"])
                setCurrentInput("")
                return
            }

            if (primary === "quote") {
                appendOutput([quotes[Math.floor(Math.random() * quotes.length)]])
                setCurrentInput("")
                return
            }

            if (primary === "contact") {
                appendOutput([
                    "Contact:",
                    "• Email: tarun.vuppala26@gmail.com",
                    "• LinkedIn: linkedin.com/in/tarunvuppala",
                    "→ open contact",
                ])
                setCurrentInput("")
                return
            }

            if (primary === "resume") {
                appendOutput(["Resume: /resume.pdf", "→ open resume"])
                setCurrentInput("")
                return
            }

            if (primary === "clear") {
                setConsoleOutput([
                    "Console cleared. Ready for new commands.",
                    "Tip: Try 'help' to see available commands.",
                ])
                setCurrentInput("")
                return
            }

            if (primary === "help") {
                appendOutput([
                    "Available Commands:",
                    "• help - View commands",
                    "• about - Short bio",
                    "• skills - Technical stack",
                    "• projects - Featured projects",
                    "• quote - Random quote",
                    "• contact - Contact info",
                    "• resume - Resume link",
                    "• open <projects|contact|resume> - Jump to section",
                    "• clear - Clear console",
                ])
                setCurrentInput("")
                return
            }

            if (primary === "open") {
                appendOutput([handleOpen(args[0])])
                setCurrentInput("")
                return
            }

            if (normalized.includes("coffee")) {
                appendOutput(["Coffee.exe has stopped working... Just kidding! Coffee fuels my code."])
                setCurrentInput("")
                return
            }

            if (normalized.includes("love")) {
                appendOutput(["I love coding, coffee, and creating amazing user experiences."])
                setCurrentInput("")
                return
            }

            appendOutput(["That command isn't available. Type 'help' to see supported commands."])
        } catch (error) {
            appendOutput([`Error: ${error instanceof Error ? error.message : "Unknown error"}`])
        }

        setCurrentInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose()
            return
        }
        if (e.key === "Enter" && currentInput.trim()) {
            executeCommand(currentInput)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
                setHistoryIndex(newIndex)
                setCurrentInput(commandHistory[newIndex])
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault()
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1)
                    setCurrentInput("")
                } else {
                    setHistoryIndex(newIndex)
                    setCurrentInput(commandHistory[newIndex])
                }
            }
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="w-full max-w-4xl h-[72vh] relative overflow-hidden rounded-3xl bg-background text-foreground border border-border shadow-lg flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative flex items-center justify-between px-6 py-4 border-b border-border">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-11 h-11 bg-muted rounded-2xl flex items-center justify-center">
                                    <Terminal className="w-6 h-6 text-foreground" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    Dev Console
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span>Online</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="w-10 h-10 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Console Output */}
                    <div
                        ref={outputRef}
                        className="flex-1 min-h-0 px-6 py-4 font-mono text-sm overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                        {consoleOutput.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-start gap-2 ${line.startsWith(">")
                                    ? "text-cyan-400 font-semibold"
                                    : line.startsWith("Error:")
                                        ? "text-red-400"
                                    : line.startsWith("Tip:")
                                        ? "text-yellow-400 italic"
                                    : line.startsWith("Available Commands:") || line.startsWith("Technical Arsenal:") || line.startsWith("Featured Projects:") || line.startsWith("About:") || line.startsWith("Contact:") || line.startsWith("Resume:")
                                        ? "text-blue-400 font-semibold"
                                    : line.startsWith("•") || line.startsWith("→")
                                        ? "text-muted-foreground"
                                    : "text-white/80"
                                    }`}
                            >
                                <span>{line}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="relative border-t border-white/10 px-6 py-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                />
                                <span className="text-green-400 font-bold font-mono text-lg">{">"}</span>
                            </div>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/40 text-lg"
                                placeholder="Enter command... (try 'help')"
                            />
                            {currentInput && (
                                <motion.button
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => executeCommand(currentInput)}
                                    className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all duration-200"
                                >
                                    <Zap className="w-4 h-4" />
                                </motion.button>
                            )}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
                            <div className="flex flex-wrap items-center gap-3">
                                <span>↑/↓ history</span>
                                <span>•</span>
                                <span>Enter execute</span>
                                <span>•</span>
                                <span>Esc close</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
