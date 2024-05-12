"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptFriendReq = async (receiverId: string, senderId: string) => {
  // const receiver = await getUserById(receiverId);

  // if (!receiver) {
  //   return { message: "User not found!" };
  // }

  // const sender = await getUserById(senderId);

  // if (!sender) {
  //   return { message: "Sender not found!" };
  // }

  await db.user.update({
    where: {
      id: receiverId,
    },
    data: {
      friends: {
        connect: [{ id: senderId }],
      },
    },
  });

  await db.user.update({
    where: {
      id: senderId,
    },
    data: {
      friends: {
        connect: [{ id: receiverId }],
      },
    },
  });

  await db.friendRequest.delete({
    where: {
      senderId_receiverId: { senderId: senderId, receiverId: receiverId },
    },
  });
  revalidatePath("/requests");
  return { message: "Friend req accepted!" };
};
