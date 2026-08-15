import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import SectionIndex from "@/components/section-index"

export default function HomePage() {
  return (
    <div className="min-h-dvh w-full text-foreground">
      <Navigation />
      <SectionIndex />
      <main id="main-content">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
