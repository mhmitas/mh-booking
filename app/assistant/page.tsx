import React from "react";
import ChatbotUI from "./chat-bot";

const page = async (props: {
  searchParams?: Promise<{
    threadId?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const threadId = searchParams?.threadId || null;

  return (
    <div>
      <ChatbotUI threadId={threadId} />
    </div>
  );
};

export default page;
