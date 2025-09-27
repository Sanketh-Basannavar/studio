import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockStudents } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Students</h1>
        <p className="text-muted-foreground">
          View profiles, track progress, and manage your students.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockStudents.map(student => {
          const avatarImage = PlaceHolderImages.find(p => p.id === student.avatar);
          return (
            <Card key={student.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                  {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={student.name} data-ai-hint="student avatar" />}
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{student.name}</CardTitle>
                  <CardDescription>ID: {student.id}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
                <Progress value={student.progress} className="h-2"/>
                <div className="text-right text-sm font-bold mt-1 text-primary">{student.progress}%</div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/teacher/students/${student.id}`}>View Profile <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
