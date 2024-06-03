import ConversationHeader from "@/components/ConversationHeader";
import EmptyState from "@/components/EmptyState";
import { getConversationById } from "@/data/conversation";
import { getMessages } from "@/data/message";

interface IParams {
  conversationId: string;
}

export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return <EmptyState />;
  }
  return (
    <main>
      <ConversationHeader conversation={conversation} />
    </main>
  );
}
