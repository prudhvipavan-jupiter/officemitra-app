"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/documents", label: "Documents" },
  { href: "/admin/updates", label: "Updates" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/community", label: "Community" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-navy-100 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-1 overflow-x-auto px-4 text-sm">
        <Link href="/admin" className="mr-2 shrink-0 font-bold text-navy-900">
          OfficeMitra
        </Link>
        {links.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-lg px-2.5 py-2 font-medium transition ${
                active ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-navy-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/" className="rounded-lg px-2.5 py-2 text-navy-600 hover:bg-navy-50">
            View site
          </Link>
          <button type="button" onClick={logout} className="rounded-lg px-2.5 py-2 text-navy-600 hover:bg-navy-50">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
