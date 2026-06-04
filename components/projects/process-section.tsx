'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Lightbulb, Rocket, BarChart2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Audit',
    description:
      'Deep-dive into your product, market positioning, competitors, and existing channels. Build a clear picture of where you stand and where the opportunities are.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy & Narrative',
    description:
      'Craft a compelling brand narrative and go-to-market plan tailored to your audience — whether that\'s crypto natives, enterprise buyers, or retail consumers.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Execution & Launch',
    description:
      'Execute across every channel: content, paid media, influencer seeding, PR, community activation. Everything coordinated, nothing left to chance.',
  },
  {
    number: '04',
    icon: BarChart2,
    title: 'Measure & Scale',
    description:
      'Track what matters — onchain metrics, CAC, LTV, engagement rates. Double down on what works and iterate fast to compound growth over time.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            — How I Work
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            The Process
          </h2>
          <p className="text-muted-foreground text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Every engagement follows a proven framework built to deliver measurable outcomes — not just activity.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connector line (desktop) */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 hidden lg:block pointer-events-none" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group"
              >
                {/* Step card */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-full group-hover:border-primary/30 transition-all duration-300">
                  {/* Icon with number */}
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="font-mono text-3xl font-bold text-primary/15 group-hover:text-primary/25 transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
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
