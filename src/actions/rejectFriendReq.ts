"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const rejectFriendReq = async (receiverId: string, senderId: string) => {
  await db.friendRequest.delete({
    where: {
      senderId_receiverId: { receiverId: receiverId, senderId: senderId },
    },
  });

  revalidatePath("/requests");
  return { message: "Request declined!" };
};
