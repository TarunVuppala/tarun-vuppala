"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Tech icons as SVG components
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C19.777 4.249 16.569.346 12.153.033a19.555 19.555 0 0 0-.364-.033C11.741.001 11.607 0 11.572 0z" />
  </svg>
)

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
  </svg>
)

interface TechItem {
  name: string
  category: string
  icon: React.ComponentType
  description: string
}

const techStack: TechItem[] = [
  { name: "React", category: "Frontend", icon: ReactIcon, description: "Building interactive UIs" },
  { name: "Next.js", category: "Frontend", icon: NextIcon, description: "Full-stack React framework" },
  { name: "TypeScript", category: "Language", icon: TypeScriptIcon, description: "Type-safe JavaScript" },
  { name: "Node.js", category: "Backend", icon: NodeIcon, description: "Server-side JavaScript" },
  {
    name: "MongoDB",
    category: "Database",
    icon: () => <div className="w-8 h-8 bg-green-500 rounded" />,
    description: "NoSQL database",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: () => <div className="w-8 h-8 bg-blue-500 rounded" />,
    description: "Relational database",
  },
  {
    name: "Python",
    category: "Language",
    icon: () => <div className="w-8 h-8 bg-yellow-500 rounded" />,
    description: "Versatile programming",
  },
  {
    name: "Java",
    category: "Language",
    icon: () => <div className="w-8 h-8 bg-orange-500 rounded" />,
    description: "Enterprise development",
  },
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
      <meshStandardMaterial color={isHovered ? "#ffffff" : "#374151"} transparent opacity={isHovered ? 0.9 : 0.7} />
      <Text position={[0, 0, 0.51]} fontSize={0.12} color="#000000" anchorX="center" anchorY="middle">
        {tech.name}
      </Text>
    </mesh>
  )
}

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const categories = ["Frontend", "Backend", "Database", "Language"]

  return (
    <section id="tech" ref={containerRef} className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tech Stack & Skills</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to build scalable, performant applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Tech Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 relative"
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />

              {techStack.map((tech, index) => {
                const row = Math.floor(index / 4)
                const col = index % 4
                const position: [number, number, number] = [(col - 1.5) * 1.8, (1.5 - row) * 1.8, 0]

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
          </motion.div>

          {/* Tech Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {hoveredTech ? (
              <motion.div
                key={hoveredTech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <hoveredTech.icon />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{hoveredTech.name}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {hoveredTech.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg">{hoveredTech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Hover over a technology to learn more</h3>
                  <p className="text-muted-foreground">
                    Each tool in my stack serves a specific purpose in creating robust, scalable applications. From
                    frontend frameworks to backend services, I choose technologies that complement each other perfectly.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tech Icons Grid */}
            <div className="grid grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => setHoveredTech(tech)}
                  onHoverEnd={() => setHoveredTech(null)}
                  className="cursor-pointer"
                >
                  <Card
                    className={`border-border/50 hover:border-border transition-all duration-300 ${
                      hoveredTech?.name === tech.name ? "border-primary" : ""
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <tech.icon />
                      </div>
                      <p className="text-sm font-medium">{tech.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="border-border/50 text-center">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-1">{category}</h4>
                      <p className="text-muted-foreground text-sm">
                        {techStack.filter((tech) => tech.category === category).length} tools
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
