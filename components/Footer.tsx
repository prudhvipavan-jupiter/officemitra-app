"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-navy-800 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">OfficeMitra</p>
            <p className="mt-2 text-sm text-navy-200">
              Knowledge, documents, and practical guidance for AP government ministerial staff.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Platform</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/knowledge" className="hover:text-white">Knowledge</Link></li>
              <li><Link href="/documents" className="hover:text-white">Documents</Link></li>
              <li><Link href="/community" className="hover:text-white">Community</Link></li>
              <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-navy-800 pt-6 text-xs text-navy-300">
          <strong className="text-white">Disclaimer:</strong> OfficeMitra is not an official government website and does
          not provide legal advice. Verify all information with current Government Orders and your controlling officer.
        </p>
      </div>
    </footer>
  );
}
