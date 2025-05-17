
// src/app/auth/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm, SignUpForm } from '@/components/auth/auth-forms';
import { useTranslation } from 'react-i18next';
import { BrainCircuit } from 'lucide-react';

export default function AuthPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
       <div className="flex items-center mb-8 text-primary">
          <BrainCircuit className="h-12 w-12 mr-3" />
          <h1 className="text-4xl font-bold">CLARC 2025</h1>
        </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t('auth.pageTitle')}</CardTitle>
          <CardDescription className="text-center">{t('auth.pageDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('auth.loginTab')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signupTab')}</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
