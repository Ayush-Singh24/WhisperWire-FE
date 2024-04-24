import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="w-3/4 bg-orange-500 p-10">{JSON.stringify(session)}</div>
  );
}
