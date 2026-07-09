import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await isAdmin();
  return admin ? <AdminDashboard /> : <LoginForm />;
}
