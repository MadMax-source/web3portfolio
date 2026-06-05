'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Clock, AtSign, Globe, Send, GitBranch, Calendar } from 'lucide-react';
import Link from 'next/link';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'cryptosizglobal@gmail.com',
    href: 'mailto:cryptosizglobal@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Remote — Worldwide',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
  {
    icon: Calendar,
    label: 'Availability',
    value: 'Open to new projects',
    href: null,
  },
];

const socials = [
  {
    icon: AtSign,
    label: 'Twitter / X',
    handle: '@cryptoosiz',
    href: 'https://x.com/cryptoosiz?s=11',
  },

  {
    icon: GitBranch,
    label: 'GitHub',
    handle: 'github/cryptoosiz',
    href: 'https://github.com/cryptoosiz',
  },
  { icon: Send, label: 'Telegram', handle: '@cryptoosiz', href: 'https://t.me/cryptoosiz' },
];

const preferredStack = [
  'Token Launches',
  'DeFi Protocols',
  'NFT Collections',
  'SaaS Products',
  'DAOs',
  'Web3 Gaming',
];

export default function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6"
    >
      {/* Contact details card */}
      <div className="rounded-2xl border border-border bg-card p-7">
        <h3 className="font-heading text-lg font-bold text-foreground mb-5">Contact Information</h3>
        <ul className="flex flex-col gap-4">
          {contactDetails.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-0.5">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Social links card */}
      <div className="rounded-2xl border border-border bg-card p-7">
        <h3 className="font-heading text-lg font-bold text-foreground mb-5">Connect on Social</h3>
        <ul className="flex flex-col gap-3">
          {socials.map(({ icon: Icon, label, handle, href }) => (
            <li key={label}>
              <a
                href={href}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-background hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">
                    {handle}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-primary text-sm transition-colors duration-200">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects I work on */}

      {/*
      <div className="rounded-2xl border border-border bg-card p-7">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          Projects I Work With
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          From early-stage launches to established protocols — if it lives on-chain, I&apos;ve marketed it.
        </p>
        <div className="flex flex-wrap gap-2">
          {preferredStack.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-primary/10 border border-primary/20 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      */}
    </motion.div>
  );
}
