'use client';
import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Brain, Ear, Eye, Loader } from 'lucide-react';
import { lessonToSpeech } from '@/ai/flows/text-to-speech';
import { mockLessons } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function SampleLessonPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false);
  const [isAdhdFriendly, setIsAdhdFriendly] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const lesson = mockLessons.find(l => l.id === params.id);

  if (!lesson || !lesson.content) {
    notFound();
  }

  const lessonTextForAudio = lesson.content.sections.map(s => `${s.heading}\n${s.paragraphs.join('\n')}`).join('\n\n');

  const handleAudioToggle = async (checked: boolean) => {
    setIsAudioEnabled(checked);
    if (checked && !audioData) {
      setIsGeneratingAudio(true);
      try {
        const result = await lessonToSpeech(lessonTextForAudio);
        if (result.media) {
          setAudioData(result.media);
        } else {
          // If there's an error message in the response, show a toast.
          toast({
              variant: "destructive",
              title: "Audio Generation Failed",
              description: result.error || "An unknown error occurred while generating audio.",
          });
          setIsAudioEnabled(false); // Toggle the switch off
        }
      } catch (error: any) {
        // This will catch unexpected network errors or if the flow itself crashes.
        console.error("Failed to generate audio", error);
        toast({
            variant: "destructive",
            title: "Audio Generation Failed",
            description: "We couldn't generate the audio for this lesson. Please try again later.",
        });
        setIsAudioEnabled(false);
      } finally {
        setIsGeneratingAudio(false);
      }
    }
  };


  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className={cn('lg:col-span-2 space-y-6', isAdhdFriendly && 'adhd-focus')}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{lesson.title}</CardTitle>
            <CardDescription>{lesson.content.description}</CardDescription>
          </CardHeader>
          <CardContent className={cn('prose dark:prose-invert max-w-none', isDyslexiaFriendly ? 'dyslexia-friendly' : 'prose-lg')}>
            {lesson.content.sections.map((section, index) => (
              <div key={index}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p.includes('→') ? `<code>${p}</code>` : p }}></p>
                ))}
              </div>
            ))}
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
              <Label htmlFor="audio-mode" className="flex-grow">Enable Audio</Label>
              <Switch
                id="audio-mode"
                checked={isAudioEnabled}
                onCheckedChange={handleAudioToggle}
              />
            </div>
          </CardContent>
        </Card>
        {(isGeneratingAudio || (isAudioEnabled && audioData)) && (
          <Card>
            <CardHeader>
              <CardTitle>Lesson Audio</CardTitle>
            </CardHeader>
            <CardContent>
              {isGeneratingAudio ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Loader className="h-5 w-5 animate-spin"/>
                  <span>Generating audio...</span>
                </div>
              ) : (
                audioData && (
                  <audio controls className="w-full" src={audioData}>
                    Your browser does not support the audio element.
                  </audio>
                )
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
