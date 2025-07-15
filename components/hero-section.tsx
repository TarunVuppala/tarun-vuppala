"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { NetworkAnimation } from "./network-animation"
import { TypewriterText } from "./typewriter-text"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Animation */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <NetworkAnimation />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">Available for opportunities</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Tarun Vuppala
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-white/80 mb-4 h-16">
            <TypewriterText
              texts={[
                "Architecting Systems That Solve & Scale",
                "Building Tomorrow's Web Experiences",
                "Crafting Code That Matters",
              ]}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            I'm a web developer who blends precision with creativity to build impactful solutions. From concept to
            deployment, I craft systems that are efficient today and adaptable tomorrow.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Explore My Work
            <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full backdrop-blur-sm bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let's Connect
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
