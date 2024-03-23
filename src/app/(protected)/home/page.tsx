import { auth, signOut } from "@/auth";

export default function Home() {
  const session = auth();
  return (
    <div className="text-white">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
