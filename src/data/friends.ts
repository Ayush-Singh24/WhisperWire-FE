import { db } from "@/lib/db";
import { getUserById } from "./user";

export const getFriendRequests = async (id: string) => {
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
