"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Text } from "@react-three/drei"

interface TechItem {
  name: string
  category: string
  color: string
  description: string
}

const techStack: TechItem[] = [
  { name: "React", category: "Frontend", color: "#61dafb", description: "Building interactive UIs" },
  { name: "Next.js", category: "Frontend", color: "#000000", description: "Full-stack React framework" },
  { name: "TypeScript", category: "Language", color: "#3178c6", description: "Type-safe JavaScript" },
  { name: "Node.js", category: "Backend", color: "#339933", description: "Server-side JavaScript" },
  { name: "MongoDB", category: "Database", color: "#47a248", description: "NoSQL database" },
  { name: "PostgreSQL", category: "Database", color: "#336791", description: "Relational database" },
  { name: "Python", category: "Language", color: "#3776ab", description: "Versatile programming" },
  { name: "Java", category: "Language", color: "#ed8b00", description: "Enterprise development" },
  { name: "Three.js", category: "Animation", color: "#000000", description: "3D graphics library" },
  { name: "GSAP", category: "Animation", color: "#88ce02", description: "Advanced animations" },
  { name: "Framer Motion", category: "Animation", color: "#0055ff", description: "React animations" },
  { name: "Tailwind", category: "Styling", color: "#06b6d4", description: "Utility-first CSS" },
]

function TechCube({
  tech,
  position,
  isHovered,
  onHover,
}: {
  tech: TechItem
  position: [number, number, number]
  isHovered: boolean
  onHover: (tech: TechItem | null) => void
}) {
  return (
    <mesh
      position={position}
      onPointerEnter={() => onHover(tech)}
      onPointerLeave={() => onHover(null)}
      rotation={[0, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovered ? tech.color : "#374151"} transparent opacity={isHovered ? 0.8 : 0.6} />
      <Text position={[0, 0, 0.51]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {tech.name}
      </Text>
    </mesh>
  )
}

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)

  const categories = ["Frontend", "Backend", "Database", "Language", "Animation", "Styling"]

  return (
    <section id="tech" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tech Stack & Skills</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            These are my tools for turning ideas into reality. Hover to explore each technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Tech Grid */}
          <div className="h-96 relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />

              {techStack.map((tech, index) => {
                const row = Math.floor(index / 4)
                const col = index % 4
                const position: [number, number, number] = [(col - 1.5) * 1.5, (1.5 - row) * 1.5, 0]

                return (
                  <TechCube
                    key={tech.name}
                    tech={tech}
                    position={position}
                    isHovered={hoveredTech?.name === tech.name}
                    onHover={setHoveredTech}
                  />
                )
              })}
            </Canvas>
          </div>

          {/* Tech Details */}
          <div className="space-y-8">
            {hoveredTech ? (
              <motion.div
                key={hoveredTech.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hoveredTech.color }} />
                  <h3 className="text-2xl font-bold text-white">{hoveredTech.name}</h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    {hoveredTech.category}
                  </span>
                </div>
                <p className="text-white/80 text-lg">{hoveredTech.description}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Hover over a technology to learn more</h3>
                <p className="text-white/60">
                  Each tool in my stack serves a specific purpose in creating robust, scalable applications. From
                  frontend frameworks to backend services, I choose technologies that complement each other perfectly.
                </p>
              </motion.div>
            )}

            {/* Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
                >
                  <h4 className="text-white font-medium">{category}</h4>
                  <p className="text-white/60 text-sm mt-1">
                    {techStack.filter((tech) => tech.category === category).length} tools
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
