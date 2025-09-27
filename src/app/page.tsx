import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="relative min-h-screen w-full">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover opacity-20"
        />
      )}
      <div className="relative grid min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo className="text-3xl" />
            </div>
            <CardTitle className="font-headline text-3xl font-bold">Welcome to NeuroQuadAI</CardTitle>
            <CardDescription>Your personalized AI learning companion.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg" className="w-full font-bold">
              <Link href="/student/dashboard">Student Login</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full font-bold">
              <Link href="/teacher/dashboard">Teacher Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
