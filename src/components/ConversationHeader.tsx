"use client";

import useOtherUser from "@/hooks/use-other-user";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface ConversationHeaderProps {
  conversation: Conversation & {
    sender: User;
    receiver: User;
  };
}
export default function ConversationHeader({
  conversation,
}: ConversationHeaderProps) {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    return "Online";
  }, []);
  return (
    <div className="border-b-2 border-primary-color-light px-10 py-2 flex items-center gap-5 text-primary-text">
      <Avatar>
        <AvatarImage src={otherUser?.image || ""} />
        <AvatarFallback>
          {otherUser?.name ? otherUser?.name[0] : "X"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col mr-auto">
        <span>{otherUser?.name}</span>
        <span className="text-sm text-secondary-text">{statusText}</span>
      </div>
      <Button variant={"ghost"} className="flex justify-start text-xl">
        <Menu />
      </Button>
    </div>
  );
}
