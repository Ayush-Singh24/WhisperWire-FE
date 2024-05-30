import { auth } from "@/auth";
import FriendReq from "@/components/FriendReq";
import { getAllReceivedFriendRequests } from "@/data/friends";

export default async function Requests() {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return;
  const friendRequests = await getAllReceivedFriendRequests(user.id);
  return (
    <main className="text-white flex flex-col gap-10 max-w-full">
      <h1 className="text-3xl font-medium">Friend Requests</h1>
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
                disableAdd={false}
              />
            );
          })}
      </div>
    </main>
  );
}
