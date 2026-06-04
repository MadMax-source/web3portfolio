'use client'

import { motion } from 'framer-motion'
import { FileText, Briefcase, Eye, TrendingUp, Plus } from 'lucide-react'

const stats = [
  { icon: FileText, label: 'Blog Posts', value: '24', change: '+3 this month', color: 'text-primary' },
  { icon: Briefcase, label: 'Projects', value: '8', change: '+1 this month', color: 'text-primary' },
  { icon: Eye, label: 'Total Views', value: '12.4K', change: '+18% this week', color: 'text-primary' },
  { icon: TrendingUp, label: 'Newsletter Subs', value: '1,240', change: '+62 this week', color: 'text-primary' },
]

const recentPosts = [
  { title: 'How to Launch a DeFi Token That Actually Gets Noticed', date: 'May 28, 2025', status: 'published' },
  { title: 'Web3 Community Building in 2025: What Actually Works', date: 'May 14, 2025', status: 'published' },
  { title: 'The 3 Growth Loops That Scaled My SaaS Client to $2M ARR', date: 'Apr 30, 2025', status: 'published' },
  { title: 'Draft: Web3 Influencer Strategy Guide', date: 'Jun 1, 2025', status: 'draft' },
]

const recentProjects = [
  { title: 'DeFi Protocol Launch', category: 'DeFi', status: 'published' },
  { title: 'SaaS Growth Campaign', category: 'SaaS', status: 'published' },
  { title: 'NFT Ecosystem Campaign', category: 'NFT', status: 'published' },
  { title: 'Layer 2 Bridge GTM', category: 'Web3', status: 'draft' },
]

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void
}

export default function AdminDashboard({ setActiveTab }: AdminDashboardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back. Here is what is happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all duration-200"
          >
            <Plus size={15} />
            New Post
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan"
          >
            <Plus size={15} />
            New Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, change }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">{label}</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon size={15} className="text-primary" />
              </div>
            </div>
            <p className="font-heading font-black text-3xl text-foreground">{value}</p>
            <p className="text-xs text-primary font-mono">{change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent content */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent posts */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-heading font-semibold text-foreground">Recent Blog Posts</h2>
            <button
              onClick={() => setActiveTab('blog')}
              className="text-xs text-primary hover:text-primary/80 font-mono transition-colors"
            >
              View all
            </button>
          </div>
          <ul className="divide-y divide-border">
            {recentPosts.map((post) => (
              <li key={post.title} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{post.date}</p>
                </div>
                <span
                  className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border ${
                    post.status === 'published'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-secondary text-muted-foreground border-border'
                  }`}
                >
                  {post.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent projects */}
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-heading font-semibold text-foreground">Recent Projects</h2>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-primary hover:text-primary/80 font-mono transition-colors"
            >
              View all
            </button>
          </div>
          <ul className="divide-y divide-border">
            {recentProjects.map((project) => (
              <li key={project.title} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{project.category}</p>
                </div>
                <span
                  className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono border ${
                    project.status === 'published'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-secondary text-muted-foreground border-border'
                  }`}
                >
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
