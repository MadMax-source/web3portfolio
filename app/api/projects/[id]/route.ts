import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/project.model';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch project',
      },
      { status: 500 },
    );
  }
}
