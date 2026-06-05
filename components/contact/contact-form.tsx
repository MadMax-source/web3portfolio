'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, CheckCircle, Loader } from 'lucide-react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const services = ['AI Automation', 'Web3', 'Marketing', 'Ethical Hacking', 'Other'];

const budgets = ['Under $100', '$100 – $500', '$500 – $1,000', '$1,000+', "Let's discuss"];

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setFormState('submitting');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.service || 'Portfolio Inquiry',
          message: `
Service: ${form.service}
Budget: ${form.budget}

${form.message}
        `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setFormState('success');

      setForm({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200';

  const labelClass = 'block text-sm font-medium text-foreground mb-1.5';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl border border-border bg-card p-8 lg:p-10"
    >
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />

      {formState === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-5 py-16 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center glow-cyan">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground">Message Sent!</h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Thanks for reaching out. I&apos;ll review your message and get back to you within 24
            hours.
          </p>
          <button
            onClick={() => {
              setFormState('idle');
              setForm({ name: '', email: '', service: '', budget: '', message: '' });
            }}
            className="mt-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
              Start a Conversation
            </h2>
            <p className="text-muted-foreground text-sm">
              Fill in the details below and I&apos;ll craft a tailored proposal for you.
            </p>
          </div>

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Service + Budget */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="service" className={labelClass}>
                Service Needed
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelClass}>
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="" disabled>
                  Select budget
                </option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Project Details <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project, goals, timeline, and any other context that would help..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-60 transition-all duration-200 glow-cyan group"
          >
            {formState === 'submitting' ? (
              <>
                <Loader size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                  →
                </span>
              </>
            )}
          </button>
          {formState === 'error' && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      )}
    </motion.div>
  );
}
