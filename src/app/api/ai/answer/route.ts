import { NextRequest, NextResponse } from 'next/server';
import { answerConferenceQuestions } from '@/ai/flows/answer-conference-questions';

/**
 * POST /api/ai/answer
 *
 * Body: { question: string }
 * Returns: { answer: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
    }

    const { answer } = await answerConferenceQuestions({ question });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI answer error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 