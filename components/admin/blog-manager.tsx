'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Eye, CheckCircle, X, Save } from 'lucide-react'

const categories = ['Web3', 'Marketing', 'DeFi', 'Community', 'SaaS', 'Opinion']

const initialPosts = [
  { id: 1, title: 'How to Launch a DeFi Token That Actually Gets Noticed', category: 'DeFi', date: 'May 28, 2025', status: 'published', readTime: '9 min' },
  { id: 2, title: 'Web3 Community Building in 2025: What Actually Works', category: 'Community', date: 'May 14, 2025', status: 'published', readTime: '7 min' },
  { id: 3, title: 'The 3 Growth Loops That Scaled My SaaS Client to $2M ARR', category: 'SaaS', date: 'Apr 30, 2025', status: 'published', readTime: '11 min' },
  { id: 4, title: 'NFT Marketing Is Not Dead — It Just Evolved', category: 'Web3', date: 'Apr 15, 2025', status: 'published', readTime: '6 min' },
  { id: 5, title: 'Draft: Web3 Influencer Strategy Guide', category: 'Marketing', date: 'Jun 1, 2025', status: 'draft', readTime: '—' },
]

type FormMode = 'idle' | 'new' | 'edit'

const emptyForm = { title: '', category: '', excerpt: '', content: '', readTime: '', status: 'draft' as 'draft' | 'published' }

export default function BlogManager() {
  const [posts, setPosts] = useState(initialPosts)
  const [mode, setMode] = useState<FormMode>('idle')
  const [form, setForm] = useState(emptyForm)
  const [saved, setSaved] = useState(false)

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200'
  const labelClass = 'block text-sm font-medium text-foreground mb-1.5'

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    if (mode === 'new') {
      setPosts((prev) => [
        { id: Date.now(), title: form.title, category: form.category || 'Web3', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: form.status, readTime: form.readTime || '5 min' },
        ...prev,
      ])
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setMode('idle'); setForm(emptyForm) }, 1400)
  }

  const deletePost = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">{posts.length} posts total</p>
        </div>
        {mode === 'idle' && (
          <button
            onClick={() => { setMode('new'); setForm(emptyForm) }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan"
          >
            <Plus size={16} />
            New Post
          </button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {mode !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-primary/25 bg-card p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-lg text-foreground">
                {mode === 'new' ? 'New Blog Post' : 'Edit Post'}
              </h2>
              <button
                onClick={() => { setMode('idle'); setForm(emptyForm) }}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>

            {saved ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-10 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center glow-cyan">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <p className="font-heading font-bold text-foreground">Post saved successfully!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>
                    Title <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter post title..."
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                      className={inputClass}
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 8 min read"
                      value={form.readTime}
                      onChange={(e) => setForm((p) => ({ ...p, readTime: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as 'draft' | 'published' }))}
                      className={inputClass}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Excerpt</label>
                  <textarea
                    rows={2}
                    placeholder="Short description shown in the blog grid..."
                    value={form.excerpt}
                    onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Content</label>
                  <textarea
                    rows={10}
                    placeholder="Write your full blog post content here (Markdown supported)..."
                    value={form.content}
                    onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                    className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-cyan"
                  >
                    <Save size={15} />
                    Save Post
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('idle'); setForm(emptyForm) }}
                    className="px-5 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 items-center px-6 py-3 border-b border-border bg-secondary/30">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Title</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Category</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Date</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Status</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Actions</span>
        </div>

        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-4 items-center px-6 py-4 border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors duration-150"
            >
              <p className="text-sm text-foreground font-medium truncate pr-4">{post.title}</p>
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20 whitespace-nowrap">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{post.date}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono border whitespace-nowrap ${
                post.status === 'published'
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-secondary text-muted-foreground border-border'
              }`}>
                {post.status}
              </span>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-150" aria-label="Preview">
                  <Eye size={14} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-150" aria-label="Edit">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-muted-foreground transition-all duration-150"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
