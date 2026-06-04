import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProjectsHero from '@/components/projects/projects-hero'
import ProjectsGrid from '@/components/projects/projects-grid'
import ProcessSection from '@/components/projects/process-section'
import CtaSection from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Projects — Software & Web3 Marketer Portfolio',
  description:
    'Explore campaigns, token launches, SaaS growth initiatives, and community builds that delivered measurable results across Web3 and software ecosystems.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProjectsHero />
      <ProjectsGrid />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
