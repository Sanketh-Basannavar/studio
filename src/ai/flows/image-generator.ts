'use server';

/**
 * @fileOverview A Genkit flow for generating images based on lesson content.
 *
 * - generateImageForLesson - A function that generates an image for a lesson section.
 * - ImageGeneratorInput - The input type for the generateImageForLesson function.
 * - ImageGeneratorOutput - The return type for the generateImageForan function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const ImageGeneratorInputSchema = z.object({
  lessonContent: z.string().describe('The text content of the lesson section to generate an image for.'),
});
export type ImageGeneratorInput = z.infer<typeof ImageGeneratorInputSchema>;

const ImageGeneratorOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.').optional(),
  error: z.string().optional(),
});
export type ImageGeneratorOutput = z.infer<typeof ImageGeneratorOutputSchema>;

export async function generateImageForLesson(input: ImageGeneratorInput): Promise<ImageGeneratorOutput> {
  return imageGeneratorFlow(input);
}

const imageGeneratorFlow = ai.defineFlow(
  {
    name: 'imageGeneratorFlow',
    inputSchema: ImageGeneratorInputSchema,
    outputSchema: ImageGeneratorOutputSchema,
    retries: 1, // Let's not retry too many times for image gen
  },
  async (input) => {
    try {
      const { media } = await ai.generate({
        model: googleAI.model('imagen-4.0-fast-generate-001'),
        prompt: `Generate a simple, clear, and educational illustration that visually explains the following concept for a student. The image should be in a clean, vector-art style. Concept: "${input.lessonContent}"`,
      });
      if (media.url) {
        return { imageUrl: media.url };
      }
      return { error: 'Image generation failed to return a URL.' };
    } catch (e: any) {
        console.error("Error in imageGeneratorFlow:", e);
        return { error: "The image generation service is currently unavailable." };
    }
  }
);
