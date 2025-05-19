// src/components/auth/auth-forms.tsx
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, getAuthErrorMessage } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "emailInvalidError" }),
  password: z.string().min(1, { message: "passwordRequiredError" }),
});
type LoginValues = z.infer<typeof loginSchema>;

const signUpSchema = z.object({
  email: z.string().email({ message: "emailInvalidError" }),
  password: z.string().min(6, { message: "passwordMinLengthError" }),
  confirmPassword: z.string().min(6, { message: "confirmPasswordMinLengthError" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "passwordsNoMatchError",
  path: ["confirmPassword"],
});
type SignUpValues = z.infer<typeof signUpSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const { signInWithEmail } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      await signInWithEmail(data.email, data.password);
      toast({ title: t('auth.loginSuccessTitle'), description: t('auth.loginSuccessDesc') });
      router.push('/'); // Redirect to home page or dashboard
    } catch (error: any) {
      toast({
        title: t('auth.loginErrorTitle'),
        description: t(getAuthErrorMessage(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
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
              <FormLabel>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('auth.loginButton')}
        </Button>
      </form>
    </Form>
  );
}

export function SignUpForm() {
  const { t } = useTranslation();
  const { signUpWithEmail } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpValues) => {
    setIsLoading(true);
    try {
      await signUpWithEmail(data.email, data.password);
      toast({ title: t('auth.signupSuccessTitle'), description: t('auth.signupSuccessDesc') });
      router.push('/'); // Redirect to home page or dashboard
    } catch (error: any) {
      toast({
        title: t('auth.signupErrorTitle'),
        description: t(getAuthErrorMessage(error)),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
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
              <FormLabel>{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('confirmPasswordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('auth.signupButton')}
        </Button>
      </form>
    </Form>
  );
}
