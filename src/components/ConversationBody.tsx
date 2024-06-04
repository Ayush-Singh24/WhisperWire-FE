"use client";

import useConversation from "@/hooks/use-conversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId as string);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      fetch(`/api/chat/${conversationId}/seen`, {
        method: "POST",
      });
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId as string);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
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
