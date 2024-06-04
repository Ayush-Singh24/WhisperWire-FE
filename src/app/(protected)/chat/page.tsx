"use client";

import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/use-conversation";

export default function Chat() {
  const { isOpen } = useConversation();
  return (
    <div className={`${isOpen ? "hidden" : "block"} h-full`}>
      <EmptyState />
    </div>
  );
}
