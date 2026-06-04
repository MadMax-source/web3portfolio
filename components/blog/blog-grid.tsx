'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { posts } from '@/lib/blog-data'

const categories = ['All', 'Web3', 'Marketing', 'DeFi', 'Community', 'SaaS', 'Opinion']

export default function BlogGrid() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0 })

  const filtered =
    activeFilter === 'All'
      ? posts
      : posts.filter((p) => p.tags.includes(activeFilter))

  const [featured, ...rest] = filtered

  return (
    <section ref={ref} className="py-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
          role="tablist"
          aria-label="Filter posts by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-xs text-muted-foreground">
            {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div key={activeFilter} layout className="flex flex-col gap-5">

            {/* Featured card — spans full width */}
            {featured && (
              <motion.article
                key={featured.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
                className="group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover accent top bar */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 md:p-10 grid md:grid-cols-5 gap-8 items-start">
                  {/* Left col */}
                  <div className="md:col-span-3 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-primary/15 text-primary text-xs font-mono border border-primary/25 uppercase tracking-wider">
                        {featured.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        Featured
                      </span>
                    </div>
                    <h2 className="font-heading font-black text-2xl md:text-3xl text-foreground leading-tight text-balance group-hover:text-primary transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" />
                        {featured.readTime}
                      </span>
                      <span>{featured.date}</span>
                    </div>
                  </div>

                  {/* Right col — tags + CTA */}
                  <div className="md:col-span-2 flex flex-col justify-between gap-8 h-full">
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-xs border border-border"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan group/btn"
                    >
                      Read Article
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Regular grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Link href={`/blog/${post.slug}`} className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-muted-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="font-heading font-bold text-lg text-foreground leading-snug text-balance group-hover:text-primary transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/60">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} className="text-primary" />
                          {post.readTime}
                        </span>
                        <span className="text-border">|</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
