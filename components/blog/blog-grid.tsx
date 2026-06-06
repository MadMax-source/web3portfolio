'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

import { useBlog } from '@/context/blog-context';

const categories = ['All', 'AI', 'Web3 Development', 'Ethical Hacking', 'Web3 Marketing'];

export default function BlogGrid() {
  const { posts, loading, error } = useBlog();

  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  // FILTER LOGIC (context-powered)
  const filtered =
    activeFilter === 'All' ? posts : posts.filter((p) => p.category === activeFilter);

  const featured = filtered.length > 0 ? filtered[0] : null;
  const rest = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <section ref={ref} className="py-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="ml-auto text-xs text-muted-foreground font-mono self-center">
            {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* LOADING STATE */}
        {loading && <p className="text-muted-foreground text-sm">Loading posts...</p>}

        {/* ERROR STATE */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <p className="text-muted-foreground text-sm">No posts found in this category.</p>
        )}

        {/* CONTENT */}
        <AnimatePresence mode="popLayout">
          {!loading && filtered.length > 0 && (
            <motion.div key={activeFilter} layout className="flex flex-col gap-5">
              {/* FEATURED POST */}
              {featured && (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30"
                >
                  <div className="p-8 md:p-10 grid md:grid-cols-5 gap-8">
                    {/* LEFT */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                      <span className="px-2.5 py-1 w-fit rounded-md bg-primary/15 text-primary text-xs font-mono border border-primary/20">
                        {featured.category}
                      </span>

                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {featured.title}
                      </h2>

                      <p className="text-muted-foreground">{featured.excerpt}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {featured.readTime}
                        </span>
                        <span>{featured.date}</span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featured.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs border border-border"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${featured.slug}`}
                        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                      >
                        Read Article
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* GRID POSTS */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <motion.article
                    key={post._id || post.id || post.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border border-border bg-card hover:border-primary/30 transition-all overflow-hidden"
                  >
                    <Link href={`/blog/${post.slug}`} className="p-6 flex flex-col gap-3 h-full">
                      <span className="px-2 py-1 w-fit rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                        {post.category}
                      </span>

                      <h3 className="font-bold text-lg text-foreground">{post.title}</h3>

                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground font-mono pt-4 border-t border-border/60">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
