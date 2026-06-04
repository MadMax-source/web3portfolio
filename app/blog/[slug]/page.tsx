import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BlogDetail from '@/components/blog/blog-detail'
import { posts } from '@/lib/blog-data'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Alex's Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post) notFound()

  const related = posts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BlogDetail post={post} related={related} />
      <Footer />
    </div>
  )
}
