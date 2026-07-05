"use client";

import { MessageCircle } from "lucide-react";
import { SITE_URL } from "@/lib/site-config";

export function WhatsAppShare({ title, path }: { title: string; path: string }) {
  const url = `${SITE_URL}${path}`;
  const text = encodeURIComponent(`${title}\n${url}`);
  const href = `https://wa.me/?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
    >
      <MessageCircle className="h-4 w-4" />
      Share on WhatsApp
    </a>
  );
}
