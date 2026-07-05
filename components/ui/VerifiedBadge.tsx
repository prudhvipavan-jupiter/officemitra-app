"use client";

import { BadgeCheck } from "lucide-react";

export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}
