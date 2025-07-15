"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Terminal, RotateCcw, Lightbulb, Code2 } from "lucide-react"

const inspirationalQuotes = [
  '"Code is poetry written in logic." - Anonymous',
  '"First, solve the problem. Then, write the code." - John Johnson',
  '"The best error message is the one that never shows up." - Thomas Fuchs',
  '"Clean code always looks like it was written by someone who cares." - Robert C. Martin',
  "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
  '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
]

export default function PlaygroundSection() {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "🚀 Welcome to Tarun's Dev Console!",
    '💡 "Code is poetry written in logic." - Anonymous',
    "✨ Type JavaScript commands below to see the magic happen:",
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })

  const executeCommand = (command: string) => {
    const newOutput = [...consoleOutput, `> ${command}`]

    try {
      let result

      // Special commands
      if (command.toLowerCase().includes("quote") || command.toLowerCase().includes("inspiration")) {
        const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]
        result = randomQuote
      } else if (command.toLowerCase().includes("hello") || command.toLowerCase().includes("hi")) {
        result = "👋 Hello! I'm Tarun. Thanks for checking out my console!"
      } else if (command.toLowerCase().includes("skills")) {
        result = "🛠️ React, Next.js, TypeScript, Node.js, Python, and many more!"
      } else if (command.toLowerCase().includes("contact")) {
        result = "📧 tarun.vuppala26@gmail.com - Let's build something amazing together!"
      } else if (command.includes("console.log")) {
        const match = command.match(/console\.log$$(.+)$$/)
        if (match) {
          result = eval(match[1])
        }
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

  const clearConsole = () => {
    const nextQuote = inspirationalQuotes[(currentQuoteIndex + 1) % inspirationalQuotes.length]
    setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length)
    setConsoleOutput([
      "🚀 Welcome to Tarun's Dev Console!",
      `💡 ${nextQuote}`,
      "✨ Type JavaScript commands below to see the magic happen:",
    ])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
    }
  }

  const exampleCommands = [
    "Math.random() * 100",
    "new Date().toISOString()",
    "console.log('Hello, World!')",
    "[1,2,3].map(x => x * 2)",
    "quote",
    "skills",
    "contact",
  ]

  return (
    <section id="playground" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
          />

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Developer{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Console
            </motion.span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive JavaScript playground with inspirational quotes and custom commands
          </p>
        </motion.div>

        {/* Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-border/50 overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              {/* Console Header */}
              <div className="bg-muted/30 border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    <span className="font-medium">Tarun's Dev Console</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={clearConsole} className="h-8 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Quote
                  </Button>
                </div>
              </div>

              {/* Console Output */}
              <div className="bg-background/50 p-6 font-mono text-sm min-h-[400px] max-h-[500px] overflow-y-auto">
                {consoleOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`mb-2 ${
                      line.startsWith(">")
                        ? "text-blue-400 font-semibold"
                        : line.startsWith("✅")
                          ? "text-green-400"
                          : line.startsWith("❌")
                            ? "text-red-400"
                            : line.startsWith("💡")
                              ? "text-yellow-400 italic"
                              : line.startsWith("🚀")
                                ? "text-purple-400 font-bold"
                                : "text-muted-foreground"
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}

                {/* Input Line */}
                <div className="flex items-center mt-4">
                  <span className="text-green-400 mr-3 font-bold">{">"}</span>
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder:text-muted-foreground/50"
                    placeholder="Enter JavaScript command or try 'quote', 'skills', 'contact'..."
                    autoFocus
                  />
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="w-2 h-4 bg-green-400 ml-1"
                  />
                </div>
              </div>

              {/* Example Commands */}
              <div className="border-t border-border p-6 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">Try these examples:</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {exampleCommands.map((command, index) => (
                    <motion.button
                      key={command}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => executeCommand(command)}
                      className="px-3 py-2 bg-card hover:bg-muted rounded-lg text-sm font-mono border border-border/50 hover:border-border transition-all text-left"
                    >
                      {command}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="border-border/50 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Interactive Learning Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                This console demonstrates my approach to creating engaging developer tools. It features real-time
                JavaScript execution, inspirational quotes, and custom commands. Built with React and designed for both
                functionality and delight.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
