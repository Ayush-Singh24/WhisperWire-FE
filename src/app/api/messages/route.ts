import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { FullMessageType } from "@/types";
import { uniqueId } from "lodash";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const newMsg = {
      id: uniqueId(""),
      body: message,
      image: image,
      senderId: currentUser.id,
      conversationId: conversationId,
      sender: currentUser,
      seen: [currentUser],
      createdAt: new Date(),
    };

    await pusherServer.trigger(conversationId, "messages:new", newMsg);

    const newMessage = await db.message.create({
      data: {
        id: newMsg.id,
        body: message,
        image: image,
        conversationId: conversationId,
        senderId: currentUser.id,
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        sender: true,
        receiver: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    const userIds = [
      updatedConversation.senderId,
      updatedConversation.receiverId,
    ];

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    userIds.map((userId) => {
      pusherServer.trigger(userId!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MSG");
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
