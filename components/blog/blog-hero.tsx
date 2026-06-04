'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Rss } from 'lucide-react'

export default function BlogHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-16 overflow-hidden hero-gradient grid-bg"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/10 backdrop-blur-sm">
            <Rss size={13} className="text-primary" />
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              Thoughts & Insights
            </span>
          </div>

          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-tight text-balance">
            The Web3 &amp;{' '}
            <span className="text-primary glow-text">Marketing</span> Blog
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed text-balance">
            Deep dives into token launches, growth strategies, community building,
            and the intersection of Web3 and modern marketing — written from the trenches.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-2">
            {[
              { icon: BookOpen, label: '24 Articles' },
              { icon: Rss, label: 'Weekly posts' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={14} className="text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
