'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Clock, Tag, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-data'

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="font-heading font-black text-2xl text-foreground mt-10 mb-4 leading-tight">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="font-semibold text-foreground mb-3">
          {line.replace(/\*\*/g, '')}
        </p>
      )
    } else if (line.match(/^\d+\.\s/)) {
      elements.push(
        <li key={key++} className="text-muted-foreground leading-relaxed mb-2 ml-5 list-decimal">
          {line.replace(/^\d+\.\s/, '')}
        </li>
      )
    } else if (line.startsWith('- ')) {
      const parts = line.replace('- ', '').split(/\*\*(.+?)\*\*/g)
      elements.push(
        <li key={key++} className="text-muted-foreground leading-relaxed mb-2 ml-5 list-disc">
          {parts.map((part, pi) =>
            pi % 2 === 1 ? <strong key={pi} className="text-foreground font-semibold">{part}</strong> : part
          )}
        </li>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-3" />)
    } else {
      // Inline bold parsing
      const parts = line.split(/\*\*(.+?)\*\*/g)
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, pi) =>
            pi % 2 === 1 ? <strong key={pi} className="text-foreground font-semibold">{part}</strong> : part
          )}
        </p>
      )
    }
  }

  return elements
}

type Props = {
  post: BlogPost
  related: BlogPost[]
}

export default function BlogDetail({ post, related }: Props) {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const relatedRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0, margin: '200px' })
  const contentInView = useInView(contentRef, { once: true, amount: 0, margin: '200px' })
  const relatedInView = useInView(relatedRef, { once: true, amount: 0, margin: '200px' })

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-14 overflow-hidden">
        {/* bg glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[120px]" />
        </div>
        {/* grid lines */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-6"
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Blog
            </Link>

            {/* Category + featured */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-md bg-primary/15 text-primary text-xs font-mono border border-primary/25 uppercase tracking-wider">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight text-balance">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground font-mono border-t border-border pt-5">
              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">{post.author.initials}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground text-xs font-semibold">{post.author.name}</span>
                  <span className="text-muted-foreground text-xs">{post.author.role}</span>
                </div>
              </div>

              <div className="h-4 w-px bg-border hidden sm:block" />

              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-primary" />
                {post.date}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-primary" />
                {post.readTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card border border-border text-muted-foreground text-xs"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* ── Article body ───────────────────────────────────── */}
      <section ref={contentRef} className="py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>
        </motion.div>
      </section>

      {/* ── Share + CTA strip ──────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pb-14">
        <div className="rounded-2xl border border-primary/20 bg-card p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">Found this useful?</span>
            <span className="text-xs text-muted-foreground">Share it with your network or reach out to work together.</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 glow-cyan group"
            >
              Work with me
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
            >
              More articles
            </Link>
          </div>
        </div>
      </div>

      {/* ── Related posts ──────────────────────────────────── */}
      {related.length > 0 && (
        <section ref={relatedRef} className="pb-24 border-t border-border">
          <div className="max-w-6xl mx-auto px-6 pt-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">More Articles</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((rel, i) => (
                  <motion.article
                    key={rel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Link href={`/blog/${rel.slug}`} className="p-6 flex flex-col gap-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <ArrowUpRight
                          size={15}
                          className="text-muted-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="font-heading font-bold text-base text-foreground leading-snug text-balance group-hover:text-primary transition-colors duration-200">
                          {rel.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/60 text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} className="text-primary" />
                          {rel.readTime}
                        </span>
                        <span className="text-border">|</span>
                        <span>{rel.date}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}
