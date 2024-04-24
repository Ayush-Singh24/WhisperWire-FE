"use client";

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
import { FriendRequestSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function AddFriend() {
  const form = useForm<z.infer<typeof FriendRequestSchema>>({
    resolver: zodResolver(FriendRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FriendRequestSchema>) => {
    console.log(values);
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
                <div>
                  <FormControl>
                    <div className="flex gap-5 w-full">
                      <Input
                        placeholder="Enter your friend's email."
                        {...field}
                      />
                      <Button type="submit">Add</Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
