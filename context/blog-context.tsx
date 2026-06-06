'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BlogCategory = 'AI' | 'Ethical Hacking' | 'Web3 Development' | 'Web3 Marketing';

export type BlogPost = {
  _id?: string;
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  date?: string;
  featured: boolean;
  author: {
    name: string;
    role: string;
    initials: string;
  };
};

type BlogContextType = {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/blog');
      const data = await res.json();

      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        loading,
        error,
        refresh: fetchPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used inside BlogProvider');
  }
  return context;
}
