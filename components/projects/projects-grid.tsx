'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Zap, BarChart3, Layers, Globe, Users, TrendingUp, Megaphone, Code2 } from 'lucide-react'

const categories = ['All', 'Web3', 'SaaS', 'DeFi', 'NFT', 'Community']

const projects = [
  {
    id: '01',
    title: 'DeFi Protocol Launch',
    category: 'DeFi',
    tags: ['Web3', 'DeFi', 'Community'],
    description:
      'Led full go-to-market for a DeFi lending protocol — from tokenomics narrative to IDO. Built community from zero, coordinated influencer campaigns, and drove $12M in fundraising.',
    results: ['45K community members in 60 days', '$12M raised at IDO', '#1 trending on CoinGecko', '3x oversubscribed launchpad'],
    icon: Zap,
    size: 'large',
  },
  {
    id: '02',
    title: 'SaaS Growth Campaign',
    category: 'SaaS',
    tags: ['SaaS', 'Growth'],
    description:
      'End-to-end demand generation for a B2B SaaS platform. Revamped positioning, rebuilt the conversion funnel, and launched multi-channel paid acquisition.',
    results: ['380% MRR growth in 6 months', '2.1x lower customer acquisition cost', '60K organic sessions/month'],
    icon: BarChart3,
    size: 'medium',
  },
  {
    id: '03',
    title: 'NFT Ecosystem Campaign',
    category: 'NFT',
    tags: ['NFT', 'Web3', 'Community'],
    description:
      'Drove NFT collection awareness through targeted influencer seeding, Twitter Spaces, and a coordinated PR blitz across major crypto media.',
    results: ['Sold out in 48 hours', '8M Twitter impressions', '15 tier-1 media features'],
    icon: Layers,
    size: 'medium',
  },
  {
    id: '04',
    title: 'Web3 Community Building',
    category: 'Community',
    tags: ['Community', 'Web3'],
    description:
      'Built and scaled a DAO community from the ground up — moderation structure, ambassador programs, weekly governance participation, and retention systems.',
    results: ['28K Discord members', '42% weekly active rate', 'DAO governance launched'],
    icon: Users,
    size: 'medium',
  },
  {
    id: '05',
    title: 'Token Launch Strategy',
    category: 'Web3',
    tags: ['Web3', 'DeFi'],
    description:
      'Designed and executed the full token launch playbook: exchange listings coordination, KOL seeding, narrative positioning, and post-launch community momentum.',
    results: ['Listed on 3 tier-1 CEXes', '2.4x listing day volume target', '18K holders in week one'],
    icon: TrendingUp,
    size: 'medium',
  },
  {
    id: '06',
    title: 'SaaS Content & SEO Engine',
    category: 'SaaS',
    tags: ['SaaS'],
    description:
      'Built a content marketing machine for a developer-tools SaaS — topic clusters, programmatic SEO, and a technical blog that became the top acquisition channel.',
    results: ['120K monthly organic visits', '35% of pipeline from content', 'Domain authority 58'],
    icon: Code2,
    size: 'medium',
  },
  {
    id: '07',
    title: 'Crypto Media & PR',
    category: 'Web3',
    tags: ['Web3'],
    description:
      'Managed communications for a layer-2 blockchain project — press releases, media relationships, crisis communications, and a sustained narrative strategy.',
    results: ['180+ media mentions', 'Coverage in CoinDesk, Decrypt, The Block', 'Brand sentiment +62%'],
    icon: Megaphone,
    size: 'medium',
  },
  {
    id: '08',
    title: 'Global Web3 Growth',
    category: 'Community',
    tags: ['Web3', 'Community'],
    description:
      'Launched localised growth campaigns across 6 regions for a cross-chain bridge protocol — regional ambassadors, translated content, and market-specific KOL partnerships.',
    results: ['Active in 6 markets', '2.1M total reach', '31% new-region user growth'],
    icon: Globe,
    size: 'medium',
  },
]

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-xs text-muted-foreground">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => {
              const Icon = project.icon
              const isLarge = project.size === 'large'
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col ${
                    isLarge ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* Top accent bar */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 flex-shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <span className="font-mono text-primary/50 text-xs">{project.id}</span>
                          <p className="text-xs text-muted-foreground">{project.category}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-muted-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all duration-200 mt-1 flex-shrink-0"
                      />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="mt-auto pt-4 border-t border-border/60">
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                        Key Results
                      </p>
                      <ul className={`grid gap-1.5 ${isLarge ? 'sm:grid-cols-2' : ''}`}>
                        {project.results.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
