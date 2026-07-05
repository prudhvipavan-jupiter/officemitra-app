"use client";

import { useEffect, useState } from "react";
import type { Discussion } from "@/lib/community/store";

export default function AdminCommunityPage() {
  const [items, setItems] = useState<Discussion[]>([]);

  async function load() {
    const res = await fetch("/api/community?status=pending");
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function moderate(id: string, status: string, reply = "") {
    await fetch("/api/community", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, reply_markdown: reply || undefined }),
    });
    await load();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold">Community moderation</h1>
      <ul className="mt-6 space-y-4">
        {items.map((d) => (
          <li key={d.id} className="rounded-xl border border-navy-100 p-4">
            <p className="font-semibold">{d.title}</p>
            <p className="mt-1 text-sm text-gray-600">{d.body}</p>
            <p className="mt-1 text-xs text-gray-400">{d.author_name} · {d.institution}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="btn-primary text-xs" onClick={() => moderate(d.id, "published")}>Approve</button>
              <button type="button" className="btn-secondary text-xs" onClick={() => moderate(d.id, "resolved", "Thank you for your question.")}>Reply & resolve</button>
            </div>
          </li>
        ))}
        {items.length === 0 && <p className="text-gray-500">No pending questions.</p>}
      </ul>
    </div>
  );
}
