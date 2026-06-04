'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/25 bg-card overflow-hidden p-10 sm:p-14 text-center glow-cyan"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.76 0.22 200), transparent)',
            }}
          />

          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />

          <div className="relative flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to collaborations
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-balance leading-tight">
              Ready to grow your{' '}
              <span className="text-primary glow-text">Web3 product?</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you&apos;re launching a token, scaling a SaaS, or building a community —
              let&apos;s craft a strategy that actually works.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-200 glow-cyan group"
              >
                <Mail size={16} />
                Start a Conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border bg-background text-foreground font-semibold hover:border-primary/40 transition-all duration-200"
              >
                See My Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
