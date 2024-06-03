"use client";
import useConversation from "@/hooks/use-conversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}
export default function ConversationList({
  initialItems,
}: ConversationListProps) {
  const [items, setItems] = useState<FullConversationType[]>(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();
  return (
    <section className="flex-1 flex flex-col gap-3">
      <h1>Chats</h1>
      {items.map((item) => {
        return (
          <ConversationBox
            key={item.id}
            selected={conversationId === item.id}
            data={item}
          />
        );
      })}
    </section>
  );
}
