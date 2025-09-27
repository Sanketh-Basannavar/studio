import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStudents, mockClassPerformance, mockRecentActivity } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, BookOpen, UserCheck } from "lucide-react";
import Link from "next/link";
import { ChartContainer, ChartTooltip, ChartTooltipContent, Bar, BarChart, XAxis, YAxis } from "@/components/ui/chart";

const chartConfig = {
  score: {
    label: "Average Score",
    color: "hsl(var(--primary))",
  },
};

export default function TeacherDashboardPage() {
  const students_needing_help = mockStudents.filter(s => s.progress < 60);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, Teacher!</h1>
        <p className="text-muted-foreground">Here's an overview of your class's progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground">students enrolled in your class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{mockClassPerformance.reduce((acc, c) => acc + c.averageScore, 0) / mockClassPerformance.length}%</div>
            <p className="text-xs text-muted-foreground">across all subjects</p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>AI Coaching</CardTitle>
                <CardDescription>Generate lesson plans and quizzes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/teacher/ai-coaching">
                        <BookOpen className="mr-2 h-4 w-4"/> Go to AI Coach
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Performance by Subject</CardTitle>
          <CardDescription>Average scores in the last assessment.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart accessibilityLayer data={mockClassPerformance}>
              <XAxis
                dataKey="subject"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="averageScore" fill="var(--color-score)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Students Needing Attention</CardTitle>
                <CardDescription>These students may need extra help.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                    {students_needing_help.map(student => (
                        <TableRow key={student.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={PlaceHolderImages.find(p => p.id === student.avatar)?.imageUrl} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium">{student.name}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="destructive">{student.progress}% Progress</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/teacher/students/${student.id}`}>View</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>Latest lesson completions and achievements.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {mockRecentActivity.map(activity => (
                        <li key={activity.id} className="flex items-center gap-4">
                            <div className="p-2 bg-secondary rounded-full">
                                <UserCheck className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground flex-grow">
                                <span className="font-semibold text-foreground">{activity.studentName}</span> {activity.activity}
                            </p>
                            <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
