"use client";
import { useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";

export default function FriendInfoBadge({
  name,
  image,
  email,
  id,
}: {
  id: string;
  image: string | null;
  email: string | null;
  name: string | null;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = useCallback(() => {
    setIsLoading(true);
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ receiverUserId: id }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as any;
        router.push(`/chat/${data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [id, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        key={id}
        className="flex gap-2  p-2 items-center rounded-full bg-primary-color-med border-2 border-primary-color-light hover:bg-primary-color-light cursor-pointer"
        onClick={handleClick}
      >
        <Avatar>
          <AvatarImage src={image || ""} />
          <AvatarFallback>{name ? name[0] : "X"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span>{name}</span>
          <span
            className="text-xysrn dev
        "
          >
            {email}
          </span>
        </div>
      </div>
    </>
  );
}
