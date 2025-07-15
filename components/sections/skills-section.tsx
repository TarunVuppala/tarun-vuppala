"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Condensed skill data for home page
const featuredSkills = [
  { name: "React", category: "Frontend", level: "Expert", icon: "⚛️" },
  { name: "Next.js", category: "Framework", level: "Advanced", icon: "▲" },
  { name: "TypeScript", category: "Language", level: "Expert", icon: "🔷" },
  { name: "Node.js", category: "Backend", level: "Advanced", icon: "🟢" },
  { name: "Python", category: "Language", level: "Proficient", icon: "🐍" },
  { name: "MongoDB", category: "Database", level: "Advanced", icon: "🍃" },
]

const skillCategories = [
  { name: "Frontend", count: 8, color: "bg-blue-500" },
  { name: "Backend", count: 6, color: "bg-green-500" },
  { name: "Database", count: 4, color: "bg-purple-500" },
  { name: "Tools", count: 10, color: "bg-orange-500" },
]

function SkillCard({ skill, index, isVisible }: { skill: any; index: number; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group"
    >
      <Card className="border-border/50 hover:border-border transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <motion.div
            className="text-2xl mb-2 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: [0, -10, 10, 0] }}
          >
            {skill.icon}
          </motion.div>
          <h4 className="font-medium mb-1">{skill.name}</h4>
          <Badge variant="secondary" className="text-xs mb-2">
            {skill.category}
          </Badge>
          <div
            className={`text-xs font-medium ${
              skill.level === "Expert"
                ? "text-green-500"
                : skill.level === "Advanced"
                  ? "text-blue-500"
                  : "text-yellow-500"
            }`}
          >
            {skill.level}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const router = useRouter()

  return (
    <section id="skills" ref={containerRef} className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Skills &{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Expertise
            </motion.span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Core technologies I use to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Featured Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {featuredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} isVisible={isInView} />
          ))}
        </div>

        {/* Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className={`w-3 h-3 ${category.color} rounded-full mx-auto mb-2`} />
                  <h4 className="font-medium mb-1">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} technologies</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/about")}
              className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full bg-transparent backdrop-blur-sm"
            >
              View All Skills & Experience
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
