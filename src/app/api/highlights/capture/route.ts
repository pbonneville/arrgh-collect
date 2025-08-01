import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { authenticateApiKey, validateUrl, validateHighlightText } from '@/lib/api-auth';
import { HighlightCaptureResponse } from '@/types';

// CORS headers for bookmarklet requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== CAPTURE API START ===');
    const body = await request.json();
    console.log('Request body:', { 
      highlighted_text: body.highlighted_text?.length + ' chars', 
      page_url: body.page_url, 
      page_title: body.page_title,
      api_key: body.api_key?.substring(0, 8) + '...'
    });
    const { highlighted_text, page_url, page_title, api_key } = body;

    // Validate API key
    if (!api_key || typeof api_key !== 'string') {
      const response: HighlightCaptureResponse = {
        success: false,
        message: 'Missing or invalid API key',
      };
      return NextResponse.json(response, { 
        status: 401,
        headers: corsHeaders 
      });
    }

    // Authenticate user via API key
    console.log('Starting API key authentication...');
    const userId = await authenticateApiKey(api_key);
    console.log('Authentication result:', { userId });
    if (!userId) {
      console.log('Authentication failed - returning 401');
      const response: HighlightCaptureResponse = {
        success: false,
        message: 'Invalid API key',
      };
      return NextResponse.json(response, { 
        status: 401,
        headers: corsHeaders 
      });
    }

    // Validate highlighted text
    const textValidation = validateHighlightText(highlighted_text);
    if (!textValidation.valid) {
      const response: HighlightCaptureResponse = {
        success: false,
        message: textValidation.error || 'Invalid highlight text',
      };
      return NextResponse.json(response, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Validate page URL
    if (!page_url || typeof page_url !== 'string' || !validateUrl(page_url)) {
      const response: HighlightCaptureResponse = {
        success: false,
        message: 'Invalid or missing page URL',
      };
      return NextResponse.json(response, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Validate and sanitize optional fields
    const sanitizedTitle = page_title && typeof page_title === 'string' 
      ? page_title.substring(0, 500) 
      : null;

    // Save highlight to database with queued status
    const supabase = await createClient();
    const { data: highlight, error } = await supabase
      .from('highlights')
      .insert({
        user_id: userId,
        highlighted_text: highlighted_text.trim(),
        title: sanitizedTitle || 'Untitled Page',
        content: highlighted_text.trim(), // Required field
        markdown_content: '', // Empty string - will be set by async extraction
        url: page_url.trim(),
        domain: new URL(page_url).hostname,
        metadata: {
          captured_via: 'bookmarklet',
          original_page_title: sanitizedTitle,
          content_status: 'queued', // Indicate content extraction is queued
          queued_at: new Date().toISOString()
        }
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving highlight:', error);
      const response: HighlightCaptureResponse = {
        success: false,
        message: 'Failed to save highlight',
      };
      return NextResponse.json(response, { 
        status: 500,
        headers: corsHeaders 
      });
    }

    console.log('Highlight saved successfully, queuing background extraction:', highlight.id);

    // Queue background content extraction
    let contentStatus = 'queued';
    let processingStarted = false;
    let responseMessage = 'Highlight saved! Content extraction queued.';

    try {
      const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';
      const backendApiKey = process.env.BACKEND_API_KEY || 'dev-key';

      console.log('Calling backend for async extraction:', {
        backendUrl,
        highlightId: highlight.id,
        hasApiKey: !!backendApiKey
      });

      // Create 30-second timeout for the backend call
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const backendResponse = await fetch(`${backendUrl}/highlights/capture-and-extract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': backendApiKey
        },
        body: JSON.stringify({
          highlight_id: highlight.id,
          url: page_url.trim(),
          highlighted_text: highlighted_text.trim(),
          page_title: sanitizedTitle,
          user_id: userId
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (backendResponse.ok) {
        const backendResult = await backendResponse.json();
        contentStatus = backendResult.content_status || 'queued';
        processingStarted = backendResult.processing_started || false;
        responseMessage = backendResult.message || 'Highlight saved! Content extraction queued.';
        
        console.log('Backend extraction queued successfully:', {
          highlightId: highlight.id,
          contentStatus,
          processingStarted
        });
      } else {
        console.error('Backend extraction queueing failed:', {
          status: backendResponse.status,
          statusText: backendResponse.statusText
        });
        contentStatus = 'failed';
        responseMessage = 'Highlight saved! Content extraction will be processed later.';
      }

    } catch (error) {
      console.error('Error calling backend for extraction:', error);
      
      // Update database to reflect failed status
      await supabase
        .from('highlights')
        .update({
          metadata: {
            captured_via: 'bookmarklet',
            original_page_title: sanitizedTitle,
            content_status: 'failed',
            queued_at: new Date().toISOString(),
            error_message: error instanceof Error ? error.message : 'Backend call failed'
          }
        })
        .eq('id', highlight.id);

      contentStatus = 'failed';
      responseMessage = 'Highlight saved! Content extraction will be processed later.';
    }

    const response: HighlightCaptureResponse = {
      success: true,
      message: responseMessage,
      highlightId: highlight.id,
    };

    return NextResponse.json(response, { 
      status: 201,
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Error capturing highlight:', error);
    const response: HighlightCaptureResponse = {
      success: false,
      message: 'Internal server error',
    };
    return NextResponse.json(response, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}