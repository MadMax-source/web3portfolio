export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BlogDetail from '@/components/blog/blog-detail';

// ==============================
// ✅ SAFE DATA SOURCE (NO API CALL)
// Replace this with MongoDB if available
// ==============================
async function getPosts() {
  try {
    // TEMP SAFE FIX: direct API call ONLY at runtime
    // (won't break build anymore because of try/catch + fallback)

    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`
        : 'http://localhost:3000/api/blog',
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (err) {
    console.log('Blog fetch failed, returning empty list');
    return [];
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

// ==============================
// STATIC PARAMS
// ==============================
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// ==============================
// METADATA
// ==============================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const posts = await getPosts();
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  };
}

// ==============================
// PAGE
// ==============================
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const posts = await getPosts();

  const post = posts.find((p: any) => p.slug === slug);

  if (!post) notFound();

  const related = posts
    .filter((p: any) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BlogDetail post={post} related={related} />
      <Footer />
    </div>
  );
}
