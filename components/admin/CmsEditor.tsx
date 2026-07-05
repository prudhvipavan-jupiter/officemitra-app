"use client";

import { useEffect, useState } from "react";
import type { ContentRow, ContentType } from "@/lib/cms/types";
import { CONTENT_LABELS } from "@/lib/cms/types";

export function CmsEditor({ type }: { type: ContentType }) {
  const [items, setItems] = useState<ContentRow[]>([]);
  const [editing, setEditing] = useState<Partial<ContentRow> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  async function load() {
    const res = await fetch(`/api/admin/cms?type=${type}`);
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => {
    load();
  }, [type]);

  async function save() {
    if (!editing?.title) return;
    const res = await fetch("/api/admin/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing.id,
        content_type: type,
        slug: editing.slug,
        status: editing.status ?? "draft",
        title: editing.title,
        summary: editing.summary ?? "",
        category: editing.category ?? "general",
        body: editing.body ?? "",
        data: editing.data ?? {},
      }),
    });
    const json = await res.json();
    const id = json.item?.id;
    if (id && file) {
      const fd = new FormData();
      fd.append("id", id);
      fd.append("field", "file");
      fd.append("file", file);
      await fetch("/api/admin/cms", { method: "POST", body: fd });
    }
    if (id && cover) {
      const fd = new FormData();
      fd.append("id", id);
      fd.append("field", "cover_image");
      fd.append("file", cover);
      await fetch("/api/admin/cms", { method: "POST", body: fd });
    }
    setEditing(null);
    setFile(null);
    setCover(null);
    await load();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{CONTENT_LABELS[type]}</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setEditing({ title: "", status: "draft", content_type: type, category: "general" })}
        >
          New
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-lg border border-navy-100 px-4 py-3">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.status} · {item.slug}</p>
            </div>
            <button type="button" className="text-sm text-navy-700" onClick={() => setEditing(item)}>Edit</button>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">{editing.id ? "Edit" : "New"} {CONTENT_LABELS[type].slice(0, -1)}</h2>
            <input className="input-field mt-3" placeholder="Title" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <input className="input-field mt-2" placeholder="Summary" value={editing.summary ?? ""} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} />
            <select className="input-field mt-2" value={editing.category ?? "general"} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
              {["establishment", "finance", "leave", "apgli", "gpf", "treasury", "health", "general"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {(type === "article" || type === "update") && (
              <textarea className="input-field mt-2 min-h-40" placeholder="Body (markdown)" value={editing.body ?? ""} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
            )}
            {type === "faq" && (
              <textarea className="input-field mt-2 min-h-24" placeholder="Answer" value={String(editing.body ?? "")} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
            )}
            {type === "document" && (
              <input type="file" accept=".pdf,.doc,.docx" className="mt-2 block text-sm" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            )}
            {type === "article" && (
              <input type="file" accept="image/*" className="mt-2 block text-sm" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
            )}
            <select className="input-field mt-2" value={editing.status ?? "draft"} onChange={(e) => setEditing({ ...editing, status: e.target.value as "draft" | "published" })}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-primary" onClick={save}>Save</button>
              <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
