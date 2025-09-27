'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { app } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['student', 'teacher'], { required_error: 'You must select a role.' }),
});

export default function AuthPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'login-background');
  const router = useRouter();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize auth inside the component to ensure it runs client-side
  const auth = getAuth(app);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'student',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { email, password, role } = values;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Login Successful', description: 'Redirecting to your dashboard...' });
        router.push(role === 'student' ? '/student/dashboard' : '/teacher/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Sign Up Successful', description: 'Please log in with your new account.' });
        setIsLogin(true); // Switch to login view after successful signup
      }
    } catch (error: any) {
      console.error(`${isLogin ? 'Login' : 'Sign Up'} Error:`, error);
      toast({
        variant: 'destructive',
        title: `${isLogin ? 'Login' : 'Sign Up'} Failed`,
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <CardTitle className="font-headline text-3xl font-bold">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </CardTitle>
            <CardDescription>
              {isLogin ? 'Enter your credentials to access your dashboard.' : 'Fill out the form to get started.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I am a...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="student" />
                            </FormControl>
                            <FormLabel className="font-normal">Student</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="teacher" />
                            </FormControl>
                            <FormLabel className="font-normal">Teacher</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLogin ? 'Log In' : 'Sign Up'}
                </Button>
              </form>
            </Form>
            <Separator className="my-6" />
            <div className="text-center">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} disabled={isLoading}>
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}