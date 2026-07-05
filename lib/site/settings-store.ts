import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";

export type SiteSettingsKey =
  | "process_templates_visible"
  | "email_notifications"
  | "show_public_visitor_count";

export interface SiteSettingsMap {
  process_templates_visible: boolean;
  email_notifications: boolean;
  show_public_visitor_count: boolean;
}

const DEFAULTS: SiteSettingsMap = {
  process_templates_visible: true,
  email_notifications: true,
  show_public_visitor_count: true,
};

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  if (!isDatabaseEnabled()) return { ...DEFAULTS };
  await ensureSchema();
  const db = getSql();
  const rows = await db`SELECT key, value FROM site_settings`;
  const out = { ...DEFAULTS };
  for (const row of rows) {
    const r = row as { key: string; value: unknown };
    if (r.key in DEFAULTS) {
      (out as Record<string, boolean>)[r.key] = Boolean(r.value);
    }
  }
  return out;
}

export async function setSiteSetting<K extends SiteSettingsKey>(key: K, value: SiteSettingsMap[K]) {
  if (!isDatabaseEnabled()) throw new Error("Database not configured");
  await ensureSchema();
  const db = getSql();
  await db`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;
}

export async function setSiteSettings(patch: Partial<SiteSettingsMap>) {
  for (const [key, value] of Object.entries(patch)) {
    if (value !== undefined) {
      await setSiteSetting(key as SiteSettingsKey, value as boolean);
    }
  }
}
