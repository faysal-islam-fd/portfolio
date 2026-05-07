import type { Metadata } from "next";

import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-ink-950">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar email={user.email ?? ""} />
        <main className="px-5 sm:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
