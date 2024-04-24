"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut, PlusIcon, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <main className="w-1/4 h-full p-10 border-r-2 border-r-primary-color-light text-white flex flex-col gap-5">
      <div className="flex flex-col">
        <Button
          asChild
          variant={"ghost"}
          className="flex justify-start text-xl"
        >
          <Link href={"/add"}>
            <div className="flex gap-3 items-center">
              <PlusIcon />
              <span>Add friend</span>
            </div>
          </Link>
        </Button>
        <Button
          asChild
          variant={"ghost"}
          className="flex justify-start text-xl"
        >
          <Link href={"/requests"}>
            <div className="flex gap-3 items-center">
              <UserRound />
              <span>Friend requests</span>
              {/* TODO: Add friend requests count here */}
            </div>
          </Link>
        </Button>
      </div>
      <section className="flex-1">Friends list</section>
      <div className="flex gap-3 items-center self-center">
        <Avatar>
          <AvatarImage src={session?.user?.image ? session?.user?.image : ""} />
          <AvatarFallback>
            {session?.user?.name ? session?.user?.name[0] : "X"}
          </AvatarFallback>
        </Avatar>
        <div className="max-h-36 overflow-hidden">
          <h1>{session?.user?.name}</h1>
          <h2>{session?.user?.email}</h2>
        </div>
        <Button variant={"ghost"} onClick={handleLogout}>
          <LogOut />
        </Button>
      </div>
    </main>
  );
}
