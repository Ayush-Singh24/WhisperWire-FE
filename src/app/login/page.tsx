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
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import Social from "@/components/social";

export default function Login() {
  const [isPending, setTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider."
      : "";
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  useEffect(() => {
    if (urlError) {
      setTimeout(() => {
        toast({
          description: urlError,
        });
      }, 10);
    }
  }, [toast]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransition(() => {
      login(values)
        .then((data) => {
          if (data) {
            toast({
              description: data.message,
            });

            if (data.twoFactor) {
              setShowTwoFactor(true);
            }
          }
        })
        .catch(() => toast({ description: "Something went wrong!" }));
    });
  };

  return (
    <section className="h-full max-w-[1550px] flex flex-col justify-center items-center">
      <div className="text-primary-text w-full p-10 flex flex-col gap-5 bg-primary-color-dark border-2 border-primary-color-light max-w-[500px] rounded-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-3xl">Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        type="number"
                        className="text-2xl"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        Set a password for your account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href="/reset" className="underline underline-offset-4">
                  forgot password?
                </Link>
              </>
            )}
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isPending}>
                Login
              </Button>
              <Social />
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Link href="/signup" className="underline underline-offset-4">
            Don't have an account?
          </Link>
        </div>
      </div>
    </section>
  );
}
