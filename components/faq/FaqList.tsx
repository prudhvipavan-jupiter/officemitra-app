"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HelpCircle, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { FAQ_CATEGORY_LABELS } from "@/lib/site-data";
import { contentPublicHref } from "@/lib/cms/public-href";

type FaqItem = {
  id: string;
  slug?: string | null;
  title: string;
  body: string | null;
  category: string;
  data?: Record<string, unknown>;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => [...new Set(items.map((i) => i.category))].sort(), [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || (item.body ?? "").toLowerCase().includes(q);
    });
  }, [items, query, category]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            className="input-field pl-10"
            placeholder="Search FAQ…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            category === "all" ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700"
          }`}
        >
          All ({items.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              category === cat ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700"
            }`}
          >
            {FAQ_CATEGORY_LABELS[cat] ?? cat} ({items.filter((i) => i.category === cat).length})
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={HelpCircle}
            title="No matching questions"
            description="Try a different search term or category filter."
          />
        </div>
      ) : (
        <dl className="mt-8 space-y-3">
          {filtered.map((item) => {
            const href = contentPublicHref({
              content_type: "faq",
              slug: item.slug ?? null,
              title: item.title,
            });
            return (
            <div key={item.id} className="card">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge bg-navy-50 text-navy-700">{FAQ_CATEGORY_LABELS[item.category] ?? item.category}</span>
                {Boolean(item.data?.verified) && <VerifiedBadge />}
              </div>
              <dt className="mt-2 font-semibold text-navy-900">
                <Link href={href} className="hover:text-gold-600">
                  {item.title}
                </Link>
              </dt>
              <dd className="mt-2 leading-relaxed text-gray-700">{item.body}</dd>
            </div>
            );
          })}
        </dl>
      )}
    </>
  );
}
