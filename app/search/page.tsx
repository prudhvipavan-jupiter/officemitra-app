"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Search, SearchX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import type { SearchResult } from "@/lib/search/unified";

const TYPE_COLORS: Record<SearchResult["type"], string> = {
  article: "bg-blue-50 text-blue-700",
  document: "bg-emerald-50 text-emerald-700",
  update: "bg-amber-50 text-amber-800",
  faq: "bg-violet-50 text-violet-700",
  tool: "bg-rose-50 text-rose-700",
  portal: "bg-cyan-50 text-cyan-700",
};

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [searched, setSearched] = useState(!!initialQ);
  const [items, setItems] = useState<SearchResult[]>([]);

  async function run(query: string) {
    const trimmed = query.trim();
    setSearched(true);
    if (!trimmed) {
      setItems([]);
      return;
    }
    const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => {
    if (initialQ) run(initialQ);
  }, [initialQ]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(q);
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <form onSubmit={submit} className="mt-8 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-10"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQ, articles, calculators, portals…"
          />
        </div>
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {!searched ? (
        <div className="mt-12">
          <EmptyState
            icon={Search}
            title="Search the platform"
            description="Find FAQ, articles, documents, AP G.O. calculators, and official portal links."
          />
        </div>
      ) : items.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={SearchX}
            title="No results found"
            description={`Nothing matched "${q}". Try different keywords, or browse FAQ and Tools directly.`}
          />
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <li key={`${item.type}-${item.href}`} className="card">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ${TYPE_COLORS[item.type]}`}>{item.typeLabel}</span>
                {item.type === "portal" && <ExternalLink className="h-3.5 w-3.5 text-gray-400" />}
              </div>
              {item.type === "portal" ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-semibold text-navy-900 hover:text-gold-600"
                >
                  {item.title}
                </a>
              ) : (
                <Link href={item.href} className="mt-2 block font-semibold text-navy-900 hover:text-gold-600">
                  {item.title}
                </Link>
              )}
              <p className="mt-1 text-sm text-gray-600">{item.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader breadcrumb={[{ label: "Home", href: "/" }, { label: "Search" }]} title="Search" />
        </div>
      </div>
      <div className="page-body-narrow">
        <Suspense>
          <SearchResults />
        </Suspense>
      </div>
    </>
  );
}
