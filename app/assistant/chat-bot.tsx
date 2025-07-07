"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { cn, convertMessageObjectToSimple } from "@/lib/utils";
import Link from "next/link";
import BotIcon from "@/components/shared/BotIcon";
import { useRouter } from "next/navigation";

interface Message {
  type: "HumanMessage" | "AIMessage";
  content: string;
}

export default function ChatbotUI({ threadId }: { threadId: string | null }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(!!threadId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const url = `${process.env.NEXT_PUBLIC_AGENT_API}/chat${
    threadId ? `/${threadId}` : ""
  }`;

  // Optimized scroll with debouncing and condition check
  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Fetch messages only when threadId changes
  useEffect(() => {
    if (!threadId) {
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchMessages = async () => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history: true }),
        });

        const data = await response.json();
        setMessages(data.response || []);
      } catch (e) {
        if (!abortController.signal.aborted) {
          console.error("Fetch error:", e);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();

    return () => abortController.abort();
  }, [threadId, url]);

  // Unified message handler
  const handleSend = async () => {
    const userMessage = prompt.trim();
    if (!userMessage || isLoading) return;

    setIsLoading(true);
    setPrompt("");

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      { type: "HumanMessage", content: userMessage },
    ]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const simpleMsg = await convertMessageObjectToSimple(data.response);

      setMessages((prev) => {
        const newMessages = [...prev, simpleMsg];
        if (!threadId) {
          router.push(`/assistant?threadId=${data.threadId}`);
        }
        return newMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Rollback on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized key handler
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Blackberry Mountain
          </Link>
          <span className="text-muted-foreground">/</span>
          <BotIcon size={28} />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 px-4 py-12">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground">
                  <div>
                    <BotIcon size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Wellcome to Blackberry Mountain
                  </h3>
                  <p>
                    This is Bob, a customer service representative at Blackberry
                    Mountain. How can I help you today?
                  </p>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className="group">
                  <div
                    className={`flex gap-4 ${
                      message.type === "HumanMessage"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.type === "AIMessage" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                        <BotIcon size={24} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${
                        message.type === "HumanMessage"
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md py-3"
                          : "bg-muted/50 text-foreground rounded-2xl rounded-bl-md"
                      } px-4`}
                    >
                      <div className="break-words text-sm leading-relaxed">
                        <div
                          className={cn(
                            "prose",
                            message.type === "AIMessage" && "dark:prose-invert"
                          )}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: message.content,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {message.type === "HumanMessage" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                        You
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="group">
                  <div className="flex gap-4 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                      <BotIcon size={24} />
                    </div>
                    <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={handleSend} className="relative">
            <div className="relative flex gap-4 items-end rounded-2xl transition-colors">
              <div className="flex-1 relative">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message..."
                  className="resize-none min-h-[48px] max-h-32 w-full !text-base"
                  disabled={isLoading}
                  onKeyDown={handleKeyPress}
                />
                {prompt.length > 0 && (
                  <div className="absolute right-2 bottom-2 text-muted-foreground bg-background px-1">
                    {prompt.length}
                  </div>
                )}
              </div>
              <Button
                onClick={handleSend}
                disabled={!prompt.trim() || isLoading}
                className="h-[48px] w-[48px] flex-shrink-0"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-2 px-2">
            ChatBot can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
