import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type DashboardProps = {
  children: ReactNode;
};
export default async function DashboardLayout({ children }: DashboardProps) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userName = session.user?.name;
  return (
    <div>
      <nav>
        <span>Bem vindo, {userName}</span>
      </nav>
      <main>{children}</main>
    </div>
  );
}
