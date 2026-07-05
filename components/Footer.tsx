"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-navy-800 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                <img src={logoUrl} alt="OfficeMitra" className="h-8 w-auto max-w-[140px] object-contain" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-600 text-xs font-extrabold text-white">
                  OM
                </span>
              )}
              <p className="text-lg font-bold text-white">OfficeMitra</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-200">
              A professional administrative knowledge platform for Andhra Pradesh government ministerial staff.
              Articles, documents, tools, and community — built for practical office work.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Platform</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/knowledge" className="text-navy-200 hover:text-white">Knowledge Hub</Link></li>
              <li><Link href="/documents" className="text-navy-200 hover:text-white">Documents</Link></li>
              <li><Link href="/updates" className="text-navy-200 hover:text-white">Updates</Link></li>
              <li><Link href="/community" className="text-navy-200 hover:text-white">Staff Community</Link></li>
              <li><Link href="/faq" className="text-navy-200 hover:text-white">FAQ</Link></li>
              <li><Link href="/tools" className="text-navy-200 hover:text-white">Calculators</Link></li>
              <li><Link href="/portals" className="text-navy-200 hover:text-white">Official Portals</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="text-navy-200 hover:text-white">About</Link></li>
              <li><Link href="/expert" className="text-navy-200 hover:text-white">Expert Help</Link></li>
              <li><Link href="/contact" className="text-navy-200 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-navy-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-navy-200 hover:text-white">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-navy-800 bg-navy-800/50 px-5 py-4">
          <p className="text-xs leading-relaxed text-navy-200">
            <strong className="text-white">Disclaimer:</strong> OfficeMitra is a professional administrative knowledge
            platform. It is <strong className="text-white">not</strong> an official government website and does{" "}
            <strong className="text-white">not</strong> provide legal advice. Content is for guidance purposes only.
            Always verify with current Government Orders and your controlling officer.
          </p>
        </div>
        <p className="mt-6 text-xs text-navy-400">
          © {new Date().getFullYear()} OfficeMitra. Andhra Pradesh, India.
        </p>
      </div>
    </footer>
  );
}
