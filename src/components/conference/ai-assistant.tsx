"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { answerConferenceQuestions } from '@/ai/flows/answer-conference-questions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  question: z.string().min(5, { message: "questionMinLengthError" }),
});
type FormValues = z.infer<typeof formSchema>;

type ChatMessage = {
  id: string;
  type: 'user' | 'ai';
  message: string;
};

export function ClarcAiAssistant() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: ChatMessage = { id: Date.now().toString(), type: 'user', message: data.question };
    setChatHistory(prev => [...prev, userMessage]);
    form.reset();

    try {
      const aiResponse = await answerConferenceQuestions({ question: data.question });
      const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', message: aiResponse.answer };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), type: 'ai', message: t('aiAssistantErrorMessage') };
      setChatHistory(prev => [...prev, errorMessage]);
      toast({
        title: t('aiAssistantToastTitle'),
        description: t('aiAssistantToastDescription'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">CLARC AI Assistant</CardTitle>
          <CardDescription>Ask me anything about CLARC 2025!</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full pr-4 border rounded-md p-4 mb-4 bg-muted/30">
            {chatHistory.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No messages yet. Ask a question to start the conversation!
                <br />e.g., "When is the keynote?" or "Tell me about the speakers."
              </p>
            )}
            {chatHistory.map((chat) => (
              <div key={chat.id} className={`flex items-start gap-3 my-3 ${chat.type === 'user' ? 'justify-end' : ''}`}>
                {chat.type === 'ai' && (
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback><Sparkles size={16}/></AvatarFallback>
                  </Avatar>
                )}
                <div className={`p-3 rounded-lg max-w-[75%] ${chat.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                </div>
                 {chat.type === 'user' && (
                  <Avatar className="h-8 w-8 border-2 border-gray-300">
                    <AvatarFallback><User size={16}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && chatHistory.length > 0 && chatHistory[chatHistory.length -1].type === 'user' && (
                <div className="flex items-start gap-3 my-3">
                     <Avatar className="h-8 w-8 border-2 border-primary">
                       <AvatarFallback><Sparkles size={16}/></AvatarFallback>
                     </Avatar>
                     <div className="p-3 rounded-lg bg-secondary flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                     </div>
                </div>
            )}
          </ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="Type your question here..." {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            AI responses are generated and may occasionally be inaccurate.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
