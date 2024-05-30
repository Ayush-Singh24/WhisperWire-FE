import { auth } from "@/auth";
import { AddFriendComp } from "@/components/AddFriendComp";
import FriendReq from "@/components/FriendReq";
import { getAllSentFriendRequests } from "@/data/friends";

export default async function AddFriend() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friendRequests = await getAllSentFriendRequests(user.id);
  return (
    <section className="flex flex-col items-start rounded text-white gap-10 max-w-full">
      <AddFriendComp userId={user.id} />
      <h1 className="text-3xl font-medium">Sent requests</h1>
      <div className="flex flex-col gap-5 md:w-1/2">
        {friendRequests &&
          friendRequests.map((request) => {
            if (!request) return <></>;
            return (
              <FriendReq
                key={request.receiverId}
                senderId={user.id ? user.id : ""}
                name={request.receiverName}
                image={request.receiverImage}
                email={request.receiverEmail}
                receiverId={request.receiverId}
                disableAdd={true}
              />
            );
          })}
      </div>
    </section>
  );
}
//TODO: search friends
