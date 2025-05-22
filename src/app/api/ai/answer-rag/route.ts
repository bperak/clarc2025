import { NextRequest, NextResponse } from 'next/server';
import { answerConferenceQuestionsRAG } from '@/ai/flows/answer-conference-questions-rag';

/**
 * POST /api/ai/answer-rag
 *
 * Body: { question: string, stream?: boolean }
 * Returns: { answer: string } or a text stream
 */
export async function POST(request: NextRequest) {
  try {
    const { question, stream = false } = await request.json();

    if (typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    // If streaming is requested, set up a streaming response
    if (stream) {
      const encoder = new TextEncoder();
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();

      // Start the async process to generate the answer
      answerConferenceQuestionsRAG({ 
        question, 
        onChunk: async (chunk) => {
          await writer.write(encoder.encode(chunk));
        }
      })
      .then(async () => {
        await writer.close();
      })
      .catch(async (error) => {
        console.error('Streaming error:', error);
        await writer.write(encoder.encode("\n\nAn error occurred while generating the response."));
        await writer.close();
      });

      // Return the stream
      return new Response(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    // For non-streaming requests, return the complete answer as JSON
    const { answer } = await answerConferenceQuestionsRAG({ question });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI (RAG) answer error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 