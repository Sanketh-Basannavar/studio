'use server';

/**
 * @fileOverview A Genkit flow for generating educational questions.
 *
 * - generateQuestion - A function that generates a question on a given topic.
 * - QuestionGeneratorInput - The input type for the generateQuestion function.
 * - QuestionGeneratorOutput - The return type for the generateQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a question, e.g., "High School Algebra" or "Cellular Biology".'),
});
export type QuestionGeneratorInput = z.infer<typeof QuestionGeneratorInputSchema>;

const QuestionGeneratorOutputSchema = z.object({
  question: z.string().describe('The generated question.'),
  correctAnswer: z.string().describe('The correct answer to the generated question.'),
});
export type QuestionGeneratorOutput = z.infer<typeof QuestionGeneratorOutputSchema>;

export async function generateQuestion(input: QuestionGeneratorInput): Promise<QuestionGeneratorOutput> {
  return questionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'questionGeneratorPrompt',
  input: {schema: QuestionGeneratorInputSchema},
  output: {schema: QuestionGeneratorOutputSchema},
  prompt: `You are an expert educator. Your task is to generate a single, clear, and concise question for a student based on the provided topic.
You must also provide the correct, final answer for that question.

The question should be appropriate for a high school level. Do not provide the steps to solve it, just the question and the final answer.

Topic: {{{topic}}}
`,
});

const questionGeneratorFlow = ai.defineFlow(
  {
    name: 'questionGeneratorFlow',
    inputSchema: QuestionGeneratorInputSchema,
    outputSchema: QuestionGeneratorOutputSchema,
    retries: 3, // Retry up to 3 times on failure
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
