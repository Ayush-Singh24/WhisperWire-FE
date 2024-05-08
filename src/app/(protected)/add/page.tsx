"use client";

import { sendFriendReq } from "@/actions/sendFriendReq";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FriendRequestSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundPlus } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function AddFriend() {
  const [isPending, setTransition] = useTransition();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof FriendRequestSchema>>({
    resolver: zodResolver(FriendRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FriendRequestSchema>) => {
    setTransition(() => {
      if (user && user.id) {
        sendFriendReq(user.id, values).then((data) => {
          console.log(data);
        });
      }
    });
  };
  return (
    <section className="flex rounded items-center text-white h-1/2 p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-8">
                <FormLabel className="text-5xl">Add a friend</FormLabel>
                <div className="flex flex-col gap-5">
                  <FormControl>
                    <div className="flex gap-5 w-full items-center">
                      <Input
                        className="text-xl p-8"
                        placeholder="Enter your friend's email."
                        {...field}
                      />
                      <Button type="submit" className="text-3xl py-8">
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
    </section>
  );
}
//TODO: search friends
