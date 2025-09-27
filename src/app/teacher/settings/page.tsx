'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Brush, ChevronRight, Download, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function TeacherSettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(checked);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Settings</CardTitle>
          <CardDescription>Manage your teacher account and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-4">
              <Brush className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleThemeChange}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Bell /> Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Weekly Class Reports</Label>
                <Switch id="weekly-reports" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="student-milestones">Student Milestone Alerts</Label>
                <Switch id="student-milestones" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Button asChild variant="outline" className="w-full">
            <Link href="#">
              <Download className="mr-2" /> Export Student Data
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full justify-between">
            <Link href="#">
              Account & Subscription
              <ChevronRight />
            </Link>
          </Button>
          
          <Button asChild variant="destructive" className="w-full">
            <Link href="/">
              <LogOut className="mr-2" /> Log Out
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
