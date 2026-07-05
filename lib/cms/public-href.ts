import type { ContentRow, ContentType } from "./types";
import { PUBLIC_PATH, slugify } from "./types";

export function contentSlug(item: Pick<ContentRow, "slug" | "title">) {
  return item.slug || slugify(item.title);
}

export function contentPublicHref(item: Pick<ContentRow, "content_type" | "slug" | "title">) {
  const base = PUBLIC_PATH[item.content_type as ContentType];
  const slug = contentSlug(item);
  if (item.content_type === "faq" || item.content_type === "article" || item.content_type === "update" || item.content_type === "document") {
    return `${base}/${slug}`;
  }
  return base;
}
