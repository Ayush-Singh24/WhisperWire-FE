"use client";
import useConversation from "@/hooks/use-conversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { Button } from "./ui/button";
import { Paperclip, Send } from "lucide-react";

export default function ChatForm() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, conversationId }),
    });
  };
  return (
    <div className="w-full border-t-2 p-4 px-10 border-primary-color-light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-center"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message here!"
        />
        <Button variant={"ghost"} className="text-primary-text" type="submit">
          <Paperclip />
        </Button>
        <Button variant={"ghost"} className="text-primary-text" type="submit">
          <Send />
        </Button>
      </form>
    </div>
  );
}
