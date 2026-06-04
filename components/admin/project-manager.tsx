'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, CheckCircle, X, Save } from 'lucide-react'

const categories = ['Web3', 'DeFi', 'NFT', 'SaaS', 'Community', 'Layer 2']

const initialProjects = [
  { id: 1, title: 'DeFi Protocol Launch', category: 'DeFi', results: '$12M raised, 45K community members', status: 'published' },
  { id: 2, title: 'SaaS Growth Campaign', category: 'SaaS', results: '380% MRR growth in 6 months', status: 'published' },
  { id: 3, title: 'NFT Ecosystem Campaign', category: 'NFT', results: 'Sold out in 48h, 8M impressions', status: 'published' },
  { id: 4, title: 'Web3 Community Building', category: 'Community', results: '28K Discord members, 42% WAU', status: 'published' },
  { id: 5, title: 'Layer 2 Bridge GTM', category: 'Layer 2', results: 'Draft — strategy in progress', status: 'draft' },
]

type FormMode = 'idle' | 'new' | 'edit'

const emptyForm = {
  title: '', category: '', description: '', results: '',
  tags: '', link: '', status: 'draft' as 'draft' | 'published',
}

export default function ProjectManager() {
  const [projects, setProjects] = useState(initialProjects)
  const [mode, setMode] = useState<FormMode>('idle')
  const [form, setForm] = useState(emptyForm)
  const [saved, setSaved] = useState(false)

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200'
  const labelClass = 'block text-sm font-medium text-foreground mb-1.5'

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    if (mode === 'new') {
      setProjects((prev) => [
        { id: Date.now(), title: form.title, category: form.category || 'Web3', results: form.results || '—', status: form.status },
        ...prev,
      ])
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setMode('idle'); setForm(emptyForm) }, 1400)
  }

  const deleteProject = (id: number) => setProjects((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">{projects.length} projects total</p>
        </div>
        {mode === 'idle' && (
          <button
            onClick={() => { setMode('new'); setForm(emptyForm) }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan"
          >
            <Plus size={16} />
            New Project
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
                {mode === 'new' ? 'New Project' : 'Edit Project'}
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
                <p className="font-heading font-bold text-foreground">Project saved successfully!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                {/* Title + Category */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Project Title <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DeFi Protocol Launch"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
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
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>Project Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you did, the challenge, and your approach..."
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Key results */}
                <div>
                  <label className={labelClass}>Key Results</label>
                  <textarea
                    rows={3}
                    placeholder="List the outcomes, one per line (e.g. $12M raised at IDO)"
                    value={form.results}
                    onChange={(e) => setForm((p) => ({ ...p, results: e.target.value }))}
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-xs text-muted-foreground mt-1.5 font-mono">
                    Tip: one result per line — each becomes a bullet on the project card.
                  </p>
                </div>

                {/* Tags + Link + Status */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Tags</label>
                    <input
                      type="text"
                      placeholder="Web3, DeFi, Community"
                      value={form.tags}
                      onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>External Link</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={form.link}
                      onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
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

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all duration-200 glow-cyan"
                  >
                    <Save size={15} />
                    Save Project
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

      {/* Projects list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 items-center px-6 py-3 border-b border-border bg-secondary/30">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Project</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Category</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Status</span>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Actions</span>
        </div>

        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 items-start px-6 py-4 border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors duration-150"
            >
              <div className="min-w-0 pr-4">
                <p className="text-sm text-foreground font-medium truncate">{project.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{project.results}</p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20 whitespace-nowrap self-center">
                {project.category}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono border whitespace-nowrap self-center ${
                project.status === 'published'
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-secondary text-muted-foreground border-border'
              }`}>
                {project.status}
              </span>
              <div className="flex items-center gap-1.5 self-center">
                <button className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-150" aria-label="Edit">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
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
