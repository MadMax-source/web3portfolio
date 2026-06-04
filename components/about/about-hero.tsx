'use client';

import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Briefcase } from 'lucide-react';

const meta = [
  { icon: MapPin, label: 'Remote — Worldwide' },
  { icon: Briefcase, label: 'Blockchain • AI • Security' },
  { icon: CalendarDays, label: 'Available for Projects' },
];

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden grid-bg">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* Floating glow */}
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.76 0.22 200)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-mono text-sm tracking-widest uppercase"
            >
              — About Me
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl font-extrabold text-balance leading-tight"
            >
              Engineer. Marketer. <span className="text-primary glow-text">Cryptosis.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              I&apos;m Cryptosis — a Software Engineer, Blockchain Developer, Ethical Hacker, and AI
              & Web3 Marketer.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed"
            >
              I build secure software, blockchain solutions, and AI-powered products while helping
              startups and Web3 projects scale through technology, security, and growth-focused
              marketing.
            </motion.p>

            {/* Meta chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {meta.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-muted-foreground text-sm"
                >
                  <Icon size={14} className="text-primary flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — identity card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative float-anim">
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-2xl"
                style={{
                  background: 'oklch(0.76 0.22 200)',
                  transform: 'scale(1.15)',
                }}
              />

              {/* Card */}
              <div className="relative w-72 sm:w-80 rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden glow-cyan">
                <div className="absolute inset-0 grid-bg opacity-30" />

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-primary/40 rounded-tl-md" />
                <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-primary/40 rounded-tr-md" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-primary/40 rounded-bl-md" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-primary/40 rounded-br-md" />

                {/* Avatar area */}
                <div className="relative h-52 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                      <path
                        d="M20 4L36 13V27L20 36L4 27V13L20 4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-primary"
                      />
                      <path
                        d="M20 10L30 16V24L20 30L10 24V16L20 10Z"
                        fill="currentColor"
                        fillOpacity="0.2"
                        className="text-primary"
                      />
                      <circle cx="20" cy="20" r="4" fill="currentColor" className="text-primary" />
                    </svg>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Open to work
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="relative px-6 pb-6 flex flex-col gap-1 text-center">
                  <p className="font-heading font-bold text-xl text-foreground">Cryptosis</p>

                  <p className="text-muted-foreground text-sm font-mono">
                    Software Engineer • Blockchain Developer
                  </p>

                  <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
                    {[
                      { value: '20+', label: 'Projects' },
                      { value: '4', label: 'Domains' },
                      { value: '24/7', label: 'Builder' },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="font-heading font-bold text-primary text-lg">{stat.value}</p>
                        <p className="text-muted-foreground text-xs">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
