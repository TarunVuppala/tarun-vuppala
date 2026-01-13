"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, Zap, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DevConsoleProps {
    isOpen: boolean
    onClose: () => void
}

export default function DevConsole({ isOpen, onClose }: DevConsoleProps) {
    const [consoleOutput, setConsoleOutput] = useState<string[]>([
        "🚀 Welcome to Dev Console!",
        '💡 "First, solve the problem. Then, write the code." - John Johnson',
        "✨ Interactive JavaScript Terminal - Type commands below:",
        "💻 Try: hello, skills, quote, projects, clear, or any JavaScript!",
    ])
    const [currentInput, setCurrentInput] = useState("")
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isTyping, setIsTyping] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null)

    const quotes = [
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
        '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
    ]

    const skills = [
        "🚀 Frontend: React, Next.js, TypeScript, Tailwind CSS, Motion, Three.js, R3f",
        "⚡ Backend: Node.js, Nest.js, Express",
        "🗄️ Database: PostgreSQL, MongoDB",
        "☁️ Cloud: AWS, Vercel, Docker",
        "🛠️ Tools: Git, VS Code, Figma",
    ]

    const projects = [
        "Acethletics: All-in-One College Sports Management; ",
        "QuickFuel: Smart Fuel Station Locator & Tracker; ",
        "TEDxACEEC 2024: Event Website & Collaborator Portal; ",
        "Trimly.ai: AI-Powered Book Trimming; ",
        "AutoPodcast: Automated Podcast Editing & Publishing"
    ]

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
    }, [consoleOutput])

    useEffect(() => {
        return () => {
            if (typewriterTimerRef.current) {
                clearInterval(typewriterTimerRef.current)
            }
        }
    }, [])

    const typeWriter = (text: string) => {
        if (typewriterTimerRef.current) {
            clearInterval(typewriterTimerRef.current)
        }
        setIsTyping(true)
        let index = 0
        const speed = 30
        typewriterTimerRef.current = setInterval(() => {
            index += 1
            setConsoleOutput((prev) => {
                const newOutput = [...prev]
                const lastIndex = newOutput.length - 1
                if (lastIndex >= 0) {
                    newOutput[lastIndex] = `✅ ${text.slice(0, Math.min(index, text.length))}`
                }
                return newOutput
            })
            if (index >= text.length) {
                if (typewriterTimerRef.current) {
                    clearInterval(typewriterTimerRef.current)
                }
                typewriterTimerRef.current = null
                setIsTyping(false)
            }
        }, speed)
    }

    const executeCommand = (command: string) => {
        const trimmedCommand = command.trim()
        if (!trimmedCommand) return

        // Add to history
        setCommandHistory((prev) => [...prev, trimmedCommand])
        setHistoryIndex(-1)

        const newOutput = [...consoleOutput, `> ${trimmedCommand}`]

        try {
            let result = ""

            // Custom commands
            if (trimmedCommand.toLowerCase().includes("hello")) {
                result =
                    "👋 Hello there! I'm Tarun, a passionate Full Stack Developer who loves crafting digital experiences that make a difference!"
            } else if (trimmedCommand.toLowerCase().includes("skills")) {
                newOutput.push("🛠️ My Technical Arsenal:")
                skills.forEach((skill) => newOutput.push(`   ${skill}`))
                setConsoleOutput(newOutput)
                setCurrentInput("")
                return
            } else if (trimmedCommand.toLowerCase().includes("projects")) {
                newOutput.push("🚀 Featured Projects:")
                projects.forEach((project) => newOutput.push(`   ${project}`))
                setConsoleOutput(newOutput)
                setCurrentInput("")
                return
            } else if (trimmedCommand.toLowerCase().includes("quote")) {
                result = quotes[Math.floor(Math.random() * quotes.length)]
            } else if (trimmedCommand.toLowerCase().includes("clear")) {
                setConsoleOutput([
                    "🚀 Console cleared! Ready for new adventures...",
                    "💡 Pro tip: Try 'help' to see available commands!",
                ])
                setCurrentInput("")
                return
            } else if (trimmedCommand.toLowerCase().includes("help")) {
                newOutput.push("📚 Available Commands:")
                newOutput.push("   • hello - Get a personal greeting")
                newOutput.push("   • skills - View my technical skills")
                newOutput.push("   • projects - See my featured projects")
                newOutput.push("   • quote - Get an inspiring quote")
                newOutput.push("   • clear - Clear the console")
                newOutput.push("   • Or try any JavaScript expression!")
                setConsoleOutput(newOutput)
                setCurrentInput("")
                return
            } else if (trimmedCommand.toLowerCase().includes("coffee")) {
                result = "☕ Coffee.exe has stopped working... Just kidding! ☕ fuels my code!"
            } else if (trimmedCommand.toLowerCase().includes("love")) {
                result = "❤️ I love coding, coffee, and creating amazing user experiences!"
            } else {
                result = "🤖 That command isn't available. Type 'help' to see the supported commands."
            }

            newOutput.push(`✅ ${result}`)
            setConsoleOutput(newOutput)

            // Type writer effect for longer responses
            if (result.length > 50) {
                typeWriter(result)
            }
        } catch (error) {
            newOutput.push(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`)
            setConsoleOutput(newOutput)
        }

        setCurrentInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
                className="fixed inset-0 bg-black/70 z-[100 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="w-full max-w-4xl h-[80vh] relative overflow-hidden rounded-3xl bg-background text-foreground border border-border shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative flex items-center justify-between p-6 border-b border-border">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                                    <Terminal className="w-6 h-6 text-foreground" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    Dev Console
                                </h2>
                                <p className="text-sm text-muted-foreground">Interactive JavaScript Terminal</p>
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
                        className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                        {consoleOutput.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-start gap-2 ${line.startsWith(">")
                                    ? "text-cyan-400 font-semibold"
                                    : line.startsWith("✅")
                                        ? "text-green-400"
                                        : line.startsWith("❌")
                                            ? "text-red-400"
                                            : line.startsWith("💡")
                                                ? "text-yellow-400 italic"
                                                : line.startsWith("🛠️") || line.startsWith("🚀") || line.startsWith("📚")
                                                    ? "text-blue-400 font-semibold"
                                                    : "text-white/80"
                                    }`}
                            >
                                {line.startsWith("   ") ? <span className="ml-4 text-white/60">{line}</span> : <span>{line}</span>}
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                className="text-green-400"
                            >
                                ▋
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="relative border-t border-white/10 p-6">
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
                                placeholder="Enter command... (try 'help' for available commands)"
                                disabled={isTyping}
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

                        <div className="flex items-center justify-between mt-4 text-xs text-white/40">
                            <div className="flex items-center space-x-4">
                                <span>Press ↑/↓ for command history</span>
                                <span>•</span>
                                <span>Enter to execute</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3 text-red-400" />
                                <span>Made with love by Tarun</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
