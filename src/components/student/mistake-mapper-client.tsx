'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mistakeMapper, type MistakeMapperOutput } from '@/ai/flows/mistake-mapper';
import { generateQuestion, type QuestionGeneratorOutput } from '@/ai/flows/question-generator';
import { Loader, Wand2, Lightbulb } from 'lucide-react';
import { Separator } from '../ui/separator';
import MistakeSimilarityChart from './mistake-similarity-chart';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  studentAnswer: z.string().min(1, 'Please enter your answer.'),
});

export default function MistakeMapperClient() {
  const [analysis, setAnalysis] = useState<MistakeMapperOutput | null>(null);
  const [generatedQuestion, setGeneratedQuestion] = useState<QuestionGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentAnswer: '',
    },
  });

  async function handleGenerateQuestion() {
    setIsGeneratingQuestion(true);
    setAnalysis(null);
    setGeneratedQuestion(null);
    setIsCorrect(null);
    form.reset();
    try {
      const result = await generateQuestion({ topic: 'High School Algebra' });
      setGeneratedQuestion(result);
    } catch (error) {
      console.error('Error generating question:', error);
      // You would show a toast here
    } finally {
      setIsGeneratingQuestion(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!generatedQuestion) return;
    setIsLoading(true);
    setAnalysis(null);
    setIsCorrect(null);
    try {
      const result = await mistakeMapper({
        question: generatedQuestion.question,
        studentAnswer: values.studentAnswer,
        correctAnswer: generatedQuestion.correctAnswer,
      });
      setAnalysis(result);
      if (result.similarityScore > 99) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } catch (error) {
      console.error('Error analyzing mistake:', error);
      // Here you would show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        {!generatedQuestion && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground p-12 text-center h-full">
             <h3 className="text-lg font-semibold">Get Started</h3>
            <p className="text-sm text-muted-foreground mb-4">Generate a question to test your knowledge.</p>
            <Button onClick={handleGenerateQuestion} disabled={isGeneratingQuestion}>
              {isGeneratingQuestion ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate New Question
                </>
              )}
            </Button>
          </div>
        )}

        {isGeneratingQuestion && !generatedQuestion && (
            <div className="flex items-center justify-center rounded-lg border border-dashed p-12">
                <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}

        {generatedQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>Your Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-6">{generatedQuestion.question}</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="studentAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Answer</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type your answer here..." rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Submit for Analysis
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleGenerateQuestion} disabled={isLoading || isGeneratingQuestion}>
                      New Question
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
          <CardDescription>
            {isCorrect === false ? "Here's a breakdown of your mistake." : "Your analysis will appear here."}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 flex-grow flex flex-col gap-4">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {isCorrect === true && analysis && (
            <Alert variant="default" className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400">
                <AlertTitle className="font-bold">Correct!</AlertTitle>
                <AlertDescription>
                    Your answer is correct. Your similarity score is {analysis.similarityScore.toFixed(0)}%. Great job!
                </AlertDescription>
            </Alert>
          )}

          {isCorrect === false && analysis && (
            <>
              <MistakeSimilarityChart score={analysis.similarityScore} />
              <Separator />
              <div
                className="prose prose-sm dark:prose-invert max-w-none flex-grow"
                dangerouslySetInnerHTML={{
                  __html: analysis.analysis.replace(/\n/g, '<br />'),
                }}
              />
            </>
          )}

          {!isLoading && isCorrect === null && (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">Submit your answer to see the AI analysis.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
