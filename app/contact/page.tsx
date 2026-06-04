import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactHero from '@/components/contact/contact-hero'
import ContactForm from '@/components/contact/contact-form'
import ContactInfo from '@/components/contact/contact-info'
import FAQSection from '@/components/contact/faq-section'

export const metadata: Metadata = {
  title: 'Contact — Alex Morgan | Web3 & Software Marketer',
  description:
    'Get in touch to discuss your Web3 project, token launch, community build, or SaaS growth strategy.',
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <ContactHero />

      {/* Form + Info grid */}
      <section className="py-8 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <FAQSection />

      <Footer />
    </main>
  )
}
