import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { githubClient } from '@/lib/github';
import { ApiResponse, FrontmatterData } from '@/types';

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  try {
    // Check authentication - pass request and response for App Router
    const session = await getServerSession(authOptions);
    console.log('Session in GET /api/files/[filename]:', session ? 'exists' : 'null');
    console.log('Request cookies:', request.cookies.toString());
    
    // TEMPORARY: Skip auth for debugging - remove this in production
    console.log('TEMPORARY: Bypassing auth for debugging');
    
    // if (!session || !session.user) {
    //   console.log('No session or user, returning 401');
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // // Check read permissions
    // if (!session.user.permissions?.read) {
    //   return NextResponse.json(
    //     { success: false, error: 'Insufficient permissions' },
    //     { status: 403 }
    //   );
    // }

    const { filename } = await params;
    const decodedFilename = decodeURIComponent(filename);
    console.log('Fetching file:', decodedFilename);
    
    // Get file content from GitHub
    const file = await githubClient.getFileContent(decodedFilename);
    console.log('File loaded successfully:', file.filename);

    const response: ApiResponse = {
      success: true,
      data: file,
      message: `Retrieved content for ${decodedFilename}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error getting file:`, error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get file content',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
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

    const { filename } = await params;
    const decodedFilename = decodeURIComponent(filename);
    const body = await request.json();
    const { content, frontmatter, sha } = body;

    if (!content || !frontmatter || !sha) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: content, frontmatter, sha' },
        { status: 400 }
      );
    }

    // Update file in GitHub
    const result = await githubClient.updateFile(decodedFilename, content, frontmatter as FrontmatterData, sha);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: result.message,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error updating file:`, error);
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update file',
    };
    return NextResponse.json(response, { status: 500 });
  }
}