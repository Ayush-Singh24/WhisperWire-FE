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
import { ResetSchema } from "@/schemas";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { reset } from "@/actions/reset";

export default function ResetPage() {
  const [isPending, setTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setTransition(() => {
      reset(values).then((data) => {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-3xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isPending}>
                Send reset email
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Link href="/login" className="underline underline-offset-4">
            Go back to login
          </Link>
        </div>
      </div>
    </section>
  );
}
