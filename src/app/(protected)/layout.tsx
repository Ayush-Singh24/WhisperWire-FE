import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <section className="w-screen h-screen flex max-w-[1540px]">
        <Sidebar />
        <div className="w-3/4 flex-1">{children}</div>
        <Toaster />
      </section>
    </SessionProvider>
  );
}
