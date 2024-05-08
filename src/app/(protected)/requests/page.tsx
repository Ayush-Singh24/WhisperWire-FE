import { auth } from "@/auth";
import FriendReq from "@/components/FriendReq";
import { getFriendRequests } from "@/data/friends";

export default async function Requests() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friendRequests = await getFriendRequests(user.id);
  return (
    <main className="text-white flex flex-col gap-10 max-w-full">
      <h1 className="text-3xl">Friend Requests</h1>
      <div className="flex flex-col gap-5 md:w-1/2">
        {friendRequests &&
          friendRequests.map((request) => {
            if (!request) return <></>;
            return (
              <FriendReq
                key={request.senderId}
                senderId={request.senderId}
                name={request.senderName}
                image={request.senderImage}
                email={request.senderEmail}
                receiverId={user.id ? user.id : ""}
              />
            );
          })}
      </div>
    </main>
  );
}
