'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Shield, Code2 } from 'lucide-react';

const projects = [
  {
    icon: Rocket,
    title: 'Layer-2 Token Incentive Engine',
    description:
      'Dynamic token reward system that adjusts incentives based on on-chain behavior and liquidity depth.',
    image: '/projects/l2-incentive.png',
    stack: ['Solidity', 'EVM Analytics', 'Tokenomics Engine'],
  },
  {
    icon: Shield,
    title: 'DeFi Wallet Behavior Analyzer',
    description:
      'Security-focused analytics system that classifies wallets based on transaction patterns and risk signals.',
    image: '/projects/wallet-analyzer.png',
    stack: ['On-chain Data', 'Risk Scoring', 'DeFi Security'],
  },
  {
    icon: Code2,
    title: 'AI Growth Automation Pipeline',
    description:
      'AI-driven system for automating content, engagement triggers, and distribution for Web3 ecosystems.',
    image: '/projects/ai-pipeline.png',
    stack: ['AI Agents', 'Automation', 'Growth Systems'],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="projects">
      {/* background glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none bg-primary" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            — Selected Work
          </p>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold">Recent Projects</h2>

          <p className="text-muted-foreground text-lg mt-4 max-w-xl leading-relaxed">
            A selection of systems I’ve built across Web3 infrastructure, AI automation, and
            security analytics.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                {/* IMAGE SECTION */}
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* floating icon */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* title */}
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono rounded-md border border-primary/15 bg-primary/10 text-primary/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-2.5 rounded-xl border border-primary/20 bg-card hover:bg-primary/10 hover:border-primary/40 transition text-sm font-mono text-primary">
            View More Projects →
          </button>
        </div>
      </div>
    </section>
  );
}
/*

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Megaphone, Code2, Rocket, Users, LineChart, Shield } from 'lucide-react'

const services = [
  {
    icon: Rocket,
    title: 'Token Launch Strategy',
    description:
      'Full go-to-market for token launches — tokenomics narrative, IDO campaigns, exchange listings, and community bootstrapping.',
    tags: ['IDO', 'Tokenomics', 'Listings'],
  },
  {
    icon: Users,
    title: 'Community Building',
    description:
      'Growing Telegram, Discord, and Twitter communities from scratch with organic engagement and ambassador programs.',
    tags: ['Discord', 'Telegram', 'Twitter'],
  },
  {
    icon: Megaphone,
    title: 'Web3 Content & PR',
    description:
      'Thought leadership articles, press releases, AMA sessions, and KOL partnerships that build credibility in the crypto space.',
    tags: ['PR', 'KOL', 'Content'],
  },
  {
    icon: LineChart,
    title: 'Growth Marketing',
    description:
      'Data-driven paid ads, SEO, and funnel optimization for SaaS and Web3 products. Focus on CAC, LTV, and sustainable growth.',
    tags: ['Paid Ads', 'SEO', 'Funnels'],
  },
  {
    icon: Code2,
    title: 'Software Product Marketing',
    description:
      'Positioning, messaging, and demand generation for B2B and B2C software — from landing pages to full launch campaigns.',
    tags: ['SaaS', 'B2B', 'GTM'],
  },
  {
    icon: Shield,
    title: 'DeFi & NFT Marketing',
    description:
      'Protocol marketing, liquidity campaigns, NFT mint strategies, and ecosystem partnerships in the DeFi and NFT space.',
    tags: ['DeFi', 'NFT', 'Protocol'],
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="services">
      
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.76 0.22 200)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            — What I Do
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            Services & Expertise
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl leading-relaxed">
            From strategy to execution — I bring both the marketing mindset and
            technical understanding to grow your product.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
              >
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/50 rounded-tr-md" />
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg leading-tight pt-1">
                    {service.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs font-mono text-primary/70 bg-primary/10 border border-primary/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



*/
