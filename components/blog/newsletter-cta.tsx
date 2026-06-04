'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'

export default function NewsletterCta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-sm p-10 md:p-14 overflow-hidden text-center"
        >
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-lg" />

          <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6 glow-cyan">
            <Mail size={22} className="text-primary" />
          </div>

          <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-3 text-balance">
            Get Web3 Marketing Insights
            <span className="text-primary"> Weekly</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            No fluff, no spam. Just actionable strategies on token launches, community growth,
            and Web3 go-to-market — delivered every Thursday.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold"
            >
              <CheckCircle size={18} />
              You&apos;re subscribed! Check your inbox.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all duration-200 glow-cyan whitespace-nowrap"
              >
                {loading ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4 opacity-70">
            Join 1,200+ founders, marketers &amp; builders. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
