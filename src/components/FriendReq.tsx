"use client";
import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { acceptFriendReq } from "@/actions/acceptFriendReq";
import { rejectFriendReq } from "@/actions/rejectFriendReq";

export default function FriendReq({
  name,
  email,
  image,
  receiverId,
  senderId,
  disableAdd,
}: {
  name: string;
  email: string;
  image: string;
  receiverId: string;
  senderId: string;
  disableAdd: boolean;
}) {
  const [isPending, setTransition] = useTransition();
  const add = async () => {
    setTransition(() => {
      acceptFriendReq(receiverId, senderId).then((data) => {
        console.log(data);
      });
    });
  };
  const remove = async () => {
    setTransition(() => {
      rejectFriendReq(receiverId, senderId).then((data) => {
        console.log(data);
      });
    });
  };
  return (
    <div className="flex items-center w-full bg-primary-color-light p-2 rounded">
      <div className="flex gap-2 items-center mr-auto">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{"X"}</AvatarFallback>
        </Avatar>
        <div className="max-h-36 overflow-hidden">
          <h1>{name}</h1>
          <h2>{email}</h2>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={add}
          disabled={isPending}
          className={`${disableAdd ? "hidden" : ""}`}
        >
          <Check />
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={remove}
          disabled={isPending}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
