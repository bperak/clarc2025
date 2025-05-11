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

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  organization: z.string().optional(),
  ticketType: z.enum(['student', 'professional', 'vip'], { required_error: "Please select a ticket type." }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export function StreamlinedRegistration() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      title: "Registration Submitted!",
      description: "Thank you for registering for CLARC 2025. We've sent a confirmation to your email.",
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
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Thank you for registering for CLARC 2025. A confirmation email with your ticket details and payment instructions has been sent to your email address.
            </p>
            <p className="text-sm text-muted-foreground">
              We look forward to seeing you at the conference!
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">Register Another Person</Button>
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
          <CardTitle className="text-2xl">Register for CLARC 2025</CardTitle>
          <CardDescription>Secure your spot at the premier AI conference of the year.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ada Lovelace" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., ada@example.com" {...field} />
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
                    <FormLabel>Organization (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Babbage Labs" {...field} />
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
                    <FormLabel>Ticket Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a ticket type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student ($99)</SelectItem>
                        <SelectItem value="professional">Professional ($299)</SelectItem>
                        <SelectItem value="vip">VIP ($499 - includes workshop access)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Processing...' : 'Register & Proceed to Payment'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="mt-4 p-4 bg-secondary rounded-md w-full">
            <h4 className="font-semibold text-md mb-2 flex items-center"><Banknote className="h-5 w-5 mr-2 text-primary"/> Payment Instructions</h4>
            <p className="text-sm text-muted-foreground">
              After submitting your registration, you will be redirected to our secure payment portal.
              We accept all major credit cards and PayPal. Early bird discount ends soon!
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
