'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing lesson plan suggestions based on student performance data.
 *
 * - suggestLessonPlan - A function that takes student performance data and provides lesson plan suggestions.
 * - LessonPlanSuggestionsInput - The input type for the suggestLessonPlan function.
 * - LessonPlanSuggestionsOutput - The return type for the suggestLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LessonPlanSuggestionsInputSchema = z.object({
  classPerformanceData: z
    .string()
    .describe(
      'A detailed summary of student performance data, including areas of strength and weakness.'
    ),
});
export type LessonPlanSuggestionsInput = z.infer<
  typeof LessonPlanSuggestionsInputSchema
>;

const LessonPlanSuggestionsOutputSchema = z.object({
  lessonPlanSuggestion: z.string().describe('Suggested lesson plan.'),
  worksheet: z.string().describe('Automatically generated worksheet.'),
  quiz: z.string().describe('Automatically generated quiz.'),
});
export type LessonPlanSuggestionsOutput = z.infer<
  typeof LessonPlanSuggestionsOutputSchema
>;

export async function suggestLessonPlan(
  input: LessonPlanSuggestionsInput
): Promise<LessonPlanSuggestionsOutput> {
  return suggestLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lessonPlanSuggestionsPrompt',
  input: {schema: LessonPlanSuggestionsInputSchema},
  output: {schema: LessonPlanSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to help teachers create lesson plans based on student performance data.

  Based on the following student performance data, please provide a lesson plan suggestion, a worksheet, and a quiz.

  Student Performance Data: {{{classPerformanceData}}}
  `,
});

const suggestLessonPlanFlow = ai.defineFlow(
  {
    name: 'suggestLessonPlanFlow',
    inputSchema: LessonPlanSuggestionsInputSchema,
    outputSchema: LessonPlanSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
