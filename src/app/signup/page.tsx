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
import { SignUpSchema } from "@/schemas";
import { useTransition } from "react";
import { signup } from "@/actions/signup";
import { useToast } from "@/components/ui/use-toast";
import Social from "@/components/social";
export default function SignUp() {
  const [isPending, setTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (value: z.infer<typeof SignUpSchema>) => {
    setTransition(() => {
      signup(value).then((data) => {
        toast({
          description: data.message,
        });
      });
    });
  };

  return (
    <section className="h-full max-w-[1550px] flex flex-col justify-center items-center">
      <div className="text-primary-text w-full p-10 flex flex-col gap-5 rounded-3xl bg-primary-color-dark border-2 border-primary-color-light max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl md:text-3xl">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl md:text-3xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email associated with your account.
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
                  <FormLabel className="text-2xl md:text-3xl">
                    Password
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl md:text-3xl">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm your password." {...field} />
                  </FormControl>
                  <FormDescription>Re-Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isPending}>
                Sign Up
              </Button>
              <Social />
            </div>
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
