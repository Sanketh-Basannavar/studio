import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Settings</CardTitle>
        <CardDescription>Manage your teacher account and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Teacher settings will be available here.</p>
      </CardContent>
    </Card>
  );
}
