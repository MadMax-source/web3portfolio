'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Globe } from 'lucide-react';

const badges = [
  { icon: Globe, label: 'Web3 Marketing' },
  { icon: TrendingUp, label: 'Growth Strategy' },
  { icon: Sparkles, label: 'DeFi & NFT' },
];

const floatingCards = [
  {
    label: 'Campaign ROI',
    value: '+380%',
    sub: 'Average return',
    color: 'text-primary',
    delay: 0,
  },
  {
    label: 'Communities Built',
    value: '12+',
    sub: 'Web3 ecosystems',
    color: 'text-accent',
    delay: 0.5,
  },
  {
    label: 'Tokens Launched',
    value: '8',
    sub: 'Go-to-market success',
    color: 'text-primary',
    delay: 1,
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* Floating blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pulse-ring"
        style={{ background: 'oklch(0.76 0.22 200)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-8 blur-3xl"
        style={{ background: 'oklch(0.72 0.20 195)', animationDelay: '1s' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="flex flex-col gap-6">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 w-fit"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-balance"
            >
              Software & <span className="text-primary glow-text">Web3</span>{' '}
              <br className="hidden sm:block" />
              Marketer
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              Software Engineer specializing in Blockchain, AI, and Cybersecurity. I design scalable
              applications, develop Web3 infrastructure, and drive growth for digital products
              through strategic marketing and community development.
            </motion.p>

            {/* Skill badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {badges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-muted-foreground text-sm"
                >
                  <Icon size={13} className="text-primary" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-cyan group"
              >
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Central hex avatar */}
            <div className="relative float-anim">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                style={{ background: 'oklch(0.76 0.22 200)', transform: 'scale(1.3)' }}
              />

              {/* Hexagon-style card */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-sm flex items-center justify-center glow-cyan overflow-hidden">
                {/* Grid pattern inside */}
                <div className="absolute inset-0 grid-bg opacity-40" />

                {/* Center icon */}
                <div className="relative flex flex-col items-center gap-3 z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
                  <p className="font-heading font-bold text-foreground text-lg">Cryptosiz</p>
                  <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
                    Web3 · Software · Growth
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-primary/40 rounded-tl-md" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-primary/40 rounded-tr-md" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-primary/40 rounded-bl-md" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-primary/40 rounded-br-md" />
              </div>

              {/* Floating stat chips */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  className="absolute"
                  style={{
                    top: i === 0 ? '-1rem' : i === 1 ? '50%' : undefined,
                    bottom: i === 2 ? '-1rem' : undefined,
                    left: i === 1 ? '-4.5rem' : undefined,
                    right: i === 0 ? '-3rem' : i === 2 ? '-3rem' : undefined,
                    transform: i === 1 ? 'translateY(-50%)' : undefined,
                  }}
                >
                  <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-xl backdrop-blur-sm min-w-[110px]">
                    <p className={`text-xl font-heading font-bold ${card.color}`}>{card.value}</p>
                    <p className="text-foreground text-xs font-medium leading-tight">
                      {card.label}
                    </p>
                    <p className="text-muted-foreground text-xs">{card.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
