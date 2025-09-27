import MistakeMapperClient from "@/components/student/mistake-mapper-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MistakeMapperPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Mistake Mapper</CardTitle>
        <CardDescription>
          Stuck on a problem? Let your AI twin help you understand your mistakes and learn how to solve it correctly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MistakeMapperClient />
      </CardContent>
    </Card>
  );
}
