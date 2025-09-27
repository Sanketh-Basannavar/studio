'use client';
import { useState, useMemo, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Brain, Ear, Eye, Loader, FileImage, Globe } from 'lucide-react';
import { lessonToSpeech } from '@/ai/flows/text-to-speech';
import { generateImageForLesson } from '@/ai/flows/image-generator';
import { translateContent } from '@/ai/flows/translate-content';
import { mockLessons } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type LessonContentType = typeof mockLessons[0]['content'];
type GeneratedImages = { [key: number]: string };
type ImageLoadingState = { [key: number]: boolean };

export default function SampleLessonPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isDyslexiaFriendly, setIsDyslexiaFriendly] = useState(false);
  const [isAdhdFriendly, setIsAdhdFriendly] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVisualMode, setIsVisualMode] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImages>({});
  const [isGeneratingImages, setIsGeneratingImages] = useState<ImageLoadingState>({});
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedContent, setTranslatedContent] = useState<LessonContentType | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const originalLesson = useMemo(() => mockLessons.find(l => l.id === params.id), [params.id]);

  useEffect(() => {
    if (!originalLesson) return;

    if (targetLanguage === 'en') {
      setTranslatedContent(originalLesson.content);
      return;
    }

    const translateLessonContent = async () => {
      setIsTranslating(true);
      try {
        const titlePromise = translateContent({ content: originalLesson.content.title, targetLanguage });
        const descriptionPromise = translateContent({ content: originalLesson.content.description, targetLanguage });
        const sectionsPromises = originalLesson.content.sections.map(async (section) => {
          const headingPromise = translateContent({ content: section.heading, targetLanguage });
          const paragraphsPromises = section.paragraphs.map(p => translateContent({ content: p, targetLanguage }));
          
          const [translatedHeadingResult, ...translatedParagraphsResults] = await Promise.all([headingPromise, ...paragraphsPromises]);

          if (translatedHeadingResult.error || translatedParagraphsResults.some(p => p.error)) {
            throw new Error('Failed to translate one or more sections.');
          }

          return {
            heading: translatedHeadingResult.translatedContent || section.heading,
            paragraphs: translatedParagraphsResults.map((p, i) => p.translatedContent || section.paragraphs[i]),
          };
        });

        const [titleResult, descriptionResult, ...sectionsResults] = await Promise.all([
          titlePromise,
          descriptionPromise,
          ...sectionsPromises,
        ]);

        if (titleResult.error || descriptionResult.error) {
            throw new Error('Failed to translate title or description.');
        }

        const newContent: LessonContentType = {
          title: titleResult.translatedContent || originalLesson.content.title,
          description: descriptionResult.translatedContent || originalLesson.content.description,
          sections: sectionsResults,
        };
        
        setTranslatedContent(newContent);

      } catch (error: any) {
        console.error("Translation failed", error);
        toast({
          variant: 'destructive',
          title: 'Translation Failed',
          description: error.message || 'Could not translate the lesson content.',
        });
        setTargetLanguage('en'); // Revert to English on failure
      } finally {
        setIsTranslating(false);
      }
    };

    translateLessonContent();
  }, [targetLanguage, originalLesson, toast]);

  const lesson = originalLesson;
  const lessonContent = translatedContent || lesson?.content;

  if (!lesson || !lessonContent) {
    if (originalLesson) return <div className="flex justify-center items-center h-full"><Loader className="h-8 w-8 animate-spin"/></div>;
    notFound();
  }

  const lessonTextForAudio = lessonContent.sections.map(s => `${s.heading}\n${s.paragraphs.join('\n')}`).join('\n\n');

  const handleAudioToggle = async (checked: boolean) => {
    setIsAudioEnabled(checked);
    if (checked && !audioData) {
      setIsGeneratingAudio(true);
      try {
        const result = await lessonToSpeech(lessonTextForAudio);
        if (result.media) {
          setAudioData(result.media);
        } else {
          toast({
              variant: "destructive",
              title: "Audio Generation Failed",
              description: result.error || "An unknown error occurred while generating audio.",
          });
          setIsAudioEnabled(false);
        }
      } catch (error: any) {
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

  const handleVisualModeToggle = (checked: boolean) => {
    setIsVisualMode(checked);
    if (checked && Object.keys(generatedImages).length === 0) {
      lesson.content.sections.forEach((section, index) => {
        if (!generatedImages[index]) {
          setIsGeneratingImages(prev => ({ ...prev, [index]: true }));
          const contentToVisualize = `${section.heading}: ${section.paragraphs.join(' ')}`;
          generateImageForLesson({ lessonContent: contentToVisualize })
            .then(result => {
              if (result.imageUrl) {
                setGeneratedImages(prev => ({ ...prev, [index]: result.imageUrl as string }));
              } else {
                toast({
                  variant: "destructive",
                  title: "Image Generation Failed",
                  description: result.error || `Could not generate image for section "${section.heading}".`,
                });
              }
            })
            .catch(error => {
              console.error("Failed to generate image for section", index, error);
              toast({
                  variant: "destructive",
                  title: "Image Generation Failed",
                  description: `Could not generate image for section "${section.heading}".`,
              });
            })
            .finally(() => {
              setIsGeneratingImages(prev => ({ ...prev, [index]: false }));
            });
        }
      });
    }
  };


  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className={cn('lg:col-span-2 space-y-6', isAdhdFriendly && 'adhd-focus')}>
        <Card>
          <CardHeader>
            {isTranslating ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Translating...</span>
                </div>
            ) : (
                <>
                  <CardTitle className="font-headline text-3xl">{lessonContent.title}</CardTitle>
                  <CardDescription>{lessonContent.description}</CardDescription>
                </>
            )}
          </CardHeader>
          <CardContent className={cn('prose dark:prose-invert max-w-none', isDyslexiaFriendly ? 'dyslexia-friendly' : 'prose-lg')}>
            {isTranslating ? (
                <div className="space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                </div>
            ) : (
                lessonContent.sections.map((section, index) => (
                  <div key={index}>
                    <h2>{section.heading}</h2>
                    {isVisualMode && (
                      <div className="my-4">
                        {isGeneratingImages[index] && (
                          <div className="flex items-center justify-center h-48 bg-secondary rounded-lg">
                            <Loader className="h-8 w-8 animate-spin text-primary" />
                          </div>
                        )}
                        {generatedImages[index] && (
                          <div className="relative aspect-video rounded-lg overflow-hidden border">
                             <Image
                               src={generatedImages[index]}
                               alt={`Generated image for ${section.heading}`}
                               fill
                               className="object-contain"
                             />
                          </div>
                        )}
                      </div>
                    )}
                    {section.paragraphs.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p.includes('→') ? `<code>${p}</code>` : p }}></p>
                    ))}
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Accessibility & Tools</CardTitle>
            <CardDescription>Adjust the content to your learning needs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center space-x-2 p-2 rounded-md">
                <Globe className="h-5 w-5 text-primary" />
                <Label htmlFor="language-select" className="flex-grow">Language</Label>
                 <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled={isTranslating}>
                    <SelectTrigger id="language-select" className="w-[180px]">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="kn">Kannada</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
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
              <Label htmlFor="audio-mode" className="flex-grow">Enable Audio (TTS)</Label>
              <Switch
                id="audio-mode"
                checked={isAudioEnabled}
                onCheckedChange={handleAudioToggle}
              />
            </div>
             <Separator />
            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
              <FileImage className="h-5 w-5 text-primary" />
              <Label htmlFor="visual-mode" className="flex-grow">Visual Mode</Label>
              <Switch
                id="visual-mode"
                checked={isVisualMode}
                onCheckedChange={handleVisualModeToggle}
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
