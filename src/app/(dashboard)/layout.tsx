// src/app/(dashboard)/layout.tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return (
    <DashboardLayout user={session?.user}>
      {children}
    </DashboardLayout>
  );
}