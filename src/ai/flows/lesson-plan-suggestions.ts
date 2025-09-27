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
  worksheet: z.string().describe('Automatically generated worksheet with 5 practice problems.'),
  quiz: z.string().describe('Automatically generated quiz with 3 multiple-choice questions.'),
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

Based on the following student performance data, please perform the following tasks:
1.  Provide a concise and actionable lesson plan suggestion to address the key areas of weakness.
2.  Generate a worksheet with 5 practice problems that target these weaknesses. The problems should be clear and relevant.
3.  Generate a short quiz with 3 multiple-choice questions to assess understanding of the concepts covered in the lesson and worksheet. Include the correct answer for each question.

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
