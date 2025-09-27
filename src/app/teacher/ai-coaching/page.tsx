import AiCoachingClient from "@/components/teacher/ai-coaching-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiCoachingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">AI Coaching Assistant</CardTitle>
        <CardDescription>
          Summarize class performance to generate tailored lesson plans, worksheets, and quizzes to address specific learning gaps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AiCoachingClient />
      </CardContent>
    </Card>
  );
}
