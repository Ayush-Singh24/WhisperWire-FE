"use client";
import useConversation from "@/hooks/use-conversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { Button } from "./ui/button";
import { Paperclip, Send } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

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

  const handleUpload = (result: any) => {
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ conversationId, image: result?.info?.secure_url }),
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
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset="modqxhff"
          className="text-primary-text hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 px-3 py-2"
        >
          <Paperclip />
        </CldUploadButton>
        <Button variant={"ghost"} className="text-primary-text" type="submit">
          <Send />
        </Button>
      </form>
    </div>
  );
}
