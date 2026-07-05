"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HOME_HERO } from "@/lib/data/homepage";

export function HomeHero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  function searchTerm(term: string) {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <section className="hero-gradient relative overflow-hidden px-4 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,134,11,0.12)_0%,_transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
          {HOME_HERO.eyebrow}
        </p>
        <h1 className="mt-8 text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
          {HOME_HERO.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-navy-100 md:text-lg">
          {HOME_HERO.subheading}
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={HOME_HERO.searchPlaceholder}
              aria-label="Search OfficeMitra"
              className="w-full rounded-2xl border-0 bg-white py-4 pr-28 pl-12 text-base text-gray-900 shadow-2xl shadow-black/20 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-gold-400"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
            >
              Search
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-left">
            <span className="text-xs font-medium text-navy-300">Popular searches:</span>
            {HOME_HERO.popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => searchTerm(term)}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-navy-100 transition hover:border-gold-400/40 hover:bg-white/15 hover:text-white"
              >
                {term}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {HOME_HERO.ctas.map((cta) =>
            cta.primary ? (
              <Link key={cta.href} href={cta.href} className="btn-primary shadow-lg shadow-gold-600/25">
                {cta.label}
              </Link>
            ) : (
              <Link
                key={cta.href}
                href={cta.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-gold-400/40 hover:bg-white/15"
              >
                {cta.label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
