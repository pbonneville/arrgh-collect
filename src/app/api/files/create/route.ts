import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { githubClient } from '@/lib/github';
import { ApiResponse, FrontmatterData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check write permissions
    if (!session.user.permissions?.write) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { filename, content, frontmatter } = body;

    if (!filename || !content || !frontmatter) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: filename, content, frontmatter' },
        { status: 400 }
      );
    }

    // Add author information from session
    const enhancedFrontmatter: FrontmatterData = {
      ...frontmatter,
      author: session.user.username || session.user.name || 'unknown',
    };

    // Create file in GitHub
    const result = await githubClient.createFile(filename, content, enhancedFrontmatter);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: result.message,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create file',
    };
    return NextResponse.json(response, { status: 500 });
  }
}