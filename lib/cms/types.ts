export type ContentType = "article" | "document" | "update" | "faq";
export type ContentStatus = "draft" | "published";

export interface ContentRow {
  id: string;
  content_type: ContentType;
  slug: string | null;
  status: ContentStatus;
  title: string;
  summary: string;
  category: string;
  body: string | null;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export const CONTENT_LABELS: Record<ContentType, string> = {
  article: "Articles",
  document: "Documents",
  update: "Updates",
  faq: "FAQ",
};

export const PUBLIC_PATH: Record<ContentType, string> = {
  article: "/knowledge",
  document: "/documents",
  update: "/updates",
  faq: "/faq",
};

export const CATEGORIES = [
  "establishment",
  "finance",
  "leave",
  "apgli",
  "gpf",
  "treasury",
  "health",
  "general",
] as const;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function newId() {
  return crypto.randomUUID();
}
