import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import logout from "../_logout/logoutAction";
import { DashboardClient } from "./_components/DashboardClient";

type DashboardProps = {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardProps) {
  const session = await auth();
    if (!session) {
      return redirect("/login");
    }

  return <DashboardClient onLogout={logout}>{children}</DashboardClient>
}

