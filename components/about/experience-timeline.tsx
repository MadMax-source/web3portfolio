'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, TrendingUp, Cpu, Code } from 'lucide-react';

const experiences = [
  {
    period: '2022 — Present',
    role: 'Web3 Systems & Growth Engineer',
    company: 'StarkChain Labs',
    type: 'Web3',
    focus: ['Protocol Engineering', 'Token Systems', 'On-chain Analytics'],
    stack: ['EVM tools', 'on-chain data pipelines', 'incentive modeling'],
    description:
      'Designing and optimizing protocol-level systems across a Layer-2 ecosystem — focusing on token mechanics, on-chain behavior analysis, and scalable user systems.',
    highlights: [
      'Improved protocol TVL efficiency from $2M → $48M via incentive restructuring',
      'Built data-driven wallet segmentation system for on-chain behavior tracking',
      'Designed 3 token emission models with controlled liquidity impact',
    ],
  },

  {
    period: '2020 — 2022',
    role: 'Smart Contract & Ecosystem Operator',
    company: 'NexusDAO',
    type: 'DeFi',
    focus: ['DAO Infrastructure', 'Contract Coordination', 'Launch Systems'],
    stack: ['Solidity interaction workflows', 'DAO tooling', 'DeFi analytics'],
    description:
      'Worked across DAO operations and smart contract-driven ecosystems, coordinating protocol launches, governance systems, and liquidity deployment strategies.',
    highlights: [
      'Supported $12M protocol launch with structured liquidity deployment',
      'Helped scale governance participation to 45K+ wallets',
      'Coordinated cross-protocol integrations during launch phase',
    ],
  },

  {
    period: '2019 — 2020',
    role: 'Automation & Data Systems Engineer',
    company: 'Orbis SaaS',
    type: 'SaaS',
    focus: ['Backend Systems', 'Conversion Engineering', 'Data Pipelines'],
    stack: ['APIs', 'analytics systems', 'A/B testing frameworks'],
    description:
      'Built systems for tracking, optimizing, and automating user acquisition and conversion flows in a B2B SaaS environment.',
    highlights: [
      'Increased system-wide conversion rate by 380% through funnel redesign',
      'Built analytics pipeline handling 60K+ monthly user events',
      'Reduced acquisition inefficiency by 2.1x through data optimization',
    ],
  },

  {
    period: '2017 — 2019',
    role: 'Independent Systems Builder',
    company: 'Freelance / Web3 Ecosystem',
    type: 'Agency',
    focus: ['Security Thinking', 'Early Web3 Tools', 'Product Experiments'],
    stack: ['web tools', 'growth experiments', 'security mindset'],
    description:
      'Worked across early-stage startups and crypto projects building lightweight systems, launch tools, and growth experiments while developing strong security-oriented thinking.',
    highlights: [
      'Shipped 20+ experimental systems across Web3 and SaaS',
      'Worked across 5 different technical and product domains',
      'Built early exposure to blockchain ecosystems before mainstream adoption',
    ],
  },
];

const typeColors: Record<string, string> = {
  Web3: 'text-primary border-primary/30 bg-primary/10',
  DeFi: 'text-accent border-accent/30 bg-accent/10',
  SaaS: 'text-foreground border-border bg-secondary',
  Agency: 'text-muted-foreground border-border/50 bg-card',
};

const typeIcons: Record<string, any> = {
  Web3: TrendingUp,
  DeFi: Shield,
  SaaS: Cpu,
  Agency: Code,
};

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-xs tracking-widest uppercase mb-3">
            SYSTEM HISTORY
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold">Execution Timeline</h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            A breakdown of growth systems, protocol launches, and product engineering work across
            Web3, SaaS, and early-stage startups.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden sm:block" />

          {experiences.map((exp, i) => {
            const Icon = typeIcons[exp.type];

            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative sm:pl-14 pb-12 last:pb-0"
              >
                {/* Node */}
                <div className="absolute left-0 top-2 w-10 h-10 rounded-full border border-primary/20 bg-card hidden sm:flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 group">
                  {/* Top */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>

                        <span
                          className={`px-2 py-0.5 rounded-md border text-xs font-mono ${typeColors[exp.type]}`}
                        >
                          {exp.type}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm">{exp.company}</p>
                    </div>

                    <span className="font-mono text-xs text-primary/60 bg-primary/5 border border-primary/15 px-3 py-1.5 rounded-lg">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Focus chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.focus.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-1 rounded-full border border-border bg-background text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
