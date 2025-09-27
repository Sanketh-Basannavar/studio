'use server';
/**
 * @fileOverview Converts text to speech using a Genkit flow.
 *
 * - lessonToSpeech - A function that takes text and returns an audio data URI.
 * - LessonToSpeechOutput - The return type for the lessonToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const LessonToSpeechOutputSchema = z.object({
  media: z.string().describe('The base64 encoded audio data with a data URI scheme.'),
});
export type LessonToSpeechOutput = z.infer<typeof LessonToSpeechOutputSchema>;

export async function lessonToSpeech(text: string): Promise<LessonToSpeechOutput> {
  return lessonToSpeechFlow(text);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const lessonToSpeechFlow = ai.defineFlow(
  {
    name: 'lessonToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: LessonToSpeechOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
