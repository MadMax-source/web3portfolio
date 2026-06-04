'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Zap, ShieldCheck, HeartHandshake } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Results First',
    description:
      'I measure success in outcomes, not outputs. Every strategy is tied to metrics that move the business — TVL, MRR, CAC, community health.',
  },
  {
    icon: Zap,
    title: 'Move with Urgency',
    description:
      'In Web3, speed is a competitive advantage. I operate with a bias to action, ship fast, learn from data, and iterate without ego.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity Always',
    description:
      'No vanity metrics, no inflated projections. I give honest assessments, set realistic expectations, and deliver what I promise.',
  },
  {
    icon: HeartHandshake,
    title: 'Genuine Partnerships',
    description:
      'I treat every client engagement as a long-term relationship. Your wins are my wins — I invest in your success as if it were my own.',
  },
]

export default function ValuesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            — Principles
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            What I Stand For
          </h2>
          <p className="text-muted-foreground text-base mt-4 leading-relaxed">
            These are the beliefs that shape how I work with every client, on every project.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((val, i) => {
            const Icon = val.icon
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/30 transition-all duration-300 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0">
                  <Icon size={22} className="text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
