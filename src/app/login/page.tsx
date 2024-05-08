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
import Social from "@/components/Social";

export default function Login() {
  const [isPending, setTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
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
          title: "Yowai Mo!",
          description: urlError,
        });
      }, 10);
    }
  }, [toast, code, urlError]);

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
                        onChangeCapture={(e) =>
                          setCode((e.target as HTMLInputElement).value)
                        }
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
              <Button
                type={code.length === 0 && showTwoFactor ? "button" : "submit"}
                disabled={isPending || (code.length === 0 && showTwoFactor)}
              >
                Login
              </Button>
              <Social />
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Link href="/signup" className="underline underline-offset-4">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </section>
  );
}
