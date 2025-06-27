"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, markdownToHtml } from "@/lib/utils";
import { Send, Bot } from "lucide-react";
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-lg font-semibold">
              Blackberry Mountain
            </Link>
            <span>/</span>
            <Bot className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto thin-scrollbar">
        <div className="p-2 sm:p-4 space-y-4 sm:space-y-6 min-h-full">
          {messages.length === 0 && !isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    Wellcome, How can help you?
                  </h2>
                  <p className="text-muted-foreground max-w-xs sm:max-w-sm mx-auto text-sm sm:text-base">
                    Ask me anything to get started! I can provide you
                    information on our services at Blackberry Mountain.
                  </p>
                  <div className="flex flex-col mt-4 sm:mt-6 gap-2 sm:gap-3 justify-center items-center w-full max-w-xs sm:max-w-sm">
                    {sampleQueries.map((query, index) => (
                      <button
                        key={index}
                        className="px-3 py-2 rounded-lg bg-card hover:bg-muted text-xs sm:text-sm w-full text-center"
                        onClick={() => setPrompt(query.query)}
                      >
                        {query.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3 items-start",
                    message.role === "human" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Message Content */}
                  <div
                    className={cn(
                      "flex-1 max-w-[90%] sm:max-w-[80%] space-y-1"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-3 sm:px-4 py-2 sm:py-3 break-words w-max max-w-full prose dark:prose-invert text-sm sm:text-base",
                        message.role === "human" &&
                          "bg-muted text-foreground ml-auto"
                      )}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && <BotThinking />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-2 sm:p-4">
          <div className="flex gap-2 sm:gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="resize-none min-h-[44px] sm:min-h-[52px] max-h-24 sm:max-h-32 pr-12 sm:pr-16 text-sm border-2 focus:border-primary/50"
                disabled={isLoading}
              />
              {prompt.length > 0 && (
                <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 text-xs text-muted-foreground bg-background px-1 rounded">
                  {prompt.length}
                </div>
              )}
            </div>
            <Button
              onClick={handleSend}
              disabled={!prompt.trim() || isLoading}
              size="default"
              className="h-[44px] sm:h-[52px] px-3 sm:px-4 rounded-xl"
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
    <div className="flex items-center mt-4 animate-in fade-in duration-300">
      <Bot className="w-6 h-6 text-primary mr-2 animate-pulse" />
      <span className="text-sm text-muted-foreground">
        Processing your request
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
