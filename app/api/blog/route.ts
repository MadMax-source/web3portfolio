import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/models/blog.model';

export async function GET() {
  try {
    await connectDB();

    const posts = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch posts', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime,
      featured,
      author,
      coverImage,
    } = body;

    const post = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      readTime,
      featured,
      author,
      coverImage,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create post', error }, { status: 500 });
  }
}
