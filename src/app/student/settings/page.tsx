import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Settings</CardTitle>
        <CardDescription>Manage your account and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Student settings will be available here.</p>
      </CardContent>
    </Card>
  );
}
