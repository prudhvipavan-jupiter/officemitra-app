#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(p) {
  if (!fs.existsSync(p)) return {};
  const o = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    o[t.slice(0, i).trim()] = v;
  }
  return o;
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("No POSTGRES_URL");
  process.exit(1);
}

const sql = neon(url);
await sql`DROP TABLE IF EXISTS cms_files CASCADE`;
console.log("OK: dropped cms_files");
await sql`DROP TABLE IF EXISTS cms_content CASCADE`;
console.log("OK: dropped cms_content");
await sql`DROP TABLE IF EXISTS discussions CASCADE`;
console.log("OK: dropped discussions");

// Recreate fresh schema
await sql`
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
`;
await sql`
  CREATE TABLE IF NOT EXISTS cms_files (
    id TEXT PRIMARY KEY,
    content_id TEXT NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
    field TEXT NOT NULL DEFAULT 'file',
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    data BYTEA NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`
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
`;
await sql`
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
`;
await sql`
  CREATE TABLE IF NOT EXISTS site_files (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL DEFAULT 'logo',
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    data BYTEA NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`
  CREATE TABLE IF NOT EXISTS page_views (
    id TEXT PRIMARY KEY,
    path TEXT NOT NULL,
    session_hash TEXT NOT NULL,
    referrer TEXT NOT NULL DEFAULT '',
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
await sql`
  CREATE TABLE IF NOT EXISTS rate_limits (
    id TEXT PRIMARY KEY,
    hits INT NOT NULL DEFAULT 1,
    window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;
console.log("Fresh schema ready.");
