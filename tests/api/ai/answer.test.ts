import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/answer/route';

// Mock the Genkit flow so tests don't hit the AI
jest.mock('@/ai/flows/answer-conference-questions', () => ({
  answerConferenceQuestions: jest.fn(async ({ question }: { question: string }) => ({ answer: `Echo: ${question}` })),
}));

function createJsonRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/ai/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body) as any,
  } as any);
}

describe('API /api/ai/answer POST', () => {
  it('returns 400 if question missing', async () => {
    const res = await POST(createJsonRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns answer for valid question', async () => {
    const question = 'When is the keynote?';
    const res = await POST(createJsonRequest({ question }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ answer: `Echo: ${question}` });
  });
}); 