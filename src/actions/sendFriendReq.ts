"use server";

import { getFriend, getFriendRequest } from "@/data/friends";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { FriendRequestSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const sendFriendReq = async (
  senderId: string,
  values: z.infer<typeof FriendRequestSchema>
) => {
  const validateFields = FriendRequestSchema.safeParse(values);
  if (!validateFields.success) {
    return { message: "Invalid Fields!" };
  }

  const { email } = validateFields.data;

  const receiver = await getUserByEmail(email);
  if (receiver?.id === senderId)
    return { message: "You can't add yourself as friend!" };
  if (!receiver) {
    return { message: "User doesn't exist!" };
  }

  const existingRequest = await getFriendRequest(receiver.id, senderId);

  if (existingRequest) {
    return { message: "You have already sent a request to this user!" };
  }

  const alreadyAnFriend = await getFriend(senderId, receiver.id);
  if (alreadyAnFriend) {
    return { message: "This user is already your friend!" };
  }

  await db.friendRequest.create({
    data: {
      senderId,
      receiverId: receiver.id,
    },
  });

  revalidatePath("/requests");
  return { message: "Request sent!" };
};
