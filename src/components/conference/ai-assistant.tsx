"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

const formSchema = z.object({
  question: z.string().min(5, { message: "questionMinLengthError" }),
});
type FormValues = z.infer<typeof formSchema>;

type ChatMessage = {
  id: string;
  type: 'user' | 'ai';
  message: string;
  isStreaming?: boolean;
};

export function ClarcAiAssistant() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const chatViewportRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    // Find the actual scrollable viewport inside ScrollArea
    if (chatViewportRef.current) {
      // Get the ScrollArea viewport - this is the actual scrollable element
      const scrollViewport = chatViewportRef.current.querySelector('[data-radix-scroll-area-viewport]');
      
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  // Auto-scroll to bottom when chat history updates
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Also scroll when streaming updates come in
  useEffect(() => {
    const isStreaming = chatHistory.some(msg => msg.isStreaming);
    if (isStreaming) {
      const scrollTimer = setTimeout(() => {
        scrollToBottom();
      }, 10);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [chatHistory]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: ChatMessage = { id: Date.now().toString(), type: 'user', message: data.question };
    setChatHistory(prev => [...prev, userMessage]);
    
    // Create a placeholder for the streaming response
    const streamingMessageId = (Date.now() + 1).toString();
    setChatHistory(prev => [...prev, { 
      id: streamingMessageId, 
      type: 'ai', 
      message: '', 
      isStreaming: true 
    }]);
    
    form.reset();

    try {
      // Make a streaming request
      const response = await fetch('/api/ai/answer-rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: data.question, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      // Process the response as a stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk and append to the partial response
        const chunk = decoder.decode(value, { stream: true });
        partialResponse += chunk;
        
        // Update the streaming message with the accumulated text
        setChatHistory(prev => 
          prev.map(msg => 
            msg.id === streamingMessageId 
              ? { ...msg, message: partialResponse } 
              : msg
          )
        );

        // Scroll after each chunk update
        scrollToBottom();
      }

      // Mark the message as no longer streaming
      setChatHistory(prev => 
        prev.map(msg => 
          msg.id === streamingMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Remove the streaming message and add an error message
      setChatHistory(prev => {
        const withoutStream = prev.filter(msg => msg.id !== streamingMessageId);
        return [
          ...withoutStream, 
          { 
            id: (Date.now() + 2).toString(), 
            type: 'ai', 
            message: t('aiAssistantErrorMessage') 
          }
        ];
      });
      
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
          <div ref={chatViewportRef} className="chat-container">
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
                    {chat.type === 'user' ? (
                      <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{chat.message}</ReactMarkdown>
                        {chat.isStreaming && (
                          <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse"></span>
                        )}
                      </div>
                    )}
                  </div>
                   {chat.type === 'user' && (
                    <Avatar className="h-8 w-8 border-2 border-gray-300">
                      <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>
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
