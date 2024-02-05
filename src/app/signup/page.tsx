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
const signUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters long",
    }),
    email: z.string().email("Enter an Email."),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match.",
      path: ["passwordConfirm"],
    }
  );
export default function SignUp() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (value: z.infer<typeof signUpSchema>) => {
    console.log(value);
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
                  <FormLabel className="text-2xl md:text-3xl">
                    Username
                  </FormLabel>
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
            <Button type="submit">Sign Up</Button>
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
