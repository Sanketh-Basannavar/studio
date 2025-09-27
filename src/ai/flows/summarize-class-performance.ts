'use server';

/**
 * @fileOverview A Genkit flow for summarizing class performance data.
 *
 * - summarizeClassPerformance - A function that analyzes class data and returns a summary.
 * - SummarizeClassPerformanceInput - The input type for the function.
 * - SummarizeClassPerformanceOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeClassPerformanceInputSchema = z.object({
  classData: z.string().describe('A JSON string containing an array of student data, including their progress and subject-specific scores.'),
});
export type SummarizeClassPerformanceInput = z.infer<typeof SummarizeClassPerformanceInputSchema>;

const SummarizeClassPerformanceOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the class\'s overall performance, highlighting strengths and areas that need improvement.').optional(),
  error: z.string().optional(),
});
export type SummarizeClassPerformanceOutput = z.infer<typeof SummarizeClassPerformanceOutputSchema>;

export async function summarizeClassPerformance(input: SummarizeClassPerformanceInput): Promise<SummarizeClassPerformanceOutput> {
  return summarizeClassPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeClassPerformancePrompt',
  input: {schema: SummarizeClassPerformanceInputSchema},
  output: {schema: z.object({ summary: z.string() })},
  prompt: `You are an expert educational analyst. Based on the provided JSON data of student performance, generate a short, insightful summary (2-3 sentences) for a teacher. 
  
  Your summary should identify:
  1. The overall performance trend of the class.
  2. The subject(s) where students are strongest.
  3. The subject(s) where students are struggling the most.

  Analyze the following data:
  {{{classData}}}
`,
});

const summarizeClassPerformanceFlow = ai.defineFlow(
  {
    name: 'summarizeClassPerformanceFlow',
    inputSchema: SummarizeClassPerformanceInputSchema,
    outputSchema: SummarizeClassPerformanceOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await prompt(input);
      return { summary: output?.summary };
    } catch (e: any) {
        console.error("Error in summarizeClassPerformanceFlow:", e);
        return { error: "The AI summary service is currently unavailable. Please try again later." };
    }
  }
);
