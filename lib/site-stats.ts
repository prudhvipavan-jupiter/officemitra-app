import { listContent } from "@/lib/cms/store";
import { listDiscussions } from "@/lib/community/store";
import { countNewContactRequests } from "@/lib/contact/store";
import { portalLinks } from "@/lib/data/portals";
import { tools } from "@/lib/data/tools";

export interface SiteStats {
  tools: number;
  portals: number;
  faq: number;
  articles: number;
  documents: number;
  updates: number;
  community: number;
}

export async function getPublicSiteStats(): Promise<SiteStats> {
  const [articles, documents, updates, faq, discussions] = await Promise.all([
    listContent("article", true),
    listContent("document", true),
    listContent("update", true),
    listContent("faq", true),
    listDiscussions(),
  ]);

  const community = discussions.filter((d) => d.status === "published" || d.status === "resolved").length;

  return {
    tools: tools.length,
    portals: portalLinks.length,
    faq: faq.length,
    articles: articles.length,
    documents: documents.length,
    updates: updates.length,
    community,
  };
}

export async function getAdminDashboardStats() {
  const [articles, documents, updates, faq, pendingCommunity, newContacts, publicStats] = await Promise.all([
    listContent("article", false),
    listContent("document", false),
    listContent("update", false),
    listContent("faq", false),
    listDiscussions("pending"),
    countNewContactRequests(),
    getPublicSiteStats(),
  ]);

  return {
    articles,
    documents,
    updates,
    faq,
    pendingCommunity,
    newContacts,
    publicStats,
  };
}
