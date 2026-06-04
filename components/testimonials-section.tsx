'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Alex delivered a launch campaign that exceeded all our targets. The community they built became the backbone of our protocol. Absolutely exceptional Web3 marketing expertise.',
    author: 'James Okafor',
    role: 'CEO, NexaFi Protocol',
    avatar: 'JO',
  },
  {
    quote:
      'We hired Alex to lead our SaaS growth initiative and within 6 months our MRR tripled. They understand both the product side and the marketing levers perfectly.',
    author: 'Sarah Chen',
    role: 'Founder, BuildStack',
    avatar: 'SC',
  },
  {
    quote:
      'The NFT mint was sold out in 2 days largely because of the coordinated campaign Alex ran. Deep knowledge of crypto culture makes them invaluable in this space.',
    author: 'Marcus Rivera',
    role: 'Creative Director, MetaPix',
    avatar: 'MR',
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.76 0.22 200)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            — Social Proof
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            What Clients Say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <Quote size={28} className="text-primary/30 mb-4" />

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-xs font-mono">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
