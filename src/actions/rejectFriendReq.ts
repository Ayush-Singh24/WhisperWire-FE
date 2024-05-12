"use server";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const rejectFriendReq = async (receiverId: string, senderId: string) => {
  //   const receiver = await getUserById(receiverId);

  //   if (!receiver) {
  //     return { message: "User not found!" };
  //   }

  //   const sender = await getUserById(senderId);

  //   if (!sender) {
  //     return { message: "Sender not found!" };
  //   }

  await db.friendRequest.delete({
    where: {
      senderId_receiverId: { receiverId: receiverId, senderId: senderId },
    },
  });

  revalidatePath("/requests");
  return { message: "Request declined!" };
};
