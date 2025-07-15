"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div ref={containerRef} className="relative bg-background text-foreground overflow-x-hidden">
        <Navigation />

        {/* Animated background */}
        <motion.div
          className="fixed inset-0 bg-linear-to-br from-background via-background/95 to-background -z-10"
        />

        <main className="relative">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
