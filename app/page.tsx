import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import ServicesSection from '@/components/services-section';
import TestimonialsSection from '@/components/testimonials-section';
import CTASection from '@/components/cta-section';
import Footer from '@/components/footer';
import ProjectsSection from '@/components/services-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      {/*
      <FeaturedProjects />
      
      */}
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
