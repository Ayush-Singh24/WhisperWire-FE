import { Conversation, User, Message } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  sender: User;
  receiver: User;
  messages: FullMessageType[];
};
