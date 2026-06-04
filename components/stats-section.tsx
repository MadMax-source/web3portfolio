'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', sub: 'Across Web2 & Web3' },
  { value: 380, suffix: '%', label: 'Avg. Campaign ROI', sub: 'Measured & proven' },
  { value: 12, suffix: '+', label: 'Ecosystems Launched', sub: 'DeFi, NFT, SaaS' },
  { value: 3, suffix: 'M+', label: 'Community Members', sub: 'Total reach built' },
]

function CountingNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, { duration: 1.8, ease: 'easeOut' })
    }
  }, [inView, motionValue, value])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-20">
      {/* Full-width banner */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-card p-1 glow-cyan">
          {/* Inner bg */}
          <div className="relative rounded-2xl bg-background/60 backdrop-blur-sm grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-10 px-6 text-center gap-1"
              >
                <span className="font-heading text-4xl sm:text-5xl font-extrabold text-primary glow-text">
                  <CountingNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-semibold text-foreground text-base mt-1">{stat.label}</span>
                <span className="text-muted-foreground text-xs font-mono">{stat.sub}</span>
              </motion.div>
            ))}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-primary/5 rounded-tl-full pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
