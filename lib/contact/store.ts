import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";
import { newId } from "@/lib/cms/types";

export type ContactRequestType = "expert" | "feedback" | "general";
export type ContactRequestStatus = "new" | "read" | "replied" | "archived";

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  message: string;
  request_type: ContactRequestType;
  status: ContactRequestStatus;
  created_at: string;
}

function row(r: Record<string, unknown>): ContactRequest {
  return {
    id: String(r.id),
    name: String(r.name),
    email: String(r.email),
    department: String(r.department ?? ""),
    subject: String(r.subject),
    message: String(r.message),
    request_type: String(r.request_type ?? "general") as ContactRequestType,
    status: String(r.status ?? "new") as ContactRequestStatus,
    created_at: String(r.created_at),
  };
}

export async function listContactRequests(status?: ContactRequestStatus | "all") {
  if (!isDatabaseEnabled()) return [];
  await ensureSchema();
  const db = getSql();
  const rows =
    status && status !== "all"
      ? await db`SELECT * FROM contact_requests WHERE status = ${status} ORDER BY created_at DESC`
      : await db`SELECT * FROM contact_requests ORDER BY created_at DESC`;
  return rows.map((r) => row(r as Record<string, unknown>));
}

export async function countNewContactRequests() {
  if (!isDatabaseEnabled()) return 0;
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT COUNT(*)::int AS c FROM contact_requests WHERE status = 'new'`;
  return Number((rows[0] as { c: number }).c ?? 0);
}

export async function createContactRequest(input: {
  name: string;
  email: string;
  department?: string;
  subject: string;
  message: string;
  request_type?: ContactRequestType;
}) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  const id = newId();
  await db`
    INSERT INTO contact_requests (id, name, email, department, subject, message, request_type, status)
    VALUES (
      ${id},
      ${input.name},
      ${input.email},
      ${input.department ?? ""},
      ${input.subject},
      ${input.message},
      ${input.request_type ?? "general"},
      'new'
    )
  `;
  const rows = await db`SELECT * FROM contact_requests WHERE id = ${id} LIMIT 1`;
  return row(rows[0] as Record<string, unknown>);
}

export async function updateContactRequest(id: string, status: ContactRequestStatus) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  await db`UPDATE contact_requests SET status = ${status} WHERE id = ${id}`;
  const rows = await db`SELECT * FROM contact_requests WHERE id = ${id} LIMIT 1`;
  return rows[0] ? row(rows[0] as Record<string, unknown>) : null;
}
