import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function UserInfoBadge() {
  const router = useRouter();
  const user = useCurrentUser();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div className="flex gap-3 items-center self-center">
      <Avatar>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>{user?.name ? user.name[0] : "X"}</AvatarFallback>
      </Avatar>
      <div className="max-h-36 overflow-hidden">
        <h1>{user?.name}</h1>
        <h2>{user?.email}</h2>
      </div>
      <Button variant={"ghost"} className="py-7" onClick={handleLogout}>
        <LogOut />
      </Button>
    </div>
  );
}
