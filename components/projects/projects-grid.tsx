'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';

import { useProjects } from '@/context/project-context';

export default function ProjectsGrid() {
  const { projects, loading } = useProjects();

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  });

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-muted-foreground">Loading projects...</div>
        </div>
      </section>
    );
  }

  // helper: shorten text
  const shorten = (text: string, max: number = 90) =>
    text?.length > max ? text.slice(0, max) + '...' : text;

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* FILTERS */}
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
                  : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="ml-auto self-center font-mono text-xs text-muted-foreground">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* GRID */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => {
              const isLarge = i === 0;

              return (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                  }}
                  className={`group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col ${
                    isLarge ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* TOP GLOW */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* IMAGE */}
                  {project.imageUrl && (
                    <div className="relative aspect-video overflow-hidden border-b border-border">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                          <Code2 size={18} className="text-primary" />
                        </div>

                        <div>
                          <span className="font-mono text-primary/50 text-xs">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-xs text-muted-foreground">{project.category}</p>
                        </div>
                      </div>
                    </div>

                    {/* TITLE */}
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {shorten(project.description, 100)}
                      </p>
                    </div>

                    {/* TECHNOLOGIES */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech.id}
                          className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono border border-primary/20"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    {/* VIEW DETAILS BUTTON */}
                    <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        Project Preview
                      </span>

                      <Link
                        href={`/projects/${project._id}`}
                        className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                      >
                        View Details
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
