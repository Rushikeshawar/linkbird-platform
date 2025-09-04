 
// src/app/(dashboard)/layout.tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout user={session.user}>{children}</DashboardLayout>;
}

