"use client";

import BotIcon from "@/components/shared/BotIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, markdownToHtml } from "@/lib/utils";
import { Send, Bot, Plus } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface Message {
  role: "human" | "ai";
  content: string;
}

const ChatBox = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    const userMessage = prompt.trim();
    setPrompt("");

    try {
      const url = threadId
        ? `${process.env.NEXT_PUBLIC_AGENT_API}/chat/${threadId}`
        : `${process.env.NEXT_PUBLIC_AGENT_API}/chat`;
      const response = await fetch(url, {
        cache: "no-cache",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();
      if (!threadId) setThreadId(data.threadId);
      const simpleMsg = await convertMessageObjectToSimple(data.response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "human", content: userMessage },
        simpleMsg,
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - constrain content only */}
      <div className="bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-semibold text-foreground">
              Blackberry Mountain
            </Link>
            <span className="text-muted-foreground">/</span>
            <BotIcon size={24} />
          </div>
        </div>
      </div>

      {/* Messages Container - full width for proper scrollbar */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {messages.length === 0 && !isLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-6 max-w-md w-full">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <BotIcon size={48} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-foreground">
                    Welcome! How can I help you?
                  </h2>
                  <p className="text-muted-foreground">
                    Ask me anything to get started! I can provide you
                    information on our services at Blackberry Mountain.
                  </p>
                </div>
                <div className="space-y-2 w-full">
                  {sampleQueries.map((query, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 py-3 text-left bg-card hover:bg-accent border border-border rounded-lg transition-colors"
                      onClick={() => setPrompt(query.query)}
                    >
                      <span className="text-sm text-card-foreground">
                        {query.title}
                      </span>
                      <Plus className="w-4 h-4 text-primary" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    message.role === "human" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[95%] rounded-lg !text-base prose dark:prose-invert ${
                      message.role === "human" &&
                      "bg-card text-card-foreground px-4 py-3 sm:max-w-[65%]"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                </div>
              ))}
              {!isLoading && <BotThinking />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - constrain content only */}
      <div className="bg-background border-t border-border">
        <div className="max-w-3xl mx-auto py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                className="resize-none min-h-[48px] max-h-32 w-full !text-base font-medium"
                disabled={isLoading}
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
              onKeyDown={handleKeyPress}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

async function convertMessageObjectToSimple(msg: any) {
  // Extract role from id[2], e.g. "HumanMessage" -> "human"
  const rawRole = msg.id?.[2] || "unknown";
  const role = rawRole
    .replace("Message", "")
    .replace("Chunk", "")
    .toLowerCase();

  // Extract content safely
  const content = msg.kwargs?.content || "";
  const htmlContent = await markdownToHtml(content);

  return { role, content: htmlContent };
}

const sampleQueries = [
  {
    title: "Are you the right person to talk about Blackberry Mountain?",
    query: "Are you the right person to talk about Blackberry Mountain?",
  },
  {
    title: "Which activities do you offer?",
    query: "Which activities do you offer?",
  },
  {
    title: "How can I book a tour?",
    query: "How can I book a tour?",
  },
];

function BotThinking() {
  return (
    <div className="flex items-center mt-3 sm:mt-4 fade-in duration-300 px-1 animate-pulse">
      <BotIcon size={24} className="mr-2" />
      <span className="text-xs sm:text-sm text-muted-foreground">
        Processing your request
        <span> </span>
        <span className="animate-pulse">
          <span
            className="animate-bounce inline-block"
            style={{ animationDelay: "0ms" }}
          >
            .
          </span>
          <span
            className="animate-bounce inline-block"
            style={{ animationDelay: "150ms" }}
          >
            .
          </span>
          <span
            className="animate-bounce inline-block"
            style={{ animationDelay: "300ms" }}
          >
            .
          </span>
        </span>
      </span>
    </div>
  );
}
