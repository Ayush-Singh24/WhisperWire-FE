import { getCurrentUser } from "@/actions/getCurrentUser";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { update } from "lodash";
import { NextResponse } from "next/server";
interface IParams {
  conversationId: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized!", { status: 401 });
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
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

    if (!existingConversation) {
      return new NextResponse("Invalid ID!", { status: 400 });
    }

    const lastMessage =
      existingConversation.messages[existingConversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(existingConversation);
    }

    // const sender = await getUserById(lastMessage.senderId);
    // lastMessage.seen = [...lastMessage.seen, currentUser];
    // const newLastMessage = {
    //   ...lastMessage,
    //   sender: sender,
    // };

    // await pusherServer.trigger(
    //   conversationId,
    //   "message:update",
    //   newLastMessage
    // );

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    await pusherServer.trigger(currentUser.id, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    await pusherServer.trigger(
      conversationId,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MSG_SEEN");
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
