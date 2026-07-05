import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import type { ContentRow, ContentStatus, ContentType } from "./types";
import { newId, slugify } from "./types";

function row(r: Record<string, unknown>): ContentRow {
  return {
    id: String(r.id),
    content_type: r.content_type as ContentType,
    slug: r.slug ? String(r.slug) : null,
    status: r.status as ContentStatus,
    title: String(r.title ?? ""),
    summary: String(r.summary ?? ""),
    category: String(r.category ?? "general"),
    body: r.body != null ? String(r.body) : null,
    data: (r.data as Record<string, unknown>) ?? {},
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  };
}

export async function listContent(type: ContentType, publishedOnly = false) {
  if (!isDatabaseEnabled()) return [];
  await ensureSchema();
  const db = getSql();
  if (publishedOnly) {
    const rows = await db`
      SELECT * FROM cms_content WHERE content_type = ${type} AND status = 'published'
      ORDER BY updated_at DESC
    `;
    return rows.map((r) => row(r as Record<string, unknown>));
  }
  const rows = await db`
    SELECT * FROM cms_content WHERE content_type = ${type} ORDER BY updated_at DESC
  `;
  return rows.map((r) => row(r as Record<string, unknown>));
}

export async function getBySlug(type: ContentType, slug: string) {
  if (!isDatabaseEnabled()) return null;
  await ensureSchema();
  const db = getSql();
  const rows = await db`
    SELECT * FROM cms_content WHERE content_type = ${type} AND slug = ${slug} AND status = 'published' LIMIT 1
  `;
  return rows[0] ? row(rows[0] as Record<string, unknown>) : null;
}

export async function getById(id: string) {
  if (!isDatabaseEnabled()) return null;
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT * FROM cms_content WHERE id = ${id} LIMIT 1`;
  return rows[0] ? row(rows[0] as Record<string, unknown>) : null;
}

export async function saveContent(input: {
  id?: string;
  content_type: ContentType;
  slug?: string;
  status: ContentStatus;
  title: string;
  summary?: string;
  category?: string;
  body?: string | null;
  data?: Record<string, unknown>;
}) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  const id = input.id ?? newId();
  const slug = input.slug || slugify(input.title);
  const now = new Date().toISOString();
  await db`
    INSERT INTO cms_content (id, content_type, slug, status, title, summary, category, body, data, created_at, updated_at)
    VALUES (
      ${id}, ${input.content_type}, ${slug}, ${input.status},
      ${input.title}, ${input.summary ?? ""}, ${input.category ?? "general"},
      ${input.body ?? null}, ${JSON.stringify(input.data ?? {})}, ${now}, ${now}
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      status = EXCLUDED.status,
      title = EXCLUDED.title,
      summary = EXCLUDED.summary,
      category = EXCLUDED.category,
      body = EXCLUDED.body,
      data = EXCLUDED.data,
      updated_at = EXCLUDED.updated_at
  `;
  return getById(id);
}

export async function deleteContent(id: string) {
  if (!isDatabaseEnabled()) return;
  await ensureSchema();
  const db = getSql();
  await db`DELETE FROM cms_content WHERE id = ${id}`;
}

export async function saveFile(contentId: string, field: string, filename: string, mime: string, buffer: Buffer) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  const id = newId();
  await db`DELETE FROM cms_files WHERE content_id = ${contentId} AND field = ${field}`;
  await db`
    INSERT INTO cms_files (id, content_id, field, filename, mime_type, data)
    VALUES (${id}, ${contentId}, ${field}, ${filename}, ${mime}, ${buffer})
  `;
  const item = await getById(contentId);
  if (item) {
    await db`
      UPDATE cms_content SET data = ${JSON.stringify({ ...item.data, [field]: `/api/files/${id}` })}, updated_at = NOW()
      WHERE id = ${contentId}
    `;
  }
  return id;
}

export async function getFile(id: string) {
  if (!isDatabaseEnabled()) return null;
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT * FROM cms_files WHERE id = ${id} LIMIT 1`;
  if (!rows[0]) return null;
  const r = rows[0] as Record<string, unknown>;
  return {
    filename: String(r.filename),
    mime_type: String(r.mime_type),
    data: r.data as Buffer,
  };
}

export async function searchContent(query: string) {
  if (!isDatabaseEnabled() || !query.trim()) return [];
  await ensureSchema();
  const db = getSql();
  const q = `%${query.trim().toLowerCase()}%`;
  const rows = await db`
    SELECT * FROM cms_content
    WHERE status = 'published'
      AND (
        LOWER(title) LIKE ${q}
        OR LOWER(summary) LIKE ${q}
        OR LOWER(COALESCE(body, '')) LIKE ${q}
      )
    ORDER BY updated_at DESC
    LIMIT 40
  `;
  return rows.map((r) => row(r as Record<string, unknown>));
}
