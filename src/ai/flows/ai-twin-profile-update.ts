'use server';

/**
 * @fileOverview Updates the AI Twin profile based on student interactions.
 *
 * - updateAiTwinProfile - A function that updates the AI Twin profile.
 * - AiTwinProfileUpdateInput - The input type for the updateAiTwinProfile function.
 * - AiTwinProfileUpdateOutput - The return type for the updateAiTwinProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTwinProfileUpdateInputSchema = z.object({
  studentId: z.string().describe('The unique identifier for the student.'),
  interactionData: z.string().describe('A string containing the data representing the student interaction within the app, such as completed lessons, quiz scores, and areas of difficulty.'),
});
export type AiTwinProfileUpdateInput = z.infer<typeof AiTwinProfileUpdateInputSchema>;

const AiTwinProfileUpdateOutputSchema = z.object({
  profileSummary: z.string().describe('A summary of the updated AI Twin profile, highlighting learning progress, strengths, and weaknesses.'),
  recommendations: z.string().describe('Personalized recommendations for the student based on their updated AI Twin profile.'),
});
export type AiTwinProfileUpdateOutput = z.infer<typeof AiTwinProfileUpdateOutputSchema>;

export async function updateAiTwinProfile(input: AiTwinProfileUpdateInput): Promise<AiTwinProfileUpdateOutput> {
  return aiTwinProfileUpdateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTwinProfileUpdatePrompt',
  input: {schema: AiTwinProfileUpdateInputSchema},
  output: {schema: AiTwinProfileUpdateOutputSchema},
  prompt: `You are an AI learning profile expert. Analyze the student's interaction data and update their AI Twin profile. Provide a summary of their learning progress, strengths, and weaknesses, and offer personalized recommendations.

Student ID: {{{studentId}}}
Interaction Data: {{{interactionData}}}

Profile Summary:
Recommendations:`,
});

const aiTwinProfileUpdateFlow = ai.defineFlow(
  {
    name: 'aiTwinProfileUpdateFlow',
    inputSchema: AiTwinProfileUpdateInputSchema,
    outputSchema: AiTwinProfileUpdateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
