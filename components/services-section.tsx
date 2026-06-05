'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import { useProjects } from '@/context/project-context';
import type { Project } from '@/context/project-context';
import Link from 'next/link';

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { projects, loading, fetchProjects } = useProjects();
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects && projects.length > 0) {
      // Display latest 3 projects
      setDisplayProjects(projects.slice(0, 3));
    }
  }, [projects]);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="projects">
      {/* background glow */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none bg-primary" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            — Selected Work
          </p>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold">Recent Projects</h2>

          <p className="text-muted-foreground text-lg mt-4 max-w-xl leading-relaxed">
            A selection of systems I’ve built across Web3 infrastructure, AI automation, and
            security analytics.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => (
            <Link key={project._id || project.title} href={`/projects/${project._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer h-full"
              >
                {/* IMAGE SECTION */}
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23333%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23666%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EProject Image%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* floating icon */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center">
                    <Rocket size={16} className="text-white" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* category */}
                  <div className="mb-2">
                    <span className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary">
                      {project.category}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech.id}
                        className="px-2 py-0.5 text-xs font-mono rounded-md border border-primary/15 bg-primary/10 text-primary/70"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs font-mono rounded-md border border-primary/15 bg-primary/10 text-primary/70">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayProjects.length === 0 && (
          <div className="mt-12 flex justify-center">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        )}

        {/* CTA */}
        {displayProjects.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link href="/projects">
              <button className="px-6 py-2.5 rounded-xl border border-primary/20 bg-card hover:bg-primary/10 hover:border-primary/40 transition text-sm font-mono text-primary">
                View More Projects →
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
