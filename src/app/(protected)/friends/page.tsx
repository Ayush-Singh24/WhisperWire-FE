import { auth } from "@/auth";
import FriendInfoBadge from "@/components/FrinedInfoBadge";
import { getAllFriends } from "@/data/friends";
export default async function Friends() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friends = await getAllFriends(user.id);
  return (
    <main className="text-white flex flex-col gap-10 max-w-full p-10">
      <h1 className="text-3xl font-medium">Friends</h1>
      <div className="flex flex-col gap-2 w-1/2">
        {friends &&
          friends.map((friend) => {
            return <FriendInfoBadge key={friend.id} {...friend} />;
          })}
      </div>
    </main>
  );
}
