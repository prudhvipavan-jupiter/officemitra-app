import { slugify } from "@/lib/cms/types";

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const line of markdown.split("\n")) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/\*\*|__/g, "").trim();
    headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

export function ArticleToc({ headings }: { headings: TocHeading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-navy-100 bg-navy-50/50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-navy-600">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a href={`#${h.id}`} className="text-navy-700 hover:text-gold-600">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
