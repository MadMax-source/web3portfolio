'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, CheckCircle, X, Save } from 'lucide-react';

import { useBlog, BlogPost } from '@/context/blog-context';

type FormMode = 'idle' | 'new' | 'edit';

const categories = ['AI', 'Ethical Hacking', 'Web3 Development', 'Web3 Marketing'];

const emptyForm: Partial<BlogPost> & { tagsInput: string } = {
  title: '',
  slug: '',
  category: 'AI',
  excerpt: '',
  content: '',
  readTime: '5 min read',
  featured: false,
  tagsInput: '',
  author: {
    name: 'Admin',
    role: 'Content Creator',
    initials: 'AD',
  },
};

export default function BlogManager() {
  const { posts, refresh } = useBlog();

  const [mode, setMode] = useState<FormMode>('idle');
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200';

  const labelClass = 'block text-sm font-medium text-foreground mb-1.5';

  // CREATE BLOG POST
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        slug:
          form.slug ||
          form.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, ''),

        category: form.category || 'AI',
        excerpt: form.excerpt,
        content: form.content,

        tags: form.tagsInput ? form.tagsInput.split(',').map((t) => t.trim()) : [],

        readTime: form.readTime || '5 min read',
        featured: form.featured || false,

        date: new Date().toISOString(),

        author: form.author || {
          name: 'Admin',
          role: 'Content Creator',
          initials: 'AD',
        },
      };

      await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      await refresh();

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
        setMode('idle');
        setForm(emptyForm);
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE BLOG POST
  const deletePost = async (id?: string) => {
    if (!id) return;

    await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    await refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">{posts.length} posts total</p>
        </div>

        {mode === 'idle' && (
          <button
            onClick={() => {
              setMode('new');
              setForm(emptyForm);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl"
          >
            <Plus size={16} />
            New Post
          </button>
        )}
      </div>

      {/* FORM */}
      <AnimatePresence>
        {mode !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="p-6 border rounded-2xl bg-card"
          >
            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-lg">Create Blog Post</h2>

              <button onClick={() => setMode('idle')}>
                <X />
              </button>
            </div>

            {saved ? (
              <div className="py-10 text-center">
                <CheckCircle className="mx-auto text-green-500" />
                <p>Post saved!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                {/* TITLE */}
                <input
                  className={inputClass}
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                {/* SLUG */}
                <input
                  className={inputClass}
                  placeholder="Slug (optional)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />

                {/* CATEGORY */}
                <select
                  className={inputClass}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* EXCERPT */}
                <textarea
                  className={inputClass}
                  placeholder="Excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />

                {/* CONTENT */}
                <textarea
                  className={`${inputClass} h-40`}
                  placeholder="Content (Markdown supported)"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />

                {/* TAGS */}
                <input
                  className={inputClass}
                  placeholder="Tags (comma separated)"
                  value={form.tagsInput}
                  onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
                />

                {/* READ TIME */}
                <input
                  className={inputClass}
                  placeholder="Read time"
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                />

                {/* FEATURED */}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured post
                </label>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button disabled={loading} className="px-6 py-3 bg-primary text-white rounded-xl">
                    <Save size={14} />
                    {loading ? 'Saving...' : 'Save'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('idle')}
                    className="px-5 py-3 border rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST */}
      <div className="border rounded-2xl bg-card">
        {posts.map((post) => (
          <div key={post._id || post.id} className="flex justify-between p-4 border-b">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-xs text-muted-foreground">{post.category}</p>
            </div>

            <div className="flex gap-2">
              <button>
                <Eye size={14} />
              </button>

              <button>
                <Edit2 size={14} />
              </button>

              <button onClick={() => deletePost(post._id)} className="text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
