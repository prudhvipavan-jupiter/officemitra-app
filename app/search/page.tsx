"use client";

import Link from "next/link";
import { useState } from "react";
import { PUBLIC_PATH } from "@/lib/cms/types";
import type { ContentType } from "@/lib/cms/types";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Array<{ title: string; slug: string | null; content_type: ContentType; summary: string }>>([]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    setItems(json.items ?? []);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Search</h1>
      <form onSubmit={run} className="mt-6 flex gap-2">
        <input className="input-field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, documents, FAQ…" />
        <button type="submit" className="btn-primary">Search</button>
      </form>
      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li key={`${item.content_type}-${item.slug}`}>
            <Link href={`${PUBLIC_PATH[item.content_type]}/${item.slug}`} className="font-medium text-navy-800">
              {item.title}
            </Link>
            <p className="text-sm text-gray-600">{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
