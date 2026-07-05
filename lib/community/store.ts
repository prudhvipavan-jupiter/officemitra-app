import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import { newId } from "@/lib/cms/types";

export interface Discussion {
  id: string;
  author_name: string;
  designation: string;
  institution: string;
  category: string;
  title: string;
  body: string;
  reply_markdown: string | null;
  status: string;
  created_at: string;
}

function row(r: Record<string, unknown>): Discussion {
  return {
    id: String(r.id),
    author_name: String(r.author_name),
    designation: String(r.designation ?? ""),
    institution: String(r.institution ?? ""),
    category: String(r.category ?? "general"),
    title: String(r.title),
    body: String(r.body),
    reply_markdown: r.reply_markdown ? String(r.reply_markdown) : null,
    status: String(r.status),
    created_at: String(r.created_at),
  };
}

export async function listDiscussions(status?: string) {
  if (!isDatabaseEnabled()) return [];
  await ensureSchema();
  const db = getSql();
  const rows = status
    ? await db`SELECT * FROM discussions WHERE status = ${status} ORDER BY created_at DESC`
    : await db`SELECT * FROM discussions ORDER BY created_at DESC`;
  return rows.map((r) => row(r as Record<string, unknown>));
}

export async function getDiscussion(id: string) {
  if (!isDatabaseEnabled()) return null;
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT * FROM discussions WHERE id = ${id} LIMIT 1`;
  return rows[0] ? row(rows[0] as Record<string, unknown>) : null;
}

export async function createDiscussion(input: Omit<Discussion, "id" | "reply_markdown" | "status" | "created_at">) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  const id = newId();
  await db`
    INSERT INTO discussions (id, author_name, designation, institution, category, title, body, status)
    VALUES (${id}, ${input.author_name}, ${input.designation}, ${input.institution}, ${input.category}, ${input.title}, ${input.body}, 'pending')
  `;
  return getDiscussion(id);
}

export async function updateDiscussion(
  id: string,
  patch: { status?: string; reply_markdown?: string | null }
) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  const existing = await getDiscussion(id);
  if (!existing) return null;
  await db`
    UPDATE discussions SET
      status = ${patch.status ?? existing.status},
      reply_markdown = ${patch.reply_markdown !== undefined ? patch.reply_markdown : existing.reply_markdown}
    WHERE id = ${id}
  `;
  return getDiscussion(id);
}
