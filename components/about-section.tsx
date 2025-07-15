"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Code, Coffee, Lightbulb, Rocket } from "lucide-react"

function LaptopModel() {
  return (
    <mesh rotation={[0.1, 0.2, 0]}>
      <boxGeometry args={[2, 0.1, 1.5]} />
      <meshStandardMaterial color="#1f2937" />
      <mesh position={[0, 0.05, -0.3]}>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </mesh>
  )
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const highlights = [
    {
      icon: Code,
      title: "Clean Architecture",
      description: "I obsess over writing maintainable, scalable code that stands the test of time.",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Every challenge is a puzzle waiting to be solved with the right approach.",
    },
    {
      icon: Coffee,
      title: "Late Night Coder",
      description: "My best ideas come during those quiet hours when the world sleeps.",
    },
    {
      icon: Rocket,
      title: "Startup Minded",
      description: "Building towards launching something that makes a real impact.",
    },
  ]

  return (
    <section id="about" ref={containerRef} className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,50 Q25,30 50,50 T100,50 V100 H0 Z",
                "M0,50 Q25,70 50,50 T100,50 V100 H0 Z",
                "M0,50 Q25,30 50,50 T100,50 V100 H0 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div style={{ y, opacity }} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">My Journey</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mb-8" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-white/80 leading-relaxed"
            >
              I'm Tarun, a Computer Science student hooked on web development. It started with late-night coding as a
              beginner, evolved through internships solving real problems, and now drives me to build systems that
              scale.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-white/80 leading-relaxed"
            >
              I dig into every challenge—researching, questioning, testing—until I craft solutions that are efficient
              today and adaptable tomorrow. My goal? Launch a startup that tackles something big, one flawless line of
              code at a time.
            </motion.p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="h-96 relative"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <LaptopModel />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
