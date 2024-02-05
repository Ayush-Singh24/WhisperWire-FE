"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <section className="h-full max-w-[1550px] flex flex-col justify-center items-center">
      <div className="text-primary-text w-full p-5 flex flex-col gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    Set a password for your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
        <div className="text-center">
          <Link href="/" className="underline underline-offset-4">
            Go back
          </Link>
        </div>
      </div>
    </section>
  );
}
