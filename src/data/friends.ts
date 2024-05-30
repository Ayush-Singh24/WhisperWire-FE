import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getAllReceivedFriendRequests = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: { receivedRequests: true },
  });

  if (!user) return;

  const requests = await Promise.all(
    user.receivedRequests.map(async (request) => {
      const sender = await getUserById(request.senderId);
      if (!sender) return;
      return {
        senderName: sender?.name ? sender.name : "",
        senderEmail: sender?.email ? sender.email : "",
        senderImage: sender?.image ? sender.image : "",
        senderId: sender?.id,
      };
    })
  );

  return requests;
};

export const getAllSentFriendRequests = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: { sentRequests: true },
  });
  if (!user) return;
  const requests = await Promise.all(
    user.sentRequests.map(async (request) => {
      const receiver = await getUserById(request.receiverId);
      if (!receiver) return;
      return {
        receiverName: receiver?.name ? receiver.name : "",
        receiverEmail: receiver?.email ? receiver.email : "",
        receiverImage: receiver?.image ? receiver.image : "",
        receiverId: receiver?.id,
      };
    })
  );

  return requests;
};

export const getFriendRequest = async (
  receiverId: string,
  senderId: string
) => {
  const request = await db.friendRequest.findUnique({
    where: { senderId_receiverId: { senderId, receiverId } },
  });

  return request;
};

export const getFriend = async (senderId: string, friendId: string) => {
  const sender = await db.user.findUnique({
    where: { id: senderId },
    include: {
      friends: true,
    },
  });

  const friend = sender?.friends.find((f) => f.id === friendId);

  return friend;
};

export const getAllFriends = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });

  if (!user) return;

  const friends = user.friends.map((friend) => {
    const { emailVerified, isTwoFactorEnabled, password, ...data } = friend;
    return data;
  });

  return friends;
};
