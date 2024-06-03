"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import useOtherUser from "@/hooks/use-other-user";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const user = useCurrentUser();

  const handleClick = useCallback(() => {
    router.push(`/chat/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userId = useMemo(() => {
    return user?.id;
  }, [user?.id]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userId) {
      return false;
    }

    return seenArray.filter((user) => user.id === userId).length !== 0;
  }, [userId, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a coversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={`flex gap-2 p-2 rounded-full items-center cursor-pointer hover:bg-primary-color-med ${
        selected ? "bg-primary-color-light" : ""
      }`}
    >
      <Avatar>
        <AvatarImage src={otherUser?.image || ""} />
        <AvatarFallback>
          {otherUser?.name ? otherUser?.name[0] : "X"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center w-full">
          <span>{otherUser?.name}</span>
          {lastMessage?.createdAt && (
            <p className="text-xs text-primary-text truncate">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <span
          className={`text-sm ${
            hasSeen ? "text-secondary-text" : "text-primary-text font-bold"
          }`}
        >
          {lastMessageText}
        </span>
      </div>
    </div>
  );
}
