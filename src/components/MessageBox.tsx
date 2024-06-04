"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { FullMessageType } from "@/types";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect } from "react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}
export default function MessageBox({ data, isLast }: MessageBoxProps) {
  const currentUser = useCurrentUser();
  const isOwn = currentUser?.id === data.senderId;
  const seenList = (data.seen || [])
    .filter((user) => currentUser?.id !== user.id)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-secondary-color-light" : "bg-secondary-color-dark",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar>
          <AvatarImage src={data.sender.image || ""} />
          <AvatarFallback className="text-primary-text">
            {data.sender.name ? data.sender.name[0] : "X"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 ">
          {/* <div className="text-sm ">{data.sender.name}</div> */}
          <div className="text-secondary-text">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
      </div>
      <div>
        <div className={message}>
          {data.image ? (
            <Image
              alt="image"
              height="288"
              width="288"
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div className="text-xl text-primary-text">{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-secondary-text self-end">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
}
