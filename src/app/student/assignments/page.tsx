
import { BookCheck, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAssignments } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';

export default function AssignmentsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><BookCheck /> Assignments</h1>
                <p className="text-muted-foreground">Worksheets and quizzes assigned by your teacher.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Assignments</CardTitle>
                    <CardDescription>
                        Complete these assignments to practice your skills and show your understanding.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {mockAssignments.map((item, index) => (
                            <li key={item.id}>
                                <div className="grid gap-4 md:grid-cols-3 items-center">
                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{item.subject}</span>
                                            <Separator orientation="vertical" className="h-4" />
                                            <span>Due in {item.dueDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-self-end items-center">
                                        <Badge variant={item.type === 'Quiz' ? 'destructive' : 'secondary'}>{item.type}</Badge>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                                {index < mockAssignments.length - 1 && <Separator className="my-4" />}
                            </li>
                        ))}
                    </ul>
                     {mockAssignments.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            You have no pending assignments. Great job!
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
