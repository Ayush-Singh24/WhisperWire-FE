import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    // const { userId, isGroup, members, name } = body;
    const { receiverUserId } = body;

    if (!currentUser || !currentUser.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (isGroup && (!members || members.length < 2 || !name)) {
    //   return new NextResponse("Invalid data", { status: 400 });
    // }

    // if (isGroup) {
    //   const newConversation = await db.conversation.create({
    //     data: {
    //       name,
    //       isGroup,
    //       users: {
    //         connect: [
    //           ...members.map((member: { id: string }) => ({ id: member.id })),
    //           {
    //             id: currentUser.id,
    //           },
    //         ],
    //       },
    //     },
    //     include: {
    //       users: true,
    //     },
    //   });
    //   return NextResponse.json(newConversation);
    // }

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            senderId: currentUser.id,
            receiverId: receiverUserId,
          },
          {
            senderId: receiverUserId,
            receiverId: currentUser.id,
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        senderId: currentUser.id,
        receiverId: receiverUserId,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
