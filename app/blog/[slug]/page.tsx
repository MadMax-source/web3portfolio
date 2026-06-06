import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BlogDetail from '@/components/blog/blog-detail';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  return res.json();
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

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
