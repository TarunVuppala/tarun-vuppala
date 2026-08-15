"use client"

import type React from "react"

import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { resumeFilePath, siteConfig, socialProfiles } from "@/lib/seo"
import { allProjects, skillsByDomain } from "@/lib/data"

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
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [paletteQuery, setPaletteQuery] = useState("")
    const [paletteIndex, setPaletteIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const paletteInputRef = useRef<HTMLInputElement>(null)
    const startedAtRef = useRef<number>(Date.now())
    const { theme, setTheme, systemTheme } = useTheme()
    const historyStorageKey = "devConsoleHistory:v1"
    const historyLimit = 100

    const quotes = [
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
        '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
    ]

    const skills = skillsByDomain.map(
        (domain) => `${domain.title}: ${domain.skills.map((skill) => skill.name).join(", ")}`,
    )

    const projects = allProjects.map((project) => `${project.title}: ${project.subtitle}`)

    const quickCommands = ["help", "projects", "skills", "contact", "status", "theme dark"]

    const socials = socialProfiles

    const knownCommands = [
        "help",
        "about",
        "skills",
        "stack",
        "projects",
        "contact",
        "socials",
        "resume",
        "open",
        "theme",
        "time",
        "uptime",
        "status",
        "history",
        "search",
        "echo",
        "quote",
        "clear",
    ]

    const aliases: Record<string, string> = {
        hi: "hello",
        hey: "hello",
        hello: "hello",
        stack: "skills",
        whoami: "about",
        bio: "about",
        socials: "socials",
    }

    const commandMeta: Record<string, { description: string; usage?: string }> = {
        help: { description: "List commands or show details", usage: "help [command]" },
        about: { description: "Quick bio and focus areas", usage: "about" },
        skills: { description: "Technical stack", usage: "skills" },
        projects: { description: "Show featured projects or search them", usage: "projects [list|count|search <term>]" },
        contact: { description: "Contact details", usage: "contact" },
        socials: { description: "Social profiles", usage: "socials" },
        resume: { description: "Resume link", usage: "resume" },
        open: { description: "Open a section or external profile", usage: "open <projects|contact|resume|github|linkedin|twitter|email>" },
        theme: { description: "Set color theme", usage: "theme <light|dark|system>" },
        time: { description: "Local time and timezone", usage: "time" },
        uptime: { description: "Console session uptime", usage: "uptime" },
        status: { description: "System and session status", usage: "status" },
        history: { description: "Show recent commands", usage: "history [count]" },
        search: { description: "Search projects and skills", usage: "search <term>" },
        echo: { description: "Echo back text", usage: "echo <text>" },
        quote: { description: "Random dev quote", usage: "quote" },
        clear: { description: "Clear the console", usage: "clear" },
    }

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        try {
            const stored = localStorage.getItem(historyStorageKey)
            if (stored) {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) {
                    const sanitized = parsed.filter((item) => typeof item === "string")
                    setCommandHistory(sanitized.slice(-historyLimit))
                }
            }
        } catch {
            setCommandHistory([])
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        try {
            localStorage.setItem(historyStorageKey, JSON.stringify(commandHistory.slice(-historyLimit)))
        } catch {
            // ignore write errors
        }
    }, [commandHistory, isOpen])

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

    useEffect(() => {
        if (isPaletteOpen) {
            setPaletteIndex(0)
            setTimeout(() => paletteInputRef.current?.focus(), 50)
        }
    }, [isPaletteOpen])

    useEffect(() => {
        if (!isOpen) {
            setIsPaletteOpen(false)
        }
    }, [isOpen])

    const appendOutput = (lines: string[]) => {
        setConsoleOutput((prev) => [...prev, ...lines])
    }

    const formatDuration = (ms: number) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000))
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60
        return `${hours}h ${minutes}m ${seconds}s`
    }

    const formatTime = () => {
        const now = new Date()
        return now.toLocaleString(undefined, {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            month: "short",
            day: "2-digit",
            timeZoneName: "short",
        })
    }

    const scrollToSection = (id: string) => {
        onClose()
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }, 120)
    }

    const handleOpen = (target: string | undefined) => {
        if (!target) return "Try: open projects, open contact, or open resume."
        if (target === "github") {
            window.open(socials.github, "_blank", "noopener")
            return "Opening GitHub..."
        }
        if (target === "linkedin") {
            window.open(socials.linkedin, "_blank", "noopener")
            return "Opening LinkedIn..."
        }
        if (target === "twitter") {
            window.open(socials.twitter, "_blank", "noopener")
            return "Opening Twitter..."
        }
        if (target === "email") {
            window.open(socials.email, "_blank", "noopener")
            return "Opening email..."
        }
        if (target === "projects") {
            scrollToSection("projects")
            return "Opening Projects section..."
        }
        if (target === "contact") {
            scrollToSection("contact")
            return "Opening Contact section..."
        }
        if (target === "resume") {
            window.open(resumeFilePath, "_blank", "noopener")
            return "Opening resume..."
        }
        return "Unknown destination. Try: open projects, contact, resume, github, linkedin, twitter, or email."
    }

    const fuzzyScore = (query: string, value: string) => {
        const q = query.toLowerCase()
        const v = value.toLowerCase()
        if (!q) return 0
        let score = 0
        let qIndex = 0
        let consecutive = 0
        for (let i = 0; i < v.length; i += 1) {
            if (v[i] === q[qIndex]) {
                score += 10 + consecutive * 5
                qIndex += 1
                consecutive += 1
                if (qIndex >= q.length) break
            } else {
                score -= 1
                consecutive = 0
            }
        }
        if (qIndex < q.length) return null
        return score - v.length * 0.1
    }

    const getSuggestions = (input: string) => {
        const trimmed = input.trim().toLowerCase()
        if (!trimmed) return quickCommands
        const parts = trimmed.split(/\s+/)
        if (parts.length === 1) {
            const scored = knownCommands
                .map((cmd) => ({ cmd, score: fuzzyScore(parts[0], cmd) }))
                .filter((entry) => entry.score !== null)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            return scored.map((entry) => entry.cmd)
        }
        if (parts[0] === "open") {
            const targets = ["projects", "contact", "resume", "github", "linkedin", "twitter", "email"]
            const query = parts[1] ?? ""
            return targets
                .map((target) => ({ target, score: fuzzyScore(query, target) }))
                .filter((entry) => entry.score !== null)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((entry) => entry.target)
        }
        if (parts[0] === "theme") {
            const targets = ["light", "dark", "system"]
            const query = parts[1] ?? ""
            return targets
                .map((target) => ({ target, score: fuzzyScore(query, target) }))
                .filter((entry) => entry.score !== null)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((entry) => entry.target)
        }
        if (parts[0] === "projects") {
            const targets = ["list", "count", "search"]
            const query = parts[1] ?? ""
            return targets
                .map((target) => ({ target, score: fuzzyScore(query, target) }))
                .filter((entry) => entry.score !== null)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((entry) => entry.target)
        }
        if (parts[0] === "help") {
            const query = parts[1] ?? ""
            return knownCommands
                .map((cmd) => ({ cmd, score: fuzzyScore(query, cmd) }))
                .filter((entry) => entry.score !== null)
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((entry) => entry.cmd)
        }
        return []
    }

    const suggestions = useMemo(() => getSuggestions(currentInput), [currentInput])

    const paletteItems = useMemo(() => {
        const query = paletteQuery.trim().toLowerCase()
        const historyItems = commandHistory
            .slice(-12)
            .reverse()
            .map((entry, index) => ({
                id: `history-${index}-${entry}`,
                label: entry,
                value: entry,
                type: "history",
                description: "Recent command",
                score: query ? fuzzyScore(query, entry) : 0,
            }))
        const commandItems = knownCommands.map((cmd) => ({
            id: `command-${cmd}`,
            label: cmd,
            value: cmd,
            type: "command",
            description: commandMeta[cmd]?.description,
            score: query ? fuzzyScore(query, cmd) : 0,
        }))

        const allItems = [...commandItems, ...historyItems].filter((item) => item.score !== null)
        if (!query) return allItems
        return allItems.sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    }, [paletteQuery, commandHistory])

    useEffect(() => {
        if (paletteIndex > Math.max(0, paletteItems.length - 1)) {
            setPaletteIndex(0)
        }
    }, [paletteItems, paletteIndex])

    const applyPaletteSelection = (runCommand: boolean) => {
        const item = paletteItems[paletteIndex]
        if (!item) return
        if (runCommand) {
            executeCommand(item.value)
        } else {
            setCurrentInput(item.value)
        }
        setIsPaletteOpen(false)
        setPaletteQuery("")
        setTimeout(() => inputRef.current?.focus(), 50)
    }

    const executeCommand = (command: string) => {
        const trimmedCommand = command.trim()
        if (!trimmedCommand) return

        setCommandHistory((prev) => {
            const next = [...prev, trimmedCommand]
            return next.slice(-historyLimit)
        })
        setHistoryIndex(-1)
        appendOutput([`> ${trimmedCommand}`])

        const normalized = trimmedCommand.toLowerCase()
        const [cmd, ...args] = normalized.split(/\s+/)
        const primary = cmd === "show" && args[0] ? args[0] : cmd
        const resolved = aliases[primary] ?? primary

        try {
            if (resolved === "hello") {
                appendOutput([
                    "Hello there! I'm Tarun, a backend and AI engineer who builds reliable products.",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "about") {
                appendOutput([
                    "About:",
                    "• Backend and AI engineer focused on clean architecture and thoughtful UX.",
                    "• Backend-first problem solver building reliable systems and modern web apps.",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "skills") {
                appendOutput(["Technical Arsenal:", ...skills.map((skill) => `• ${skill}`)])
                setCurrentInput("")
                return
            }

            if (resolved === "projects") {
                if (args[0] === "count") {
                    appendOutput([`Projects count: ${projects.length}`])
                    setCurrentInput("")
                    return
                }
                if (args[0] === "search") {
                    const term = args.slice(1).join(" ")
                    if (!term) {
                        appendOutput(["Usage: projects search <term>"])
                        setCurrentInput("")
                        return
                    }
                    const results = projects.filter((project) =>
                        project.toLowerCase().includes(term.toLowerCase())
                    )
                    appendOutput([
                        `Search results for "${term}":`,
                        ...(results.length ? results.map((project) => `• ${project}`) : ["No matches found."]),
                    ])
                    setCurrentInput("")
                    return
                }
                appendOutput(["Featured Projects:", ...projects.map((project) => `• ${project}`), "→ open projects"])
                setCurrentInput("")
                return
            }

            if (resolved === "quote") {
                appendOutput([quotes[Math.floor(Math.random() * quotes.length)]])
                setCurrentInput("")
                return
            }

            if (resolved === "contact") {
                appendOutput([
                    "Contact:",
                    `• Email: ${siteConfig.email}`,
                    `• LinkedIn: ${socials.linkedin.replace("https://", "")}`,
                    "→ open contact",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "socials") {
                appendOutput([
                    "Socials:",
                    `• GitHub: ${socials.github}`,
                    `• LinkedIn: ${socials.linkedin}`,
                    `• Twitter: ${socials.twitter}`,
                    "→ open github|linkedin|twitter",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "resume") {
                appendOutput([`Resume: ${resumeFilePath}`, "→ open resume"])
                setCurrentInput("")
                return
            }

            if (resolved === "time") {
                appendOutput([`Local time: ${formatTime()}`])
                setCurrentInput("")
                return
            }

            if (resolved === "uptime") {
                appendOutput([`Session uptime: ${formatDuration(Date.now() - startedAtRef.current)}`])
                setCurrentInput("")
                return
            }

            if (resolved === "status") {
                appendOutput([
                    "System Status:",
                    `• Online: ${navigator.onLine ? "Yes" : "No"}`,
                    `• Language: ${navigator.language}`,
                    `• Theme: ${theme ?? "system"} (system: ${systemTheme ?? "unknown"})`,
                    `• Uptime: ${formatDuration(Date.now() - startedAtRef.current)}`,
                    `• Viewport: ${window.innerWidth}x${window.innerHeight}`,
                    `• Pixel ratio: ${window.devicePixelRatio}`,
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "history") {
                const limit = Number.parseInt(args[0] ?? "10", 10)
                const recent = commandHistory.slice(-Math.max(1, Number.isNaN(limit) ? 10 : limit))
                appendOutput([
                    "Command History:",
                    ...(recent.length ? recent.map((entry, index) => `• ${index + 1}. ${entry}`) : ["No history yet."]),
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "search") {
                const term = args.join(" ")
                if (!term) {
                    appendOutput(["Usage: search <term>"])
                    setCurrentInput("")
                    return
                }
                const projectHits = projects.filter((project) => project.toLowerCase().includes(term.toLowerCase()))
                const skillHits = skills.filter((skill) => skill.toLowerCase().includes(term.toLowerCase()))
                appendOutput([
                    `Search results for "${term}":`,
                    ...(projectHits.length ? projectHits.map((project) => `• ${project}`) : ["• No project matches."]),
                    ...(skillHits.length ? skillHits.map((skill) => `• ${skill}`) : ["• No skill matches."]),
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "echo") {
                appendOutput([args.join(" ") || "Usage: echo <text>"])
                setCurrentInput("")
                return
            }

            if (resolved === "theme") {
                const nextTheme = args[0]
                if (!nextTheme || !["light", "dark", "system"].includes(nextTheme)) {
                    appendOutput([`Current theme: ${theme ?? "system"}`, "Usage: theme <light|dark|system>"])
                    setCurrentInput("")
                    return
                }
                setTheme(nextTheme)
                appendOutput([`Theme set to ${nextTheme}.`])
                setCurrentInput("")
                return
            }

            if (resolved === "clear") {
                setConsoleOutput([
                    "Console cleared. Ready for new commands.",
                    "Tip: Try 'help' to see available commands.",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "help") {
                if (args[0]) {
                    const meta = commandMeta[args[0]]
                    if (!meta) {
                        appendOutput([`No help available for "${args[0]}".`])
                        setCurrentInput("")
                        return
                    }
                    appendOutput([
                        `Command: ${args[0]}`,
                        `• ${meta.description}`,
                        ...(meta.usage ? [`• Usage: ${meta.usage}`] : []),
                    ])
                    setCurrentInput("")
                    return
                }
                appendOutput([
                    "Available Commands:",
                    ...knownCommands.map((command) => {
                        const meta = commandMeta[command]
                        return `• ${command} - ${meta?.description ?? "Command"}`
                    }),
                    "Tip: help <command> for details.",
                ])
                setCurrentInput("")
                return
            }

            if (resolved === "open") {
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
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault()
            setIsPaletteOpen(true)
            return
        }
        if (e.key === "Tab") {
            e.preventDefault()
            if (suggestions.length > 0) {
                const parts = currentInput.trim().split(/\s+/).filter(Boolean)
                if (parts.length <= 1) {
                    setCurrentInput(suggestions[0])
                } else {
                    setCurrentInput(`${parts[0]} ${suggestions[0]}`)
                }
            }
            return
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
            e.preventDefault()
            setConsoleOutput([
                "Console cleared. Ready for new commands.",
                "Tip: Try 'help' to see available commands.",
            ])
            setCurrentInput("")
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
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
                onClick={onClose}
            >
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Developer console"
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
                                aria-label="Close developer console"
                                className="w-11 h-11 p-0 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground"
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

                    <AnimatePresence>
                        {isPaletteOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 py-10"
                                onClick={() => {
                                    setIsPaletteOpen(false)
                                    setPaletteQuery("")
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/80 text-white shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="border-b border-white/10 px-5 py-4">
                                        <div className="flex items-center gap-3 text-sm text-white/60">
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white/70">
                                                Command Palette
                                            </span>
                                            <span>Fuzzy search commands + history</span>
                                        </div>
                                        <input
                                            ref={paletteInputRef}
                                            value={paletteQuery}
                                            onChange={(e) => setPaletteQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Escape") {
                                                    setIsPaletteOpen(false)
                                                    setPaletteQuery("")
                                                    return
                                                }
                                                if (e.key === "ArrowDown") {
                                                    e.preventDefault()
                                                    setPaletteIndex((prev) =>
                                                        Math.min(prev + 1, Math.max(0, paletteItems.length - 1))
                                                    )
                                                    return
                                                }
                                                if (e.key === "ArrowUp") {
                                                    e.preventDefault()
                                                    setPaletteIndex((prev) => Math.max(0, prev - 1))
                                                    return
                                                }
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    applyPaletteSelection(true)
                                                    return
                                                }
                                                if (e.key === "Tab") {
                                                    e.preventDefault()
                                                    applyPaletteSelection(false)
                                                }
                                            }}
                                            className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white outline-none placeholder:text-white/40"
                                            placeholder="Type a command or recent history..."
                                        />
                                    </div>
                                    <div className="max-h-72 overflow-y-auto px-2 py-3">
                                        {paletteItems.length === 0 && (
                                            <div className="px-4 py-6 text-sm text-white/50">
                                                No matches found. Try another query.
                                            </div>
                                        )}
                                        {paletteItems.map((item, index) => (
                                            <button
                                                key={item.id}
                                                className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left text-sm transition ${index === paletteIndex
                                                    ? "bg-white/10 text-white"
                                                    : "text-white/70 hover:bg-white/5"
                                                    }`}
                                                onMouseEnter={() => setPaletteIndex(index)}
                                                onClick={() => applyPaletteSelection(true)}
                                            >
                                                <div>
                                                    <div className="font-mono text-base">{item.label}</div>
                                                    {item.description && (
                                                        <div className="text-xs text-white/50">{item.description}</div>
                                                    )}
                                                </div>
                                                <div className="text-xs uppercase tracking-widest text-white/40">
                                                    {item.type}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/50">
                                        <span>Enter run • Tab fill • Esc close</span>
                                        <span>Cmd/Ctrl+K</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                                <span>Tab complete</span>
                                <span>•</span>
                                <span>Enter execute</span>
                                <span>•</span>
                                <span>Esc close</span>
                                <span>•</span>
                                <span>Ctrl/Cmd+L clear</span>
                                <span>•</span>
                                <span>Ctrl/Cmd+K palette</span>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {(currentInput ? suggestions : quickCommands).slice(0, 6).map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setCurrentInput(suggestion)
                                        inputRef.current?.focus()
                                    }}
                                    className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs text-foreground/70 transition hover:bg-foreground/10"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
