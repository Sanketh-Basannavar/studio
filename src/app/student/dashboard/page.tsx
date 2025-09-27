import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { mockStudent, mockLessons } from "@/lib/mock-data";
import { ArrowRight, BookOpen, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {mockStudent.name}!</h1>
        <p className="text-muted-foreground">Here's a summary of your learning journey today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-accent" />
              <span>EduCredits</span>
            </CardTitle>
            <CardDescription>Your rewards for learning and progress.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-grow">
            <div className="text-6xl font-bold text-primary">{mockStudent.eduCredits.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">points earned</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>You're doing great, keep it up!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-grow gap-4">
             <div className="relative h-32 w-32">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="stroke-current text-gray-200 dark:text-gray-700"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="4"
                ></path>
                <path
                  className="stroke-current text-primary"
                  strokeDasharray={`${mockStudent.progress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">{mockStudent.progress}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Twin Insights</CardTitle>
            <CardDescription>Personalized tips from your AI Twin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg bg-secondary">
              <div className="p-2 rounded-full bg-primary/20 text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <p className="text-sm">You've mastered linear equations! Great job. Try tackling quadratic equations next.</p>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-lg bg-secondary">
              <div className="p-2 rounded-full bg-accent/20 text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <p className="text-sm">Review the lesson on "Photosynthesis" to improve your score in Biology.</p>
            </div>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/student/profile">View Full Profile <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lessons</CardTitle>
          <CardDescription>Here are the next lessons on your learning path.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {mockLessons.map((lesson, index) => (
              <li key={lesson.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${lesson.completed ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {lesson.completed ? <CheckCircle className="h-5 w-5"/> : <BookOpen className="h-5 w-5"/>}
                    </div>
                    <div>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {lesson.completed && <Badge variant="default">Completed</Badge>}
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/student/lesson"><ArrowRight className="h-4 w-4"/></Link>
                    </Button>
                  </div>
                </div>
                {index < mockLessons.length - 1 && <Separator className="mt-4" />}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
