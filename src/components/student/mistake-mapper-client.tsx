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
import { Loader, Wand2 } from 'lucide-react';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  question: z.string().min(10, 'Please enter a detailed question.'),
  studentAnswer: z.string().min(1, 'Please enter your answer.'),
  correctAnswer: z.string().min(1, 'Please enter the correct answer.'),
});

export default function MistakeMapperClient() {
  const [analysis, setAnalysis] = useState<MistakeMapperOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      studentAnswer: '',
      correctAnswer: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await mistakeMapper(values);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing mistake:', error);
      // Here you would show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., What is the integral of 2x dx?"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Answer</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 2x^2"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., x^2 + C"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Analyze Mistake
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <Card className="flex flex-col">
        <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>Here is a step-by-step breakdown of the solution.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 flex-grow">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {analysis && (
             <div
             className="prose prose-sm dark:prose-invert max-w-none"
             dangerouslySetInnerHTML={{
               __html: analysis.analysis.replace(/\n/g, '<br />'),
             }}
           />
          )}
          {!isLoading && !analysis && (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Your analysis will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
