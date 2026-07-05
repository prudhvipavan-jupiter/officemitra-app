"use client";

import { useEffect, useState } from "react";
import type { Discussion } from "@/lib/community/store";

export function AdminCommunityQueue() {
  const [items, setItems] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    const res = await fetch("/api/community?status=pending");
    if (!res.ok) {
      setItems([]);
      setLoading(false);
      return;
    }
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
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

  if (loading) return <p className="text-gray-500">Loading pending questions…</p>;

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-12 text-center text-gray-500">
        No pending questions. New submissions appear here for moderation.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((d) => (
        <li key={d.id} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge bg-navy-50 text-navy-700">{d.category}</span>
            <span className="badge bg-amber-50 text-amber-800">Pending</span>
          </div>
          <p className="mt-3 font-semibold text-navy-900">{d.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{d.body}</p>
          <p className="mt-2 text-xs text-gray-500">
            {d.author_name}
            {d.designation ? ` · ${d.designation}` : ""}
            {d.institution ? ` · ${d.institution}` : ""}
          </p>
          <textarea
            className="input-field mt-4 min-h-20"
            placeholder="Optional reply (shown when resolved)"
            value={replyDrafts[d.id] ?? ""}
            onChange={(e) => setReplyDrafts({ ...replyDrafts, [d.id]: e.target.value })}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn-primary text-xs" onClick={() => moderate(d.id, "published")}>
              Approve (no reply)
            </button>
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={() => moderate(d.id, "resolved", replyDrafts[d.id] ?? "Thank you for your question.")}
            >
              Reply &amp; resolve
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
