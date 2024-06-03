import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";

export const getConversation = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
          },
          {
            receiverId: currentUser.id,
          },
        ],
      },
      orderBy: {
        lastMessageAt: "desc",
      },
      include: {
        sender: true,
        receiver: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    return conversations;
  } catch (error) {
    return [];
  }
};

export const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return conversation;
  } catch (e) {
    return null;
  }
};
