'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Brain, Ear, Eye, Loader } from 'lucide-react';
import { lessonToSpeech } from '@/ai/flows/text-to-speech';

const lessonContent = {
  title: 'The Power of Photosynthesis',
  description: 'An introductory lesson to how plants create their own food.',
  sections: [
    {
      heading: 'What is Photosynthesis?',
      paragraphs: [
        'Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into sugars (glucose) and oxygen. This process is fundamental to life on Earth as it provides the primary source of energy for most ecosystems and releases the oxygen we breathe.',
      ],
    },
    {
      heading: 'The Chemical Equation',
      paragraphs: [
        'The overall balanced equation for photosynthesis is:',
        '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂',
        'This means that six molecules of carbon dioxide and six molecules of water react in the presence of light to produce one molecule of glucose (a sugar) and six molecules of oxygen.',
      ],
    },
    {
      heading: 'Where Does It Happen?',
      paragraphs: [
        'Photosynthesis takes place inside plant cells in small organelles called chloroplasts. Chloroplasts contain a green pigment called chlorophyll, which is what absorbs the light energy from the sun. The entire process is split into two main stages: the light-dependent reactions and the Calvin cycle (light-independent reactions).',
      ],
    },
  ],
};

const lessonTextForAudio = lessonContent.sections.map(s => `${s.heading}\n${s.paragraphs.join('\n')}`).join('\n\n');


export default function SampleLessonPage() {
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false);
  const [isAdhdFriendly, setIsAdhdFriendly] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const handleAudioToggle = async (checked: boolean) => {
    setIsAudioEnabled(checked);
    if (checked && !audioData) {
      setIsGeneratingAudio(true);
      try {
        const result = await lessonToSpeech(lessonTextForAudio);
        if (result.media) {
          setAudioData(result.media);
        }
      } catch (error) {
        console.error("Failed to generate audio", error);
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
            <CardTitle className="font-headline text-3xl">{lessonContent.title}</CardTitle>
            <CardDescription>{lessonContent.description}</CardDescription>
          </CardHeader>
          <CardContent className={cn('prose prose-lg dark:prose-invert max-w-none', isDyslexiaFriendly && 'font-serif')}>
            {lessonContent.sections.map((section, index) => (
              <div key={index}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p.startsWith('6CO₂') ? '<code>6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂</code>' : p }}></p>
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
