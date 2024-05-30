import { auth } from "@/auth";
import { getAllFriends } from "@/data/friends";

export async function FriendList() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friends = await getAllFriends(user.id);
  return (
    <section className="flex-1">
      Friends list
      {friends &&
        friends.map((friend) => {
          return <div key={friend.id}>{friend.name}</div>;
        })}
    </section>
  );
}
