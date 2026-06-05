'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { useReviews } from '@/context/review-context';
import type { Review } from '@/context/review-context';

const defaultTestimonials = [
  {
    quote:
      'Alex delivered a launch campaign that exceeded all our targets. The community they built became the backbone of our protocol. Absolutely exceptional Web3 marketing expertise.',
    author: 'James Okafor',
    role: 'CEO, NexaFi Protocol',
    avatar: 'JO',
    rating: 5,
  },
  {
    quote:
      'We hired Alex to lead our SaaS growth initiative and within 6 months our MRR tripled. They understand both the product side and the marketing levers perfectly.',
    author: 'Sarah Chen',
    role: 'Founder, BuildStack',
    avatar: 'SC',
    rating: 5,
  },
  {
    quote:
      'The NFT mint was sold out in 2 days largely because of the coordinated campaign Alex ran. Deep knowledge of crypto culture makes them invaluable in this space.',
    author: 'Marcus Rivera',
    role: 'Creative Director, MetaPix',
    avatar: 'MR',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { reviews, fetchReviews, loading } = useReviews();
  const [displayReviews, setDisplayReviews] = useState(defaultTestimonials);

  useEffect(() => {
    fetchReviews().then(() => {
      // Once reviews are fetched, use them
      if (reviews && reviews.length > 0) {
        setDisplayReviews(reviews as any);
      }
    });
  }, []);

  // Update display reviews when reviews change
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setDisplayReviews(reviews as any);
    }
  }, [reviews]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'oklch(0.76 0.22 200)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
            — Social Proof
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-balance">
            What Clients Say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayReviews.map((review: any, i: number) => (
            <motion.div
              key={review._id || review.author}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <Quote size={28} className="text-primary/30" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < (review.rating || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic flex-grow">
                &ldquo;{review.review || review.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                {review.imageUrl ? (
                  <img
                    src={review.imageUrl}
                    alt={review.name || review.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-primary/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-xs font-mono">
                      {getInitials(review.name || review.author)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name || review.author}
                  </p>
                  <p className="text-muted-foreground text-xs">{review.position || review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-8 text-muted-foreground">
            <p>Loading reviews...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayReviews.length === 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            <p>No reviews yet. Be the first to share your feedback!</p>
          </div>
        )}
      </div>
    </section>
  );
}
