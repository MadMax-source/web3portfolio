'use client';

import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, Eye, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Blog Posts', id: 'blog' },
  { icon: Briefcase, label: 'Projects', id: 'projects' },
];

type Tab = 'dashboard' | 'blog' | 'projects';

interface AdminSidebarProps {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r border-border flex flex-col min-h-screen">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-cyan">
          <span className="text-primary font-mono text-sm font-bold">W3</span>
        </div>
        <div>
          <p className="font-heading font-bold text-foreground text-sm leading-none">
            Cryptosiz<span className="text-primary">.</span>
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest px-3 mb-3">
          Content
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = activeTab === id;
            return (
              <li key={id}>
                <button
                  onClick={() => setActiveTab(id as Tab)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/25'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </span>
                  {isActive && <ChevronRight size={14} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest px-3 mb-3">
            Site
          </p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
          >
            <Eye size={16} />
            View Live Site
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-red-400 transition-all duration-200">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
