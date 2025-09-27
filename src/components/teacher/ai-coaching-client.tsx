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
import { summarizeClassPerformance } from '@/ai/flows/summarize-class-performance';
import { Loader, Wand2, Send, Sparkles } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useToast } from '@/hooks/use-toast';
import { mockAssignments, mockClassPerformance, mockStudents } from '@/lib/mock-data';

const formSchema = z.object({
  classPerformanceData: z.string().min(20, 'Please provide a more detailed summary of class performance.'),
});

export default function AiCoachingClient() {
  const [suggestions, setSuggestions] = useState<LessonPlanSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classPerformanceData: '',
    },
  });

  async function handleGenerateSummary() {
    setIsSummarizing(true);
    try {
      const classData = {
        students: mockStudents,
        performance: mockClassPerformance,
      };
      const result = await summarizeClassPerformance({ classData: JSON.stringify(classData) });
      if (result.summary) {
        form.setValue('classPerformanceData', result.summary);
      } else {
        throw new Error(result.error || 'Failed to generate summary.');
      }
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Summary Failed',
            description: error.message || 'The AI assistant could not generate a summary.',
        });
    } finally {
        setIsSummarizing(false);
    }
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions(null);
    setIsAssigned(false);
    try {
      const result = await suggestLessonPlan(values);
      setSuggestions(result);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'The AI assistant failed to generate materials. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleAssignToClass() {
    if (!suggestions) return;
    
    // This is a mock implementation. In a real app, this would be a server action.
    const newWorksheet = {
        id: `assign-${Date.now()}-ws`,
        title: 'AI-Generated Worksheet',
        subject: 'Mixed Review',
        dueDate: '7 days',
        type: 'Worksheet' as const,
        content: suggestions.worksheet,
    };
    const newQuiz = {
        id: `assign-${Date.now()}-qz`,
        title: 'AI-Generated Quiz',
        subject: 'Mixed Review',
        dueDate: '7 days',
        type: 'Quiz' as const,
        content: suggestions.quiz,
    };

    // Add to the beginning of the mock data array
    mockAssignments.unshift(newWorksheet, newQuiz);

    toast({
        title: 'Assigned to Class!',
        description: 'The new worksheet and quiz are now visible to all students.',
    });
    setIsAssigned(true);
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
                <div className="flex justify-between items-center">
                    <FormLabel>Class Performance Summary</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={handleGenerateSummary} disabled={isSummarizing}>
                        {isSummarizing ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        AI Summary
                    </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Click 'AI Summary' to auto-generate an analysis of class performance, or type your own summary here. e.g., The class is excelling in basic algebra but struggling with quadratic equations."
                    rows={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || isSummarizing}>
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
        <CardContent className="pt-6 flex-grow flex flex-col">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {suggestions && (
             <Tabs defaultValue="lesson-plan" className="w-full flex-grow flex flex-col">
                <TabsList>
                  <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
                  <TabsTrigger value="worksheet">Worksheet</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>
                <div className="mt-4 prose prose-sm dark:prose-invert max-w-none flex-grow">
                  <TabsContent value="lesson-plan">
                    <div dangerouslySetInnerHTML={{ __html: suggestions.lessonPlanSuggestion.replace(/\n/g, '<br />') }} />
                  </TabsContent>
                  <TabsContent value="worksheet">
                    <div dangerouslySetInnerHTML={{ __html: suggestions.worksheet.replace(/\n/g, '<br />') }} />
                  </TabsContent>
                  <TabsContent value="quiz">
                    <div dangerouslySetInnerHTML={{ __html: suggestions.quiz.replace(/\n/g, '<br />') }} />
                  </TabsContent>
                </div>
                 <div className="mt-4 pt-4 border-t">
                    <Button onClick={handleAssignToClass} disabled={isAssigned}>
                        <Send className="mr-2 h-4 w-4" />
                        {isAssigned ? 'Assigned to Class' : 'Assign to Class'}
                    </Button>
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
