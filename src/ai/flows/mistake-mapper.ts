'use server';

/**
 * @fileOverview AI-powered tool to analyze student mistakes and provide step-by-step corrections.
 *
 * - mistakeMapper - A function that handles the mistake analysis process.
 * - MistakeMapperInput - The input type for the mistakeMapper function.
 * - MistakeMapperOutput - The return type for the mistakeMapper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MistakeMapperInputSchema = z.object({
  question: z.string().describe('The question that was asked.'),
  studentAnswer: z.string().describe("The student's answer to the question."),
  correctAnswer: z.string().describe('The correct answer to the question.'),
});
export type MistakeMapperInput = z.infer<typeof MistakeMapperInputSchema>;

const MistakeMapperOutputSchema = z.object({
  analysis: z.string().describe('Step-by-step explanation of the mistake and how to arrive at the correct answer.'),
  similarityScore: z.number().min(0).max(100).describe('A percentage score (0-100) indicating how similar the student answer is to the correct answer. 100 is a perfect match.'),
});
export type MistakeMapperOutput = z.infer<typeof MistakeMapperOutputSchema>;

export async function mistakeMapper(input: MistakeMapperInput): Promise<MistakeMapperOutput> {
  return mistakeMapperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mistakeMapperPrompt',
  input: {schema: MistakeMapperInputSchema},
  output: {schema: MistakeMapperOutputSchema},
  prompt: `You are an AI assistant designed to help students learn from their mistakes.

You will receive the question, the student's answer, and the correct answer.

Your tasks are:
1.  Analyze the student's mistake and provide a clear, step-by-step explanation of how to arrive at the correct answer.
2.  Provide a similarity score as a percentage (from 0 to 100) that represents how close the student's answer was to the correct one. A score of 100 means the answer was correct, while 0 means it was completely incorrect. Consider partial credit for answers that show some correct steps or understanding.

Question: {{{question}}}
Student's Answer: {{{studentAnswer}}}
Correct Answer: {{{correctAnswer}}}`,
});

const mistakeMapperFlow = ai.defineFlow(
  {
    name: 'mistakeMapperFlow',
    inputSchema: MistakeMapperInputSchema,
    outputSchema: MistakeMapperOutputSchema,
    retries: 3, // Retry up to 3 times on failure
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
