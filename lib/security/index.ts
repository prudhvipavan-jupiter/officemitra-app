import { createHash } from "crypto";
import { NextRequest } from "next/server";
import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 24);
}

export async function checkRateLimit(
  req: NextRequest,
  endpoint: string,
  maxHits: number,
  windowMinutes: number
): Promise<{ ok: true } | { ok: false; retryAfter: number }> {
  if (!isDatabaseEnabled()) return { ok: true };
  await ensureSchema();
  const db = getSql();
  const ip = hashIp(getClientIp(req));
  const id = `${endpoint}:${ip}`;
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  const rows = await db`SELECT hits, window_start FROM rate_limits WHERE id = ${id} LIMIT 1`;
  const row = rows[0] as { hits: number; window_start: Date } | undefined;

  if (!row || new Date(row.window_start) < windowStart) {
    await db`
      INSERT INTO rate_limits (id, hits, window_start)
      VALUES (${id}, 1, NOW())
      ON CONFLICT (id) DO UPDATE SET hits = 1, window_start = NOW()
    `;
    return { ok: true };
  }

  if (row.hits >= maxHits) {
    const retryAfter = Math.ceil(
      (new Date(row.window_start).getTime() + windowMinutes * 60 * 1000 - Date.now()) / 1000
    );
    return { ok: false, retryAfter: Math.max(retryAfter, 60) };
  }

  await db`UPDATE rate_limits SET hits = hits + 1 WHERE id = ${id}`;
  return { ok: true };
}

export function sanitizeText(input: string, maxLen: number): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

const ALLOWED_UPLOAD_MIMES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

export function validateUpload(file: File, maxBytes: number) {
  if (file.size > maxBytes) {
    throw new Error(`File must be ${Math.round(maxBytes / 1024 / 1024)} MB or smaller`);
  }
  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_UPLOAD_MIMES.has(mime)) {
    throw new Error("Allowed file types: PDF, PNG, JPG, WebP, GIF");
  }
}
