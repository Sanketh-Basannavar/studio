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
Your task is to analyze the student's mistake and provide a clear, step-by-step explanation of how to arrive at the correct answer.

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
