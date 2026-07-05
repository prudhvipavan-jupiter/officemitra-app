import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";

export const SITE_LOGO_ID = "site-logo";

const LOGO_MIMES = new Set(["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"]);
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

export function isAllowedLogoMime(mime: string) {
  return LOGO_MIMES.has(mime);
}

export async function getSiteLogo() {
  if (!isDatabaseEnabled()) return null;
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT * FROM site_files WHERE id = ${SITE_LOGO_ID} LIMIT 1`;
  if (!rows[0]) return null;
  const r = rows[0] as Record<string, unknown>;
  return {
    id: String(r.id),
    filename: String(r.filename),
    mime_type: String(r.mime_type),
    data: r.data as Buffer,
    url: `/api/site-files/${SITE_LOGO_ID}`,
  };
}

export async function getSiteLogoUrl() {
  const logo = await getSiteLogo();
  return logo?.url ?? null;
}

export async function saveSiteLogo(filename: string, mime: string, buffer: Buffer) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  if (!isAllowedLogoMime(mime)) throw new Error("Logo must be PNG, JPG, WebP, SVG, or GIF");
  if (buffer.length > MAX_LOGO_BYTES) throw new Error("Logo must be 2 MB or smaller");
  await ensureSchema();
  const db = getSql();
  await db`
    INSERT INTO site_files (id, kind, filename, mime_type, data)
    VALUES (${SITE_LOGO_ID}, 'logo', ${filename}, ${mime}, ${buffer})
    ON CONFLICT (id) DO UPDATE SET
      filename = EXCLUDED.filename,
      mime_type = EXCLUDED.mime_type,
      data = EXCLUDED.data,
      created_at = NOW()
  `;
  return `/api/site-files/${SITE_LOGO_ID}`;
}

export async function deleteSiteLogo() {
  if (!isDatabaseEnabled()) return;
  await ensureSchema();
  const db = getSql();
  await db`DELETE FROM site_files WHERE id = ${SITE_LOGO_ID}`;
}
