import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AboutHero from '@/components/about/about-hero'
import SkillsSection from '@/components/about/skills-section'
import ExperienceTimeline from '@/components/about/experience-timeline'
import ValuesSection from '@/components/about/values-section'
import CtaSection from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'About — Software & Web3 Marketer',
  description:
    'Learn about Alex Morgan — a software and Web3 marketer with 6+ years of experience building brands, communities, and growth engines across DeFi, NFT, and SaaS ecosystems.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AboutHero />
      <SkillsSection />
      <ExperienceTimeline />
      <ValuesSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
