/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai/answer-rag/route';

// Mock the LightRAG client so tests don't hit the real server
jest.mock('@/lib/lightRagClient', () => ({
  lightRagQuery: jest.fn(async (q: string) => 'Mocked answer to: ' + q),
}));

function createJsonRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/ai/answer-rag', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body) as any,
  } as any);
}

describe('API /api/ai/answer-rag POST', () => {
  it('returns 400 if question missing', async () => {
    const res = await POST(createJsonRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns answer from LightRAG for valid question', async () => {
    const question = 'Where is the venue?';
    const res = await POST(createJsonRequest({ question }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ answer: 'Mocked answer to: ' + question });
  });
}); 