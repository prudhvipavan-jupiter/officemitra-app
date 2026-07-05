import Link from "next/link";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      {authed && (
        <header className="border-b bg-white">
          <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4 text-sm">
            <Link href="/admin" className="font-semibold">Dashboard</Link>
            <Link href="/admin/articles">Articles</Link>
            <Link href="/admin/documents">Documents</Link>
            <Link href="/admin/community">Community</Link>
            <Link href="/" className="ml-auto text-navy-700">View site</Link>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
