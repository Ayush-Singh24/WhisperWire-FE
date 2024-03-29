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
import { NewPasswordSchema } from "@/schemas";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export default function NewPasswordPage() {
  const [isPending, setTransition] = useTransition();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setTransition(() => {
      newPassword(values, token).then((data) => {
        if (data) {
          toast({
            description: data.message,
          });
        }
      });
    });
  };

  return (
    <section className="h-full max-w-[1550px] flex flex-col justify-center items-center">
      <div className="text-primary-text w-full p-10 flex flex-col gap-5 bg-primary-color-dark border-2 border-primary-color-light max-w-[500px] rounded-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your new password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isPending}>
                Reset password
              </Button>
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
