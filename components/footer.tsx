import Link from 'next/link';
import { Globe, Send, AtSign, GitBranch } from 'lucide-react';

const socials = [
  { icon: AtSign, href: '#', label: 'Twitter / X' },
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: GitBranch, href: '#', label: 'GitHub' },
  { icon: Send, href: '#', label: 'Telegram' },
];

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-primary font-mono text-xs font-bold">W3</span>
              </div>
              <span className="font-heading font-bold text-foreground tracking-tight">
                Cryptosiz<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Software Engineer &amp; Web3 Marketer — building brands.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} Alex Morgan. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs font-mono">
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
