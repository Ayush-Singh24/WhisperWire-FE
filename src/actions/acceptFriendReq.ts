"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptFriendReq = async (receiverId: string, senderId: string) => {
  const user = await db.user.findUnique({
    where: { id: receiverId },
    select: { id: true, friends: true },
  });
  if (!user) {
    return { message: "User not found!" };
  }
  const sender = await db.user.findUnique({ where: { id: senderId } });
  if (!sender) {
    return { message: "Sender not found!" };
  }

  // await db.user.update({
  //   where: { id: user.id },
  //   data: {
  //     friends: {
  //       set: [...user.friends, sender],
  //     },
  //   },
  // });

  await db.friendRequest.delete({
    where: {
      senderId_receiverId: { senderId: sender.id, receiverId: user.id },
    },
  });
  revalidatePath("/requests");
  return { message: "Friend req accepted!" };
};
