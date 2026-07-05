import type { MetadataRoute } from "next";
import { listContent } from "@/lib/cms/store";
import { contentPublicHref } from "@/lib/cms/public-href";
import { tools } from "@/lib/data/tools";
import { SITE_URL } from "@/lib/site-config";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/expert",
    "/faq",
    "/tools",
    "/portals",
    "/knowledge",
    "/documents",
    "/updates",
    "/community",
    "/search",
    "/privacy",
    "/terms",
    "/process-templates",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const toolEntries: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  let updateEntries: MetadataRoute.Sitemap = [];
  let faqEntries: MetadataRoute.Sitemap = [];

  try {
    const [articles, updates, faqs] = await Promise.all([
      listContent("article", true),
      listContent("update", true),
      listContent("faq", true),
    ]);
    articleEntries = articles
      .filter((a) => a.slug)
      .map((a) => ({
        url: `${SITE_URL}${contentPublicHref(a)}`,
        lastModified: a.updated_at ? new Date(a.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    updateEntries = updates
      .filter((u) => u.slug)
      .map((u) => ({
        url: `${SITE_URL}${contentPublicHref(u)}`,
        lastModified: u.updated_at ? new Date(u.updated_at) : now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    faqEntries = faqs.map((f) => ({
      url: `${SITE_URL}${contentPublicHref(f)}`,
      lastModified: f.updated_at ? new Date(f.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch {
    // Static + tool routes still published if CMS DB is temporarily unavailable
  }

  return [...staticEntries, ...toolEntries, ...articleEntries, ...updateEntries, ...faqEntries];
}
