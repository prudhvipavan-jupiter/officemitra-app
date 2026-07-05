"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
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

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-navy-800/80 bg-navy-900 text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          {logoUrl ? (
            <img src={logoUrl} alt="OfficeMitra" className="h-9 w-auto max-w-[160px] object-contain" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-600 text-sm font-extrabold text-white shadow-sm">
              OM
            </span>
          )}
          <span className="hidden sm:inline">OfficeMitra</span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-2.5 py-2 text-sm font-medium transition ${
                pathname.startsWith(item.href)
                  ? "bg-navy-800 text-white"
                  : "text-navy-100 hover:bg-navy-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="ml-1 flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-navy-100 hover:bg-navy-800"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="/expert"
            className="ml-2 rounded-lg bg-gold-600 px-3.5 py-2 text-sm font-semibold shadow-sm hover:bg-gold-500"
          >
            Expert Help
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-navy-800 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-navy-800 px-4 py-4 lg:hidden">
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname.startsWith(item.href) ? "bg-navy-800" : "hover:bg-navy-800"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-navy-800" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Link
              href="/expert"
              className="mt-2 block rounded-lg bg-gold-600 px-3 py-2.5 text-center text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Expert Help
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
