import FriendReq from "@/components/FriendReq";

export default function Requests() {
  return (
    <main className="text-white flex flex-col gap-10 max-w-full">
      <h1 className="text-3xl">Friend Requests</h1>
      <div className="flex flex-col gap-5 md:w-1/2">
        <FriendReq />
        <FriendReq />
      </div>
    </main>
  );
}
