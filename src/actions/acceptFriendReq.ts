"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptFriendReq = async (receiverId: string, senderId: string) => {
  const receiver = await getUserById(receiverId);

  if (!receiver) {
    return { message: "User not found!" };
  }

  const sender = await getUserById(senderId);

  if (!sender) {
    return { message: "Sender not found!" };
  }

  await db.user.update({
    where: {
      id: receiver.id,
    },
    data: {
      friends: {
        connect: [{ id: sender.id }],
      },
    },
  });

  await db.user.update({
    where: {
      id: sender.id,
    },
    data: {
      friends: {
        connect: [{ id: receiver.id }],
      },
    },
  });

  await db.friendRequest.delete({
    where: {
      senderId_receiverId: { senderId: sender.id, receiverId: receiver.id },
    },
  });
  revalidatePath("/requests");
  return { message: "Friend req accepted!" };
};
