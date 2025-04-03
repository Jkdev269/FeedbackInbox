"use client";

import MessageCard from "@/components/message";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Clipboard, Loader2, MessageSquare, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface User {
  username: string;
  // _id: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, SetIsSwitchLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });
  
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
  };
  
  const fetchAcceptMessage = useCallback(async () => {
    SetIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue(
        "acceptMessages",
        response.data.isAcceptingMessages as boolean
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to fetch message settings"
      );
    } finally {
      SetIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages((response.data.messages || []) as Message[])
        if (refresh) {
          toast.success("Showing latest messages");
        }
        setValue(
          "acceptMessages",
          response.data.isAcceptingMessages as boolean
        );
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message ||
            "Failed to fetch message settings"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  //handle switch change
  const handleSwitchChange = async () => {
    try {
      await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success("Message settings updated");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to update message settings"
      );
    }
  };

  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Required</h2>
          <p className="text-gray-600">Please login to view your dashboard</p>
        </div>
      </div>
    );
  }

  const { username } = session.user as User;
  
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile URL has been copied to clipboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Welcome to Your Dashboard</h1>
            <p className="text-blue-100 mt-2">Manage your messages and profile settings</p>
          </div>
          
          <div className="p-6">
            {/* Profile URL Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Clipboard className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Your Profile Link</h2>
              </div>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <input
                  type="text"
                  value={profileUrl}
                  disabled
                  className="flex-grow p-3 bg-transparent text-gray-700 focus:outline-none"
                />
                <Button 
                  onClick={copyToClipboard} 
                  className="bg-blue-500 hover:bg-blue-600 text-white m-1"
                >
                  Copy Link
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Share this link with others to receive messages</p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Message Settings Section */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Message Settings</h2>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="data-[state=checked]:bg-blue-500"
                />
                <span className="ml-3 font-medium text-gray-700">
                  Accept Messages: {acceptMessages ? 
                    <span className="text-green-600 font-semibold">On</span> : 
                    <span className="text-red-500 font-semibold">Off</span>}
                </span>
                {isSwitchLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin text-gray-500" />}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {acceptMessages 
                  ? "You're currently accepting new messages from other users." 
                  : "You're not accepting new messages at this time."}
              </p>
            </div>
            
            <Separator className="my-6" />
            
            {/* Messages Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Your Messages</h2>
                </div>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchMessages(true);
                  }}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4" />
                  )}
                  <span>Refresh</span>
                </Button>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <MessageCard
                        key={message._id as string}
                        message={message}
                        onMessageDelete={handleDeleteMessage}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No messages to display</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {acceptMessages 
                          ? "Share your profile link to start receiving messages." 
                          : "Turn on 'Accept Messages' to allow others to contact you."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;