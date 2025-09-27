'use server';
/**
 * @fileOverview The central AI brain for the NeuroQuad application.
 * This flow orchestrates various AI features like Mistake Mapping, AI Twin updates, and AI Coaching.
 *
 * - neuroQuadBrain - The main entry point for all AI-driven features.
 * - NeuroQuadBrainInput - The Zod schema for the input to the main flow.
 * - NeuroQuadBrainOutput - The Zod schema for the output of the main flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { mistakeMapper, MistakeMapperInputSchema } from './mistake-mapper';
import { updateAiTwinProfile, AiTwinProfileUpdateInputSchema } from './ai-twin-profile-update';
import { suggestLessonPlan, LessonPlanSuggestionsInputSchema } from './lesson-plan-suggestions';
import { translateContent } from './translate-content';

// Define complex Zod schemas for the main brain flow

export const NeuroQuadBrainInputSchema = z.object({
  feature: z.enum([
    'MistakeMapper',
    'AITwin',
    'AICoach',
    'Accessibility',
    'EduCredits',
    'Accreditation',
  ]),
  student_id: z.string().optional(),
  teacher_id: z.string().optional(),
  context: z.object({
    question: z.string().optional(),
    student_answer: z.string().optional(),
    correct_answer: z.string().optional(),
    error_type: z
      .enum([
        'concept_gap',
        'careless_error',
        'language_issue',
        'disability_related',
        'none',
      ])
      .optional(),
    time_taken: z.string().optional(),
    mode: z.enum(['text', 'audio', 'visual']).optional(),
    language: z.enum(['en', 'hi', 'kn']).default('en'),
    previous_profile: z.any().optional(), // Using `any` for flexible JSON structure
    class_data: z.any().optional(), // Using `any` for flexible JSON structure
    disability_mode: z
      .enum(['dyslexia', 'adhd', 'hearing_impaired', 'none'])
      .optional(),
    activity: z
      .enum(['lesson_completed', 'quiz_attempted', 'peer_helped'])
      .optional(),
    accreditation_request: z.boolean().optional(),
  }),
});

export const NeuroQuadBrainOutputSchema = z.object({
  feature: z.string(),
  student_id: z.string().optional(),
  teacher_id: z.string().optional(),
  timestamp: z.string(),
  language: z.string(),
  result: z.object({
    diagnosis: z.string().optional(),
    remediation_steps: z.array(z.string()).optional(),
    ai_twin: z
      .object({
        strengths: z.array(z.string()).optional(),
        weaknesses: z.array(z.string()).optional(),
        learning_style: z.string().optional(),
        predicted_struggles: z.array(z.string()).optional(),
        recommended_next_step: z.string().optional(),
      })
      .optional(),
    teacher_plan: z
      .object({
        summary: z.string().optional(),
        next_lesson: z.string().optional(),
        worksheet: z.array(z.string()).optional(),
      })
      .optional(),
    accessibility_version: z.string().optional(),
    educredits: z
      .object({
        credits_earned: z.number().default(0),
        reason: z.string().optional(),
        balance: z.number().default(0),
        possible_rewards: z.array(z.string()).optional(),
      })
      .optional(),
    accreditation_record: z
      .object({
        enabled: z.boolean().default(false),
        block_id: z.string().optional(),
        certificate: z.string().optional(),
      })
      .optional(),
  }),
});

export type NeuroQuadBrainInput = z.infer<typeof NeuroQuadBrainInputSchema>;
export type NeuroQuadBrainOutput = z.infer<typeof NeuroQuadBrainOutputSchema>;

// The main exported function that clients will call
export async function neuroQuadBrain(input: NeuroQuadBrainInput): Promise<NeuroQuadBrainOutput> {
  return neuroQuadBrainFlow(input);
}

const neuroQuadBrainFlow = ai.defineFlow(
  {
    name: 'neuroQuadBrainFlow',
    inputSchema: NeuroQuadBrainInputSchema,
    outputSchema: NeuroQuadBrainOutputSchema,
  },
  async (input) => {
    const output: Partial<NeuroQuadBrainOutput> = {
      feature: input.feature,
      student_id: input.student_id,
      teacher_id: input.teacher_id,
      timestamp: new Date().toISOString(),
      language: input.context.language,
      result: {},
    };

    switch (input.feature) {
      case 'MistakeMapper':
        if (input.context.question && input.context.student_answer && input.context.correct_answer) {
            const mistakeResult = await mistakeMapper({
                question: input.context.question,
                studentAnswer: input.context.student_answer,
                correctAnswer: input.context.correct_answer,
            });

            const diagnosis = mistakeResult.analysis;
            const remediation_steps = ["Step 1: Review the concept.", "Step 2: Try a similar problem."];

            if (input.context.language !== 'en') {
                const translatedDiagnosis = await translateContent({ content: diagnosis, targetLanguage: input.context.language });
                const translatedSteps = await Promise.all(remediation_steps.map(async step => {
                    const result = await translateContent({ content: step, targetLanguage: input.context.language });
                    return result.translatedContent || step;
                }));
                output.result!.diagnosis = translatedDiagnosis.translatedContent || diagnosis;
                output.result!.remediation_steps = translatedSteps;
            } else {
                output.result!.diagnosis = diagnosis;
                output.result!.remediation_steps = remediation_steps;
            }
        }
        break;

      case 'AITwin':
        if (input.student_id && input.context.activity) {
            const profileUpdateResult = await updateAiTwinProfile({
                studentId: input.student_id,
                interactionData: `Activity: ${input.context.activity}, Time: ${input.context.time_taken}`,
            });
            output.result!.ai_twin = {
                strengths: ['Updated Strength'],
                weaknesses: ['Updated Weakness'],
                recommended_next_step: profileUpdateResult.recommendations,
                learning_style: "Visual",
                predicted_struggles: ["Complex word problems"]
            };
        }
        break;
        
      case 'AICoach':
        if (input.context.class_data) {
            const classDataString = JSON.stringify(input.context.class_data, null, 2);
            const lessonPlanResult = await suggestLessonPlan({
                classPerformanceData: classDataString
            });
            output.result!.teacher_plan = {
                summary: "Class is struggling with fractions.",
                next_lesson: lessonPlanResult.lessonPlanSuggestion,
                worksheet: [lessonPlanResult.worksheet],
            };
        }
        break;

      // Other features would be handled here in the future
      case 'Accessibility':
        output.result!.accessibility_version = "Content adjusted for " + input.context.disability_mode;
        break;
      case 'EduCredits':
        output.result!.educredits = {
            credits_earned: 10,
            reason: `Completed: ${input.context.activity}`,
            balance: (input.context.previous_profile?.educredits || 0) + 10,
            possible_rewards: ['New Badge', 'Bonus Lesson'],
        };
        break;
      case 'Accreditation':
        output.result!.accreditation_record = {
            enabled: true,
            block_id: `cert-${Date.now()}`,
            certificate: `Certificate of Achievement for ${input.student_id}`
        };
        break;
      default:
        // Handle unknown feature
        break;
    }

    // Ensure the output matches the full Zod schema, providing defaults if necessary
    return NeuroQuadBrainOutputSchema.parse(output);
  }
);
