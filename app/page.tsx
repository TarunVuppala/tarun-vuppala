import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
import WorkInterludeSection from "@/components/sections/work-interlude-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-dvh w-full text-foreground">
      <Navigation />
      <HeroSection />
      <WorkInterludeSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
