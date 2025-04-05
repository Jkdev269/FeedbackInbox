'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post('/api/suggest-messages');
      const data = response.data;
      
      if (data.response) {
        setSuggestedMessages(parseStringMessages(data.response));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch suggested messages');
    } finally {
      setIsSuggestLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Send a Message
            </h1>
            <p className="text-white/80 text-center mt-2">
              To @{username}&apos;s anonymous message board
            </p>
          </div>
          
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What would you like to say anonymously?"
                          className="resize-none min-h-32 text-base p-4 border-2 focus-visible:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center pt-2">
                  {isLoading ? (
                    <Button 
                      disabled 
                      size="lg" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
                    >
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isLoading || !messageContent}
                      size="lg"
                      className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Need Inspiration&#63;</h2>
                <Button
                  onClick={fetchSuggestedMessages}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  disabled={isSuggestLoading}
                >
                  {isSuggestLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Suggestions
                    </>
                  )}
                </Button>
              </div>
              
              <Card className="bg-white/50 border border-indigo-100">
                <CardContent className="p-4">
                  {suggestedMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Sparkles className="h-12 w-12 text-indigo-300 mb-3" />
                      <p className="text-gray-500">
                        Click &quot;Get Suggestions&quot; for message ideas
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {suggestedMessages.map((message, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-3 px-4 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                          onClick={() => handleMessageClick(message)}
                        >
                          {message}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
          
          <Separator className="bg-indigo-100" />
          
          <div className="p-6 bg-indigo-50 text-center">
            <p className="font-medium text-indigo-800 mb-3">
              Want your own anonymous message board&#63;
            </p>
            <Link href={'/sign-up'}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
