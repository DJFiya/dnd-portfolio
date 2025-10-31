import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import portfolioData from "@/data/portfolio.json"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection data={portfolioData.hero} />
      <AboutSection data={portfolioData.about} />
      <ExperienceSection data={portfolioData.experience} />
      <ProjectsSection data={portfolioData.projects} />
      <SkillsSection data={portfolioData.skills} />
      <ContactSection data={portfolioData.contact} />
    </main>
  )
}
