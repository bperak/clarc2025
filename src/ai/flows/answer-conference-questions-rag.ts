// This file is machine-generated - edit with care!

'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { lightRagQuery, lightRagStreamingQuery } from '@/lib/lightRagClient';
import { answerConferenceQuestions } from '@/ai/flows/answer-conference-questions';

const InputSchema = z.object({
  question: z.string().describe('The question about the conference.'),
  onChunk: z.function().args(z.string()).returns(z.promise(z.void())).optional()
    .describe('Callback function for streaming mode. Called with each chunk of the answer.'),
});

export type AnswerConferenceQuestionsRagInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});

export type AnswerConferenceQuestionsRagOutput = z.infer<typeof OutputSchema>;

/**
 * Main entry point – invoked from the Next.js API route.
 */
export async function answerConferenceQuestionsRAG(
  input: AnswerConferenceQuestionsRagInput
): Promise<AnswerConferenceQuestionsRagOutput> {
  // If streaming callback is provided, use streaming mode
  if (input.onChunk) {
    try {
      // Use streaming RAG query
      await lightRagStreamingQuery(input.question, async (chunk) => {
        // Send each chunk through the callback
        await input.onChunk(chunk);
      });
      
      // Return empty answer since we've already streamed the content
      return { answer: '' };
    } catch (error) {
      console.error('Streaming RAG error:', error);
      // If streaming fails, fall back to non-streaming
      const { answer } = await answerConferenceQuestions({ question: input.question });
      // Send the full answer as one chunk
      if (input.onChunk) {
        await input.onChunk(answer);
      }
      return { answer };
    }
  } else {
    // Normal non-streaming mode
    // 1) Retrieve answer (or context) from LightRAG
    const ragAnswer = await lightRagQuery(input.question);

    // If LightRAG has no context, fall back to the direct Gemini flow.
    const isNoContext = ragAnswer.includes('[no-context]');

    if (isNoContext) {
      const { answer } = await answerConferenceQuestions({ question: input.question });
      return { answer };
    }

    // Otherwise return the RAG answer directly.
    return { answer: ragAnswer };
  }
}

/**
 * Thin Genkit wrapper so we get tracing & observability in `genkit start`.
 */
export const answerConferenceQuestionsRagFlow = ai.defineFlow(
  {
    name: 'answerConferenceQuestionsRagFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async input => {
    return answerConferenceQuestionsRAG(input);
  }
);