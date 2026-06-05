'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  //{ label: 'Blog', href: '/blog' },
  //{ label: 'admin', href: '/admin' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-cyan group-hover:bg-primary/30 transition-all duration-300">
            <span className="text-primary font-mono text-sm font-bold">W3</span>
          </div>
          <span className="font-heading font-bold text-foreground tracking-tight text-lg">
            Cryptosiz<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors border-b border-border/50 last:border-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
                >
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
