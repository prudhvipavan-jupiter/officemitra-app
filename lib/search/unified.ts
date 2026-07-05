import { searchContent } from "@/lib/cms/store";
import { contentPublicHref } from "@/lib/cms/public-href";
import { portalLinks } from "@/lib/data/portals";
import { tools } from "@/lib/data/tools";
export type SearchResult = {
  title: string;
  summary: string;
  href: string;
  type: "article" | "document" | "update" | "faq" | "tool" | "portal";
  typeLabel: string;
};

export async function searchAll(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const results: SearchResult[] = [];

  const cmsItems = await searchContent(q);
  for (const item of cmsItems) {
    results.push({
      title: item.title,
      summary: item.summary,
      href: contentPublicHref(item),
      type: item.content_type,
      typeLabel: item.content_type === "faq" ? "FAQ" : item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1),
    });
  }

  for (const tool of tools) {
    const hay = `${tool.title} ${tool.description} ${tool.goReference} ${tool.category}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        title: tool.title,
        summary: tool.description,
        href: `/tools/${tool.slug}`,
        type: "tool",
        typeLabel: "Calculator",
      });
    }
  }

  for (const portal of portalLinks) {
    const hay = `${portal.name} ${portal.description} ${portal.category}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        title: portal.name,
        summary: portal.description,
        href: portal.url,
        type: "portal",
        typeLabel: "Official portal",
      });
    }
  }

  const seen = new Set<string>();
  return results.filter((r) => {
    const key = `${r.type}:${r.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 40);
}
