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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { suggestLessonPlan, type LessonPlanSuggestionsOutput } from '@/ai/flows/lesson-plan-suggestions';
import { Loader, Wand2 } from 'lucide-react';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  classPerformanceData: z.string().min(20, 'Please provide a more detailed summary of class performance.'),
});

export default function AiCoachingClient() {
  const [suggestions, setSuggestions] = useState<LessonPlanSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classPerformanceData: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await suggestLessonPlan(values);
      setSuggestions(result);
    } catch (error) {
      console.error('Error getting suggestions:', error);
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
            name="classPerformanceData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Performance Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., The class is excelling in basic algebra but struggling with quadratic equations. Specifically, factoring trinomials is a major pain point. Average quiz score on this topic was 55%."
                    rows={8}
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
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Lesson Plan
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <Card className="flex flex-col">
        <CardHeader>
            <CardTitle>Generated Materials</CardTitle>
            <CardDescription>Your AI-generated teaching aids will appear here.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 flex-grow">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {suggestions && (
             <Tabs defaultValue="lesson-plan" className="w-full">
                <TabsList>
                  <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
                  <TabsTrigger value="worksheet">Worksheet</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                <div className="mt-4 prose prose-sm dark:prose-invert max-w-none">
                  <TabsContent value="lesson-plan" dangerouslySetInnerHTML={{ __html: suggestions.lessonPlanSuggestion.replace(/\n/g, '<br />') }} />
                  <TabsContent value="worksheet" dangerouslySetInnerHTML={{ __html: suggestions.worksheet.replace(/\n/g, '<br />') }} />
                  <TabsContent value="quiz" dangerouslySetInnerHTML={{ __html: suggestions.quiz.replace(/\n/g, '<br />') }} />
                </div>
            </Tabs>
          )}
          {!isLoading && !suggestions && (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center">Your generated lesson plan, worksheet, and quiz will be displayed here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
