import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContentContainer from "@/components/layout/container"
import ProjectsArchive from "@/components/projects-archive"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Navigation />

      <main id="main-content" className="pb-14 pt-[calc(var(--nav-height,72px)+1.5rem)]">
        <ContentContainer>
          <ProjectsArchive />
        </ContentContainer>
      </main>

      <Footer />
    </div>
  )
}
