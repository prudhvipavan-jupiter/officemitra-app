"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/knowledge", label: "Knowledge" },
  { href: "/documents", label: "Documents" },
  { href: "/updates", label: "Updates" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/tools", label: "Tools" },
  { href: "/portals", label: "Portals" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/80 bg-navy-900 text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-600 text-sm">OM</span>
          <span>OfficeMitra</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname.startsWith(item.href) ? "bg-navy-800 text-white" : "text-navy-100 hover:bg-navy-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="rounded-lg px-3 py-2 text-sm text-navy-100 hover:bg-navy-800">
            Search
          </Link>
          <Link href="/expert" className="ml-2 rounded-lg bg-gold-600 px-3 py-2 text-sm font-semibold hover:bg-gold-500">
            Expert Help
          </Link>
        </nav>
        <button type="button" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-navy-800 px-4 py-3 md:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-sm" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/search" className="block py-2 text-sm" onClick={() => setOpen(false)}>
            Search
          </Link>
        </div>
      )}
    </header>
  );
}
