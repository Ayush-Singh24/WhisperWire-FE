import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <section className="w-screen h-screen flex">
        <Sidebar />
        <div className="w-3/4 p-10">{children}</div>
      </section>
    </SessionProvider>
  );
}
