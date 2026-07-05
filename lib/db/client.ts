import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;

export function isDatabaseEnabled() {
  return !!(process.env.POSTGRES_URL ?? process.env.DATABASE_URL);
}

export function getSql() {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("POSTGRES_URL not configured");
  if (!sql) sql = neon(url);
  return sql;
}

let schemaReady: Promise<void> | null = null;

async function safeDDL(run: () => Promise<unknown>) {
  try {
    await run();
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code === "23505" || code === "42P07") return;
    throw e;
  }
}

export async function ensureSchema() {
  if (!isDatabaseEnabled()) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getSql();
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS cms_content (
          id TEXT PRIMARY KEY,
          content_type TEXT NOT NULL,
          slug TEXT,
          status TEXT NOT NULL DEFAULT 'draft',
          title TEXT NOT NULL DEFAULT '',
          summary TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT 'general',
          body TEXT,
          data JSONB NOT NULL DEFAULT '{}',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS cms_files (
          id TEXT PRIMARY KEY,
          content_id TEXT NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
          field TEXT NOT NULL DEFAULT 'file',
          filename TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS discussions (
          id TEXT PRIMARY KEY,
          author_name TEXT NOT NULL,
          designation TEXT NOT NULL DEFAULT '',
          institution TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT 'general',
          title TEXT NOT NULL,
          body TEXT NOT NULL,
          reply_markdown TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS site_files (
          id TEXT PRIMARY KEY,
          kind TEXT NOT NULL DEFAULT 'logo',
          filename TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS contact_requests (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          department TEXT NOT NULL DEFAULT '',
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          request_type TEXT NOT NULL DEFAULT 'general',
          status TEXT NOT NULL DEFAULT 'new',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          value JSONB NOT NULL DEFAULT '{}',
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS page_views (
          id TEXT PRIMARY KEY,
          path TEXT NOT NULL,
          session_hash TEXT NOT NULL,
          referrer TEXT NOT NULL DEFAULT '',
          viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await safeDDL(() => db`CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at)`);
      await safeDDL(() => db`CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path)`);
      await safeDDL(() => db`
        CREATE TABLE IF NOT EXISTS rate_limits (
          id TEXT PRIMARY KEY,
          hits INT NOT NULL DEFAULT 1,
          window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
    })();
  }
  await schemaReady;
}
