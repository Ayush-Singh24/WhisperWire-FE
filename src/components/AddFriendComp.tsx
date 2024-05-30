"use client";

import { sendFriendReq } from "@/actions/sendFriendReq";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FriendRequestSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundPlus } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export function AddFriendComp({ userId }: { userId: string }) {
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof FriendRequestSchema>>({
    resolver: zodResolver(FriendRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof FriendRequestSchema>) => {
    setTransition(() => {
      sendFriendReq(userId, values).then((data) => {
        toast({ description: data.message });
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-8">
              <FormLabel className="text-3xl font-medium">
                Add a friend
              </FormLabel>
              <div className="flex flex-col gap-5">
                <FormControl>
                  <div className="flex gap-5 w-full items-center">
                    <Input
                      className="text-xl p-8"
                      placeholder="Enter your friend's email."
                      {...field}
                    />
                    <Button
                      type="submit"
                      className="text-3xl py-8"
                      disabled={isPending}
                    >
                      <UserRoundPlus />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xl" />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
