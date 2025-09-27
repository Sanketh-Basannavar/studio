'use server';

/**
 * @fileOverview A Genkit flow for translating text content.
 *
 * - translateContent - A function that translates text to a specified language.
 * - TranslateContentInput - The input type for the translateContent function.
 * - TranslateContentOutput - The return type for the translateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateContentInputSchema = z.object({
  content: z.string().describe('The text content to be translated.'),
  targetLanguage: z.enum(['en', 'hi', 'kn']).describe('The target language code (en: English, hi: Hindi, kn: Kannada).'),
});
export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;

const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated text content.').optional(),
  error: z.string().optional(),
});
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;

export async function translateContent(input: TranslateContentInput): Promise<TranslateContentOutput> {
  return translateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: {schema: TranslateContentInputSchema},
  output: {schema: z.object({ translatedContent: z.string() })},
  prompt: `Translate the following text into the language specified by the target language code (en: English, hi: Hindi, kn: Kannada).
Do not transliterate. Provide a direct and accurate translation. For subject-specific technical terms (like in math or science), ensure you use the correct corresponding term in the target language.

Target Language: {{{targetLanguage}}}
Text to Translate:
"{{{content}}}"
`,
});

const translateContentFlow = ai.defineFlow(
  {
    name: 'translateContentFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslateContentOutputSchema,
    retries: 2,
  },
  async (input) => {
    // If the target language is English, no need to translate.
    if (input.targetLanguage === 'en') {
        return { translatedContent: input.content };
    }
    
    try {
      const {output} = await prompt(input);
      return { translatedContent: output?.translatedContent };
    } catch (e: any) {
        console.error("Error in translateContentFlow:", e);
        return { error: "The translation service is currently unavailable. Please try again later." };
    }
  }
);
