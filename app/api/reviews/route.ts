import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/review.model';
import { uploadReviewImage } from '@/lib/uploadReviewImage';
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const projectId = searchParams.get('projectId');

  let reviews;

  if (projectId) {
    reviews = await Review.find({ projectId }).sort({
      createdAt: -1,
    });
  } else {
    reviews = await Review.find().sort({
      createdAt: -1,
    });
  }

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    let projectId, name, position, review, rating, imageFile;

    const contentType = req.headers.get('content-type') || '';

    // Handle FormData (with file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      projectId = formData.get('projectId') as string;
      name = formData.get('name') as string;
      position = formData.get('position') as string;
      review = formData.get('review') as string;
      rating = parseInt(formData.get('rating') as string, 10);
      imageFile = formData.get('image') as File | null;
    } else {
      // Handle JSON (without file)
      const body = await req.json();
      projectId = body.projectId;
      name = body.name;
      position = body.position;
      review = body.review;
      rating = body.rating;
      imageFile = body.image;
    }

    // Validate required fields
    if (!projectId || !name || !position || !review || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = null;

    // Upload to cloudinary if image exists
    if (imageFile && imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const mimeType = imageFile.type;
      const dataURI = `data:${mimeType};base64,${base64}`;
      imageUrl = await uploadReviewImage(dataURI);
    }

    const newReview = await Review.create({
      projectId,
      name,
      position,
      review,
      rating,
      imageUrl,
    });

    return NextResponse.json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
