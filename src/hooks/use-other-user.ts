import { FullConversationType } from "@/types";
import { useCurrentUser } from "./use-current-user";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType) => {
  const user = useCurrentUser();

  const otherUser = useMemo(() => {
    const currentUserId = user?.id;
    if (currentUserId === conversation.senderId) {
      return conversation.receiver;
    } else if (currentUserId === conversation.receiverId) {
      return conversation.sender;
    }
    return null;
  }, [
    user?.id,
    conversation.receiverId,
    conversation.senderId,
    conversation.receiver,
    conversation.sender,
  ]);

  return otherUser;
};

export default useOtherUser;
