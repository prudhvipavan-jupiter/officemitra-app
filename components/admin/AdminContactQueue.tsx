"use client";

import { useEffect, useState } from "react";
import type { ContactRequest, ContactRequestStatus } from "@/lib/contact/store";

const STATUS_LABELS: Record<ContactRequestStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};

const TYPE_LABELS = {
  expert: "Expert guidance",
  feedback: "Feedback",
  general: "General",
};

export function AdminContactQueue() {
  const [items, setItems] = useState<ContactRequest[]>([]);
  const [filter, setFilter] = useState<ContactRequestStatus | "all">("new");
  const [loading, setLoading] = useState(true);

  async function load(status = filter) {
    setLoading(true);
    const res = await fetch(`/api/contact?status=${status}`);
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function setStatus(id: string, status: ContactRequestStatus) {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["new", "read", "replied", "archived", "all"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              filter === s ? "bg-navy-900 text-white" : "bg-white text-navy-700 ring-1 ring-navy-100 hover:bg-navy-50"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-12 text-center text-gray-500">
          No {filter === "all" ? "" : STATUS_LABELS[filter as ContactRequestStatus].toLowerCase()} messages.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge bg-gold-100 text-gold-800">{TYPE_LABELS[item.request_type]}</span>
                    <span
                      className={`badge ${
                        item.status === "new"
                          ? "bg-rose-50 text-rose-700"
                          : item.status === "replied"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-navy-50 text-navy-700"
                      }`}
                    >
                      {STATUS_LABELS[item.status]}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-navy-900">{item.subject}</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{item.message}</p>
                  <p className="mt-3 text-xs text-gray-500">
                    {item.name} ·{" "}
                    <a href={`mailto:${item.email}`} className="text-navy-700 hover:text-gold-600">
                      {item.email}
                    </a>
                    {item.department ? ` · ${item.department}` : ""} ·{" "}
                    {new Date(item.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.status === "new" && (
                    <button type="button" className="btn-secondary text-xs" onClick={() => setStatus(item.id, "read")}>
                      Mark read
                    </button>
                  )}
                  {item.status !== "replied" && (
                    <button type="button" className="btn-primary text-xs" onClick={() => setStatus(item.id, "replied")}>
                      Mark replied
                    </button>
                  )}
                  {item.status !== "archived" && (
                    <button type="button" className="btn-secondary text-xs" onClick={() => setStatus(item.id, "archived")}>
                      Archive
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
