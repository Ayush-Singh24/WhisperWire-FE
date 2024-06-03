"use client";

import useConversation from "@/hooks/use-conversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}
export default function ConversationBody({
  initialMessages,
}: ConversationBodyProps) {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    fetch(`/api/chat/${conversationId}/seen`, {
      method: "POST",
    });
  }, [conversationId]);
  return (
    <div className="px-10 flex-1 overflow-y-auto">
      {messages.map((message, index) => {
        return (
          <MessageBox
            key={message.id}
            isLast={index === messages.length - 1}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
}
