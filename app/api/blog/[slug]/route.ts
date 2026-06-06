import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Blog } from '@/models/blog.model';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();

    const post = await Blog.findOne({ slug: params.slug });

    if (!post) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching post', error }, { status: 500 });
  }
}
