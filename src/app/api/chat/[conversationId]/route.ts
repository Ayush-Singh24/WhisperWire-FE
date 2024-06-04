import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversations = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!existingConversations) {
      return new NextResponse("Invalid ID!", { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        AND: [
          { id: conversationId },
          {
            OR: [
              {
                senderId: currentUser.id,
              },
              {
                receiverId: currentUser.id,
              },
            ],
          },
        ],
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERR_FRIEND_DELETE");
    return new NextResponse("Internal Error!", { status: 500 });
  }
}
