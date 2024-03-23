import { signOut } from "@/auth";

export default function Home() {
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
