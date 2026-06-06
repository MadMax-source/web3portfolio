'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle, X, Save, Loader2 } from 'lucide-react';

import { useProjects } from '@/context/project-context';

type FormMode = 'idle' | 'new';

const emptyForm = {
  title: '',
  description: '',
  longDescription: '',
  category: '',

  technologies: '',
  features: '',

  liveUrl: '',
  githubUrl: '',

  challenges: '',
  duration: '',
  role: '',

  imagePreview: '',
};

export default function ProjectManagement() {
  const { projects, createProject, deleteProject, loading } = useProjects();

  const [techInput, setTechInput] = useState('');

  const [technologies, setTechnologies] = useState<{ id: string; name: string }[]>([]);

  const [mode, setMode] = useState<FormMode>('idle');

  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<{ id: string; text: string }[]>([]);

  const addTechnology = () => {
    if (!techInput.trim()) return;

    setTechnologies((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: techInput.trim(),
      },
    ]);

    setTechInput('');
  };

  const removeTechnology = (id: string) => {
    setTechnologies((prev) => prev.filter((tech) => tech.id !== id));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;

    setFeatures((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: featureInput.trim(),
      },
    ]);

    setFeatureInput('');
  };

  const removeFeature = (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };
  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200';

  const labelClass = 'block text-sm font-medium text-foreground mb-1.5';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imagePreview: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        longDescription: form.longDescription,
        category: form.category,

        technologies: technologies,
        features: features,

        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,

        challenges: form.challenges,
        duration: form.duration,
        role: form.role,

        imagePreview: form.imagePreview,
      };

      await createProject(payload);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
        setMode('idle');
        setForm(emptyForm);
        setFeatures([]);
        setTechnologies([]);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={() => {
              setMode('new');
              setForm(emptyForm);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {/* FORM */}
      <AnimatePresence>
        {mode !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="rounded-2xl border border-primary/20 bg-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Create Project</h2>

              <button
                onClick={() => {
                  setMode('idle');
                  setForm(emptyForm);
                }}
              >
                <X size={18} />
              </button>
            </div>

            {saved ? (
              <div className="flex flex-col items-center py-10">
                <CheckCircle size={50} className="text-green-500" />
                <p className="mt-4 font-semibold">Project Saved Successfully</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className={labelClass}>Project Title</label>

                  <input
                    required
                    className={inputClass}
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>

                  <textarea
                    rows={3}
                    className={inputClass}
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Long Description</label>

                  <textarea
                    rows={6}
                    className={inputClass}
                    value={form.longDescription}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        longDescription: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>Category</label>

                  <select
                    className={inputClass}
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="Web3">Web3</option>
                    <option value="AI">AI</option>
                    <option value="Ethical Hacking">Ethical Hacking</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Technologies</label>

                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="Next.js"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology();
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={addTechnology}
                      className="px-4 rounded-xl bg-primary text-primary-foreground"
                    >
                      Add
                    </button>
                  </div>

                  {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {technologies.map((tech) => (
                        <div
                          key={tech.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20"
                        >
                          <span className="text-sm">{tech.name}</span>

                          <button
                            type="button"
                            onClick={() => removeTechnology(tech.id)}
                            className="text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Features</label>

                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder="e.g. Authentication system"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />

                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 rounded-xl bg-primary text-primary-foreground"
                    >
                      Add
                    </button>
                  </div>

                  {features.length > 0 && (
                    <div className="flex flex-col gap-2 mt-4">
                      {features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/10 border border-primary/20"
                        >
                          <span>{feature.text}</span>

                          <button
                            type="button"
                            onClick={() => removeFeature(feature.id)}
                            className="text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Live URL</label>

                    <input
                      className={inputClass}
                      value={form.liveUrl}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          liveUrl: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>GitHub URL</label>

                    <input
                      className={inputClass}
                      value={form.githubUrl}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          githubUrl: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Challenges</label>

                  <textarea
                    rows={4}
                    className={inputClass}
                    value={form.challenges}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        challenges: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Duration</label>

                    <input
                      className={inputClass}
                      value={form.duration}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          duration: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Role</label>

                    <input
                      className={inputClass}
                      value={form.role}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          role: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Project Image</label>

                  <input type="file" accept="image/*" onChange={handleImageChange} />

                  {form.imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Image Preview</p>

                      <img
                        src={form.imagePreview}
                        alt="Project Preview"
                        className="w-full max-w-md h-64 object-cover rounded-xl border border-border"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Project
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECTS */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Existing Projects</h2>
        </div>

        {projects.map((project) => (
          <div key={project._id} className="p-5 border-b border-border">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex gap-4">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-28 h-28 rounded-xl object-cover border border-border"
                  />
                )}

                <div>
                  <h3 className="font-semibold text-lg">{project.title}</h3>

                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary">
                      {project.category}
                    </span>

                    <span className="px-2 py-1 text-xs rounded-lg bg-secondary">
                      {project.duration}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">Role: {project.role}</p>
                </div>
              </div>

              <button
                onClick={() => project._id && deleteProject(project._id)}
                className="self-start p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
