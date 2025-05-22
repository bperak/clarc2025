// This file is machine-generated - edit with care!

'use server';
/**
 * @fileOverview A Genkit flow that answers questions about the conference schedule, speakers, and topics.
 *
 * - answerConferenceQuestions - A function that answers questions about the conference.
 * - AnswerConferenceQuestionsInput - The input type for the answerConferenceQuestions function.
 * - AnswerConferenceQuestionsOutput - The return type for the answerConferenceQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerConferenceQuestionsInputSchema = z.object({
  question: z.string().describe('The question about the conference.'),
});

export type AnswerConferenceQuestionsInput = z.infer<
  typeof AnswerConferenceQuestionsInputSchema
>;

const AnswerConferenceQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});

export type AnswerConferenceQuestionsOutput = z.infer<
  typeof AnswerConferenceQuestionsOutputSchema
>;

export async function answerConferenceQuestions(
  input: AnswerConferenceQuestionsInput
): Promise<AnswerConferenceQuestionsOutput> {
  return answerConferenceQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerConferenceQuestionsPrompt',
  input: {schema: AnswerConferenceQuestionsInputSchema},
  output: {schema: AnswerConferenceQuestionsOutputSchema},
  prompt: `You are a helpful AI assistant providing information about the CLARC 2025 conference. 
  In view of the conference data in the RAG context, previous questions  and answers in thread, try to answer the question.
  Try to answer in a concise manner and in the style of a conference organizer.
  Detect the language of the question and answer in that language.
  Important: Always respond in the same language as the question. If the question is in English, respond in English. If the question is in Croatian, respond in Croatian. For any other language, try to respond in that language if possible.

  Answer the following question:

{{question}}`,
});

const answerConferenceQuestionsFlow = ai.defineFlow(
  {
    name: 'answerConferenceQuestionsFlow',
    inputSchema: AnswerConferenceQuestionsInputSchema,
    outputSchema: AnswerConferenceQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
