"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { PUBLIC_PATH } from "@/lib/cms/types";
import type { ContentType } from "@/lib/cms/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [searched, setSearched] = useState(!!initialQ);
  const [items, setItems] = useState<
    Array<{ title: string; slug: string | null; content_type: ContentType; summary: string }>
  >([]);

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
            placeholder="Search articles, documents, FAQ…"
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
            description="Find articles, documents, updates, and FAQ entries. Content appears here once published through the admin CMS."
          />
        </div>
      ) : items.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={SearchX}
            title="No results found"
            description={`Nothing matched "${q}". Try different keywords, or browse Knowledge Hub and Documents directly.`}
          />
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <li key={`${item.content_type}-${item.slug}`} className="card">
              <Link href={`${PUBLIC_PATH[item.content_type]}/${item.slug}`} className="font-semibold text-navy-900 hover:text-gold-600">
                {item.title}
              </Link>
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
