import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { mockStudents, mockAiTwinProfile } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Book, Brain, Star, TrendingUp, Zap } from "lucide-react";

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = mockStudents.find(s => s.id === params.id);

  if (!student) {
    notFound();
  }
  
  const avatarImage = PlaceHolderImages.find(p => p.id === student.avatar);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary">
          {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={avatarImage.description} data-ai-hint={avatarImage.imageHint} />}
          <AvatarFallback className="text-3xl">{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{student.name}'s Profile</h1>
          <p className="text-muted-foreground">AI Twin analysis of student learning profile.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Same info cards as student profile */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Style</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.learningStyle}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.topSubject}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pace</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.pace}</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Administer EduCredits</CardTitle>
                <CardDescription>Current: {student.eduCredits.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
                <Input type="number" placeholder="e.g., 100" />
                <Button>Award</Button>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp /> Strengths</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {mockAiTwinProfile.strengths.map((strength) => (
              <Badge key={strength} variant="default" className="bg-primary/80">{strength}</Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Book /> Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {mockAiTwinProfile.improvementAreas.map((area) => (
              <Badge key={area} variant="secondary">{area}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject Mastery</CardTitle>
          <CardDescription>Student's estimated proficiency in different subjects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAiTwinProfile.subjectMastery.map(subject => (
            <div key={subject.subject}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{subject.subject}</span>
                <span className="text-sm font-medium text-primary">{subject.mastery}%</span>
              </div>
              <Progress value={subject.mastery} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
