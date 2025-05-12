"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Ticket, Banknote, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: 'fullNameMinLengthError' }),
  email: z.string().email({ message: 'emailInvalidError' }),
  organization: z.string().optional(),
 ticketType: z.enum(['student', 'professional', 'vip'], { required_error: 'ticketTypeRequiredError' }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export function StreamlinedRegistration() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = (data) => {
    console.log("Registration Data:", data);
    // Simulate API call
    toast({
      title: t('registrationSubmittedToastTitle'),
      description: t('registrationSubmittedToastDescription'),
    });
    setIsSubmitted(true);
    form.reset();
  };
  
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-lg mx-auto shadow-xl text-center">
          <CardHeader>
            <div className="flex justify-center items-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">{t('registrationSuccessTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
 {t('registrationSuccessMessage1')}
            </p>
            <p className="text-sm text-muted-foreground">
 {t('registrationSuccessMessage2')}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">{t('registerAnotherPersonButtonText')}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="max-w-lg mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Ticket className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t('registrationTitle')}</CardTitle>
          <CardDescription>{t('registrationDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullNameLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('fullNamePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('organizationLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('organizationPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ticketType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('ticketTypeLabel')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('ticketTypePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent> 
                        <SelectItem value="student">{t('ticketTypeStudent')}99)</SelectItem>
                        <SelectItem value="professional">{t('ticketTypeProfessional')}299)</SelectItem>
                        <SelectItem value="vip">{t('ticketTypeVIP')}499 - {t('includesWorkshopAccess')})</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? t('registerButtonProcessing') : t('registerButtonDefault')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="mt-4 p-4 bg-secondary rounded-md w-full">
            <h4 className="font-semibold text-md mb-2 flex items-center"><Banknote className="h-5 w-5 mr-2 text-primary"/> {t('paymentInstructionsTitle')}</h4>
            <p className="text-sm text-muted-foreground">
 {t('paymentInstructionsText')}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
