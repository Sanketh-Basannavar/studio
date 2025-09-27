import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { mockStudent, mockAiTwinProfile } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Book, Brain, Star, TrendingUp, Zap } from "lucide-react";

export default function StudentProfilePage() {
  const avatarImage = PlaceHolderImages.find(p => p.id === mockStudent.avatar);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary">
          {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={avatarImage.description} data-ai-hint={avatarImage.imageHint} />}
          <AvatarFallback className="text-3xl">{mockStudent.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{mockStudent.name}</h1>
          <p className="text-muted-foreground">Here is your AI Twin's analysis of your learning profile.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Style</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.learningStyle}</div>
            <p className="text-xs text-muted-foreground">
              Prefers hands-on and visual learning methods.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.topSubject}</div>
            <p className="text-xs text-muted-foreground">
              Excellent performance in mathematical concepts.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pace</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAiTwinProfile.pace}</div>
            <p className="text-xs text-muted-foreground">
              Learns new concepts faster than average.
            </p>
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
          <CardDescription>Your estimated proficiency in different subjects.</CardDescription>
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
      
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to boost your learning.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {mockAiTwinProfile.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
