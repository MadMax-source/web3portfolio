'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Layers, Zap, BarChart3 } from 'lucide-react'

const projects = [
  {
    id: '01',
    title: 'DeFi Protocol Launch',
    category: 'Token Launch · Community',
    description:
      'Led the full go-to-market for a DeFi lending protocol — from tokenomics narrative to IDO. Grew community from 0 to 45K in 60 days.',
    results: ['45K community members', '$12M raised', '#1 trending on CoinGecko'],
    icon: Zap,
    accent: 'from-primary/20 to-transparent',
    href: '/projects',
  },
  {
    id: '02',
    title: 'SaaS Growth Campaign',
    category: 'Product Marketing · SEO',
    description:
      'Built end-to-end demand generation for a B2B SaaS tool. Revamped messaging, launched paid campaigns, and redesigned the conversion funnel.',
    results: ['380% increase in MRR', '2.1x lower CAC', '60K organic sessions/mo'],
    icon: BarChart3,
    accent: 'from-accent/20 to-transparent',
    href: '/projects',
  },
  {
    id: '03',
    title: 'NFT Ecosystem Marketing',
    category: 'NFT · Community · PR',
    description:
      'Drove NFT collection awareness through influencer seeding, Twitter spaces, and a coordinated PR blitz across major crypto media outlets.',
    results: ['Sold out in 48 hours', '8M Twitter impressions', '15 media features'],
    icon: Layers,
    accent: 'from-primary/15 to-transparent',
    href: '/projects',
  },
]

export default function FeaturedProjects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
              — Selected Work
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 group"
          >
            View all projects
            <ArrowUpRight size={16} className="group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Link href={project.href} className="group block">
                  <div className="relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden p-7">
                    {/* BG gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative flex flex-col lg:flex-row gap-6">
                      {/* Left */}
                      <div className="flex items-start gap-5 lg:w-1/2">
                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                          <span className="font-mono text-primary/40 text-xs">{project.id}</span>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                            <Icon size={18} className="text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="text-primary/60 font-mono text-xs mb-1">{project.category}</p>
                          <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                        </div>
                      </div>

                      {/* Right — results */}
                      <div className="lg:w-1/2 lg:pl-8 lg:border-l border-border flex flex-col justify-center gap-3">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Key Results</p>
                        <ul className="flex flex-col gap-2">
                          {project.results.map((r) => (
                            <li key={r} className="flex items-center gap-2 text-sm text-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Arrow */}
                      <ArrowUpRight
                        size={20}
                        className="absolute top-5 right-5 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110 transition-all duration-200"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
