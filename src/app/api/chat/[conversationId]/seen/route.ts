import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
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

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "ERROR_MSG_SEEN");
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
