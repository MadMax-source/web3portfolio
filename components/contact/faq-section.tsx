'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What does your typical onboarding process look like?',
    a: "We start with a 30-minute discovery call to understand your project, goals, and timeline. I'll then put together a tailored strategy deck and proposal within 48 hours. Once aligned, we kick off with a sprint-based roadmap.",
  },
  {
    q: 'Do you work with early-stage projects or only established protocols?',
    a: 'Both. I work with projects at every stage — from pre-launch token builds and NFT drops to established DeFi protocols looking to expand their community and market presence.',
  },
  {
    q: 'What is your typical project turnaround time?',
    a: 'Campaigns and strategy decks are usually ready within 5–7 business days. Community builds and ongoing growth retainers are structured in 30-day sprints so you see measurable results quickly.',
  },
  {
    q: 'How do you measure and report on marketing results?',
    a: 'Every engagement includes a custom KPI dashboard covering on-chain metrics, community growth, social reach, and conversion funnels. Weekly check-ins keep you in the loop at all times.',
  },
  {
    q: 'Do you offer retainer or project-based pricing?',
    a: "Yes — both. Short campaigns and one-off launches are project-based. Ongoing growth, community management, and PR are available as monthly retainers. We'll find the model that fits your budget and goals.",
  },
  {
    q: 'Can you work with my existing team or agency?',
    a: "Absolutely. I've embedded with in-house teams and co-led campaigns alongside other agencies many times. Collaboration is always welcome — the goal is great results, not solo credit.",
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground leading-snug">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
          open ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground'
        }`}>
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4">
            FAQ
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-balance leading-tight mb-4">
            Common{' '}
            <span className="text-primary glow-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before we start working together.
          </p>
        </motion.div>

        {inView && (
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
