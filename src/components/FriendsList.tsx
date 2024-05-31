import { auth } from "@/auth";
import { getAllFriends } from "@/data/friends";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FriendInfoBadge from "./FrinedInfoBadge";

export async function FriendList() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friends = await getAllFriends(user.id);
  return (
    <section className="flex-1 flex flex-col gap-3">
      <h1>Friends list</h1>
      {friends &&
        friends.map((friend) => {
          return <FriendInfoBadge key={friend.id} {...friend} />;
        })}
    </section>
  );
}
