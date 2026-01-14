"use client"

import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { useRef } from "react"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div ref={containerRef} className="min-h-dvh w-full bg-background text-foreground">

          <Navigation />

          <div className="fixed inset-0 bg-background -z-10" />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
