"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles, Star } from "lucide-react"
import { skillsByDomain as skills } from "@/lib/data";

export default function SkillsSection() {
  const [mounted, setMounted] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isInView = true

  if (!mounted) {
    return (
      <div style={{ backgroundColor: "#0a0a0a", padding: "60px 20px", minHeight: "600px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", color: "white" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>Loading Skills...</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "40px",
                  width: "120px",
                  backgroundColor: "#333",
                  borderRadius: "20px",
                  animation: `pulse ${1 + (i % 3) * 0.2}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            box-shadow: 0 0 25px currentColor, 0 0 35px currentColor;
          }
        }
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          padding: "60px 20px",
          minHeight: "600px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Animated Background Elements */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "10%",
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle, #3B82F615, transparent)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "15%",
              width: "120px",
              height: "120px",
              background: "radial-gradient(circle, #8B5CF615, transparent)",
              borderRadius: "50%",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
          <Sparkles
            style={{
              position: "absolute",
              top: "25%",
              right: "20%",
              width: "24px",
              height: "24px",
              color: "#3B82F6",
              animation: "sparkle 3s ease-in-out infinite",
            }}
          />
          <Sparkles
            style={{
              position: "absolute",
              bottom: "30%",
              left: "25%",
              width: "20px",
              height: "20px",
              color: "#8B5CF6",
              animation: "sparkle 4s ease-in-out infinite 1s",
            }}
          />
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "200px" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8"
            />
            <motion.h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #ffffff, #3B82F6, #8B5CF6, #10B981)",
                backgroundSize: "300% 300%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "white",
                marginBottom: "20px",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Tech Stack & {" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Expertise
              </motion.span>
            </motion.h2>
            <motion.p
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                marginBottom: "24px",
                maxWidth: "600px",
                margin: "0 auto 24px",
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Technologies I'm passionate about
            </motion.p>
          </motion.div>

          {/* Categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
            {skills.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -100 : 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: categoryIndex % 2 === 0 ? -100 : 100 }}
                transition={{
                  delay: categoryIndex * 0.3,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                  <motion.div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "15px",
                      background: category.bgGradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 8px 25px ${category.color}40`,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      boxShadow: `0 12px 35px ${category.color}60`,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <category.icon style={{ width: "24px", height: "24px", color: "white" }} />
                  </motion.div>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#FFFFFF", margin: 0 }}>
                      {category.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#CCCCCC", margin: 0 }}>
                      {category.skills.length} technologies
                    </p>
                  </div>
                  <motion.div
                    style={{
                      flex: 1,
                      height: "3px",
                      background: `linear-gradient(90deg, ${category.color}80, ${category.color}20, transparent)`,
                      borderRadius: "2px",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: categoryIndex * 0.3 + 0.5, duration: 1 }}
                  />
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.button
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.5, y: 30 }}
                      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
                      transition={{
                        delay: categoryIndex * 0.3 + skillIndex * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 18px",
                        borderRadius: "30px",
                        fontSize: "15px",
                        fontWeight: "600",
                        height: "",
                        border: `2px solid #ADD8E6`,
                        backgroundColor: `#ADD8E620`,
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow:
                          hoveredSkill === skill.name
                            ? `0 12px 30px #ADD8E650, 0 0 0 2px #ADD8E630`
                            : `0 4px 15px #ADD8E620`,
                        animation:
                          hoveredSkill === skill.name
                            ? "glow 1.5s ease-in-out"
                            : "none",
                      }}
                    >
                      {/* Animated background */}
                      <motion.div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, #ADD8E620, #ADD8E605)`,
                          opacity: 0,
                        }}
                        animate={{
                          opacity: hoveredSkill === skill.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        style={{
                          width: "22px",
                          height: "22px",
                          objectFit: "contain",
                          zIndex: 1,
                          filter: "none",
                        }}
                        animate={{
                          rotate: hoveredSkill === skill.name ? [0, -15, 15, 0] : 0,
                          scale: hoveredSkill === skill.name ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=22&width=22"
                        }}
                      />
                      <span style={{ zIndex: 1 }}>{skill.name}</span>
                      <motion.div
                        style={{ zIndex: 1 }}
                        animate={{
                          opacity: hoveredSkill === skill.name ? 1 : 0,
                          x: hoveredSkill === skill.name ? 0 : -10,
                          rotate: hoveredSkill === skill.name ? 360 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              textAlign: "center",
              marginTop: "80px",
              paddingTop: "50px",
              borderTop: "1px solid #374151",
            }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Always Learning & Growing</span>
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
