import { AdminNav } from "@/components/admin/AdminNav";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      {authed && <AdminNav />}
      {children}
    </div>
  );
}
