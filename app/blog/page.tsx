import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import BlogHero from '@/components/blog/blog-hero'
import BlogGrid from '@/components/blog/blog-grid'
import NewsletterCta from '@/components/blog/newsletter-cta'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog — Web3 & Marketing Insights | Alex',
  description:
    'Deep dives into token launches, community building, DeFi go-to-market, and modern growth marketing from a Web3 specialist.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <BlogHero />
      <BlogGrid />
      <NewsletterCta />
      <Footer />
    </main>
  )
}
