'use client';

import { createContext, useContext, useState } from 'react';

export interface Review {
  _id?: string;
  projectId: string;
  name: string;
  position: string;
  review: string;
  rating: number;
  imageUrl?: string;
}

interface ReviewContextType {
  reviews: Review[];
  loading: boolean;
  fetchReviews: (projectId?: string) => Promise<void>;
  addReview: (data: Partial<Review> & { image?: File | string | null }) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextType | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (projectId?: string) => {
    setLoading(true);

    const url = projectId ? `/api/reviews?projectId=${projectId}` : '/api/reviews';

    const res = await fetch(url);

    const data = await res.json();

    setReviews(data);

    setLoading(false);
  };

  const addReview = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('position', data.position);
      formData.append('review', data.review);
      formData.append('rating', data.rating);
      formData.append('projectId', data.projectId);

      if (data.image) {
        formData.append('image', data.image);
      }

      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to add review: ${res.statusText}`);
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      return newReview;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  };

  return (
    <ReviewContext.Provider value={{ reviews, loading, fetchReviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReviews must be used inside provider');
  return ctx;
};
