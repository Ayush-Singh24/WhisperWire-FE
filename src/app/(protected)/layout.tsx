import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen flex">
      <div className="w-1/4 p-10 border-r-2 border-r-primary-color-light">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Log out</Button>
        </form>
      </div>
      <div className="w-3/4 p-10">{children}</div>
    </section>
  );
}
