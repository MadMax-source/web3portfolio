'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      {/* Grid texture */}
      <div className="grid-bg absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance leading-tight mb-6"
        >
          Let&apos;s{' '}
          <span className="text-primary glow-text">Build Together</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Got a Web3 project to launch, a community to grow, or a SaaS to scale?
          Drop me a message and I&apos;ll get back to you within 24 hours.
        </motion.p>
      </div>
    </section>
  )
}
