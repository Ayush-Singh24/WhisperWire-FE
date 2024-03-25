import Image from "next/image";
import { Button } from "./ui/button";

import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex gap-2">
      <Button variant={"ghost"} onClick={() => onClick("google")}>
        <Image src="/images/google.png" alt="google" width={30} height={30} />
      </Button>
      <Button variant={"ghost"} onClick={() => onClick("github")}>
        <Image src="/images/github.png" alt="github" width={30} height={30} />
      </Button>
    </div>
  );
}
