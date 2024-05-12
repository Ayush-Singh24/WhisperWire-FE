"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptFriendReq = async (receiverId: string, senderId: string) => {
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
