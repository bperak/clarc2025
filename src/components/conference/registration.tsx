
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Ticket, Banknote, CheckCircle, Mail, Loader2 } from 'lucide-react'; // Added Mail, Loader2 icons
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
  const [submittedData, setSubmittedData] = useState<RegistrationFormValues | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const { t, i18n } = useTranslation();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
    },
  });

  const sendRegistrationEmail = async (data: RegistrationFormValues) => {
    setIsSendingEmail(true);
    try {
      const response = await fetch('/api/send-registration-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, language: i18n.language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
      // Check if email was skipped due to configuration
      const responseData = await response.json();
      if (responseData.message && responseData.message.includes("skipped")) {
        toast({
          title: t('emailSendSkippedToastTitle'),
          description: t('emailSendSkippedToastDescription'),
          variant: "default", // Or "warning" if you have such a variant
        });
      } else {
        toast({
          title: t('emailSentSuccessToastTitle'),
          description: t('emailSentSuccessToastDescription'),
        });
      }

    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: t('emailSentErrorToastTitle'),
        description: t('emailSentErrorToastDescription') + (error instanceof Error ? `: ${error.message}` : ''),
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    console.log("Registration Data:", data);
    setSubmittedData(data); 
    setIsSubmitted(true);
    // We show the success message immediately, email sending happens in background
    toast({
      title: t('registrationSubmittedToastTitle'),
      description: t('registrationSubmittedToastDescription'),
    });
    await sendRegistrationEmail(data); // Send email after setting state
    form.reset(); 
  };
  
  const getTicketTypeEmailString = (ticketType: string) => {
    if (ticketType === 'student') return t('ticketTypeStudentEmail');
    if (ticketType === 'professional') return t('ticketTypeProfessionalEmail');
    if (ticketType === 'vip') return t('ticketTypeVIPEmail');
    return ticketType; 
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
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
            {isSendingEmail && (
              <div className="flex items-center justify-center text-sm text-muted-foreground my-2">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {t('emailSendingInProgressToastDescription')}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {t('registrationSuccessMessage2')}
            </p>
          </CardContent>
        </Card>

        <Card className="max-w-lg mx-auto shadow-xl">
          <CardHeader className="text-center border-b pb-4">
            <div className="flex justify-center items-center mb-2">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">{t('emailPreview.title')}</CardTitle>
            <CardDescription>{t('emailPreview.previewNote')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm pt-6">
            <p>{t('emailPreview.greeting', { fullName: submittedData.fullName })}</p>
            <p>{t('emailPreview.body1')}</p>
            
            <div className="p-4 border rounded-md bg-muted/30 my-4">
              <h4 className="font-semibold mb-3 text-md">{t('emailPreview.detailsHeader')}</h4>
              <div className="space-y-1">
                <p><strong>{t('emailPreview.fullNameLabel')}:</strong> {submittedData.fullName}</p>
                <p><strong>{t('emailPreview.emailLabel')}:</strong> {submittedData.email}</p>
                {submittedData.organization && (
                  <p><strong>{t('emailPreview.organizationLabel')}:</strong> {submittedData.organization}</p>
                )}
                <p><strong>{t('emailPreview.ticketTypeLabel')}:</strong> {getTicketTypeEmailString(submittedData.ticketType)}</p>
              </div>
            </div>
            
            <div className="my-6 space-y-3">
              <h4 className="font-semibold text-md">{t('emailPreview.paymentDetailsHeader')}</h4>
              <div className="space-y-1 text-xs p-3 border rounded-md bg-card dark:bg-muted/40">
                <p><strong>{t('emailPreview.payToLabel')}</strong> {t('emailPreview.payToValue')}</p>
                <p><strong>{t('emailPreview.ibanLabel')}</strong> {t('emailPreview.ibanValue')}</p>
                <p><strong>{t('emailPreview.referenceNumberLabel')}</strong> {t('emailPreview.referenceNumberValue')}</p>
                <p><strong>{t('emailPreview.descriptionLabel')}</strong> {t('emailPreview.descriptionValue', { fullName: submittedData.fullName })}</p>
              </div>
              <p className="text-xs text-muted-foreground">{t('emailPreview.feeIncludes')}</p>
              <p className="text-xs text-muted-foreground">{t('emailPreview.noOnSitePayment')}</p>
            </div>
            
            <p className="mt-4">{t('emailPreview.closing')}</p>
            <p>{t('emailPreview.signature')}</p>
          </CardContent>
        </Card>

        <div className="max-w-lg mx-auto">
          <Button onClick={() => { setIsSubmitted(false); setSubmittedData(null); }} className="w-full">
            {t('registerAnotherPersonButtonText')}
          </Button>
        </div>
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
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isSendingEmail}>
                {(form.formState.isSubmitting || isSendingEmail) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('registerButtonProcessing')}
                  </>
                ) : t('registerButtonDefault')}
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
