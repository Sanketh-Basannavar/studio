'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Brain, Ear, Eye } from "lucide-react";

export default function SampleLessonPage() {
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false);
  const [isAdhdFriendly, setIsAdhdFriendly] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className={cn("lg:col-span-2 space-y-6", isAdhdFriendly && "adhd-focus")}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">The Power of Photosynthesis</CardTitle>
            <CardDescription>An introductory lesson to how plants create their own food.</CardDescription>
          </CardHeader>
          <CardContent className={cn("prose prose-lg dark:prose-invert max-w-none", isDyslexiaFriendly && "font-serif")}>
            <h2>What is Photosynthesis?</h2>
            <p>
              Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into
              chemical energy, through a process that converts carbon dioxide and water into sugars (glucose) and oxygen.
              This process is fundamental to life on Earth as it provides the primary source of energy for most ecosystems
              and releases the oxygen we breathe.
            </p>
            <h3>The Chemical Equation</h3>
            <p>The overall balanced equation for photosynthesis is:</p>
            <pre><code>6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂</code></pre>
            <p>
              This means that six molecules of carbon dioxide and six molecules of water react in the presence of light
              to produce one molecule of glucose (a sugar) and six molecules of oxygen.
            </p>
            <h3>Where Does It Happen?</h3>
            <p>
              Photosynthesis takes place inside plant cells in small organelles called chloroplasts. Chloroplasts contain a
              green pigment called chlorophyll, which is what absorbs the light energy from the sun. The entire process
              is split into two main stages: the light-dependent reactions and the Calvin cycle (light-independent reactions).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Tools</CardTitle>
            <CardDescription>Adjust the content to your learning needs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
              <Eye className="h-5 w-5 text-primary" />
              <Label htmlFor="dyslexia-mode" className="flex-grow">Dyslexia Friendly Font</Label>
              <Switch
                id="dyslexia-mode"
                checked={isDyslexiaFriendly}
                onCheckedChange={setIsDyslexiaFriendly}
              />
            </div>
            <Separator />
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
              <Brain className="h-5 w-5 text-primary" />
              <Label htmlFor="adhd-mode" className="flex-grow">ADHD Focus Mode</Label>
              <Switch
                id="adhd-mode"
                checked={isAdhdFriendly}
                onCheckedChange={setIsAdhdFriendly}
              />
            </div>
            <Separator />
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
              <Ear className="h-5 w-5 text-primary" />
              <Label htmlFor="transcript-mode" className="flex-grow">Show Transcript</Label>
              <Switch
                id="transcript-mode"
                checked={showTranscript}
                onCheckedChange={setShowTranscript}
              />
            </div>
          </CardContent>
        </Card>
        {showTranscript && (
          <Card>
            <CardHeader>
              <CardTitle>Audio Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                (Audio starts) "Hello students! Welcome to our lesson on Photosynthesis. Today, we're going to explore the amazing process that allows plants to make their own food. Let's start with the basics. What is Photosynthesis? It's how plants use sunlight, water, and gases in the air to create glucose, which is their food. This process also releases oxygen, which is essential for us to breathe..." (Audio continues).
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
