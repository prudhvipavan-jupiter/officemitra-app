"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-8 max-w-xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search rules, procedures, leave, APGLI…"
          className="w-full rounded-xl border-0 bg-white py-4 pr-28 pl-12 text-base text-gray-900 shadow-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gold-400"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}
