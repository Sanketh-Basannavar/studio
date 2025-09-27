import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Book, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockTeacherTwin = {
    teachingStrengths: ["Clear Explanations", "Student Engagement", "Use of Analogies"],
    classChallenges: ["Pacing for diverse levels", "Maintaining focus during long lessons"],
    planningStyle: "Structured & Visual",
    recommendations: [
        "You spend 30% more time on math corrections. Try using the AI Coach to generate targeted worksheets for common mistake patterns.",
        "Your biology class average is slightly below the school's. Consider incorporating more visual aids or interactive simulations.",
        "Students respond well to your use of analogies. Create a shared document of the best ones to use as a study guide."
    ]
};

export default function TeacherAiTwinPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2"><Sparkles /> Teacher AI Twin</h1>
                <p className="text-muted-foreground">Personalized insights to enhance your teaching effectiveness.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Planning Style</CardTitle>
                        <Book className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockTeacherTwin.planningStyle}</div>
                        <p className="text-xs text-muted-foreground">
                            Favors well-organized, visually-supported lesson plans.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Top Strength</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockTeacherTwin.teachingStrengths[0]}</div>
                        <p className="text-xs text-muted-foreground">
                            Excels at breaking down complex topics.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Biggest Challenge</CardTitle>
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockTeacherTwin.classChallenges[0]}</div>
                         <p className="text-xs text-muted-foreground">
                            Addressing the needs of all students simultaneously.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>AI-Generated Recommendations</CardTitle>
                    <CardDescription>Actionable suggestions from your AI Twin to save you time and improve outcomes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        {mockTeacherTwin.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50">
                                <div className="p-2 rounded-full bg-primary/20 text-primary mt-1">
                                    <Lightbulb className="h-5 w-5" />
                                </div>
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Strengths</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {mockTeacherTwin.teachingStrengths.map((strength) => (
                            <Badge key={strength} variant="default" className="bg-primary/80">{strength}</Badge>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Common Class Challenges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {mockTeacherTwin.classChallenges.map((area) => (
                            <Badge key={area} variant="secondary">{area}</Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
