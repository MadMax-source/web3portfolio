'use client';

import { motion } from 'framer-motion';

export default function ProjectsHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden grid-bg">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
        >
          — Project
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-balance leading-tight mb-6"
        >
          Tasks <span className="text-primary glow-text">Cryptosiz</span>
          <br />
          Have Worked On
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
