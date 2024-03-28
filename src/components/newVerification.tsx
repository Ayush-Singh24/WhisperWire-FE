"use client";

import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

export default function NewVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string>("");
  const onSubmit = useCallback(() => {
    if (!token) {
      setMessage("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="flex flex-col w-full md:w-2/5 justify-center items-center gap-10 bg-primary-color-light text-primary-text rounded-3xl p-10">
      <h1 className="text-xl md:text-2xl">Confirming your verfication</h1>
      {!message ? (
        <BeatLoader size={30} color="white" />
      ) : (
        <span className="text-lg md:text-xl">{message}</span>
      )}
      <Link href={"/login"} className="underline underline-offset-4">
        Go back to login
      </Link>
    </div>
  );
}
