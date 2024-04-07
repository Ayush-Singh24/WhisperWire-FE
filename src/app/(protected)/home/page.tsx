import { auth, signOut } from "@/auth";

export default function Home() {
  const session = auth();
  return (
    <section className="w-screen h-screen flex">
      <div className="w-1/4 bg-green-400 p-10">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Log out</button>
        </form>
      </div>
      <div className="w-3/4 bg-orange-500 p-10">sup</div>
    </section>
  );
}
