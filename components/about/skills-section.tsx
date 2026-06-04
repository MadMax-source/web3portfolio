'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillGroups = [
  {
    category: 'Web3 Development',
    skills: [
      { name: 'Solana Development', level: 95 },
      { name: 'Smart Contract Development', level: 92 },
      { name: 'Web3 Integrations', level: 90 },
      { name: 'Token Infrastructure', level: 88 },
      { name: 'DeFi Applications', level: 85 },
    ],
  },
  {
    category: 'AI & Software Engineering',
    skills: [
      { name: 'Next.js & React', level: 95 },
      { name: 'TypeScript', level: 93 },
      { name: 'Node.js & APIs', level: 90 },
      { name: 'Database Architecture', level: 88 },
      { name: 'AI Integrations & Automation', level: 87 },
    ],
  },
  {
    category: 'Security & Web3 Marketing',
    skills: [
      { name: 'Ethical Hacking', level: 90 },
      { name: 'Security Auditing', level: 86 },
      { name: 'Web3 Marketing', level: 92 },
      { name: 'Community Growth', level: 88 },
      { name: 'Token Launch Strategy', level: 85 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-primary">{level}%</span>
      </div>

      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-primary glow-cyan"
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            — Technical Expertise
          </p>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.15 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <span className="w-1.5 h-4 rounded-full bg-primary" />

                <h3 className="font-heading font-bold text-sm text-foreground uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={gi * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools & Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-6 rounded-2xl border border-border bg-card"
        >
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
            Tools & Platforms
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              'Solana',
              'Ethereum',
              'Web3.js',
              'Ethers.js',
              'Next.js',
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'PostgreSQL',
              'MongoDB',
              'Supabase',
              'Redis',
              'Docker',
              'Git',
              'Linux',
              'OpenAI',
              'Claude',
              'Cursor',
              'Burp Suite',
              'Nmap',
              'Wireshark',
              'Metasploit',
              'Dune',
              'Birdeye',
              'DexScreener',
              'Discord',
              'Telegram',
              'Twitter / X',
              'Google Analytics',
              'Figma',
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-md border border-border bg-secondary text-muted-foreground text-xs font-mono hover:border-primary/40 hover:text-foreground transition-colors duration-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
