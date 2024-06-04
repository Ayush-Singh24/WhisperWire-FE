import useConversation from "@/hooks/use-conversation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Modal from "./ui/modal";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";
import { on } from "events";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}
export default function ConfirmDeleteModal({
  isOpen,
  onClose,
}: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    fetch(`/api/chat/${conversationId}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        onClose();
        router.push("/chat");
        router.refresh();
      })
      .catch(() => console.log("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <AlertTriangle />
          <h1 className="font-semibold">Delete Conversation</h1>
        </div>
        <span className="text-sm">
          Are you sure you want to delete this conversation. This action
          can&apos;t be undone
        </span>
        <div className="flex gap-2 w-full justify-end">
          <Button variant={"default"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
