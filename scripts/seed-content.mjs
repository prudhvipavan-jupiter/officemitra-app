#!/usr/bin/env node
/**
 * Seed articles, documents, and updates (idempotent).
 * Usage: node scripts/seed-content.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { neon } from "@neondatabase/serverless";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { articles: articles1 } = require(path.join(root, "lib/data/seed-articles.cjs"));
const { articles: articles2 } = require(path.join(root, "lib/data/seed-articles-batch2.cjs"));
const { documents } = require(path.join(root, "lib/data/seed-documents.cjs"));
const { updates } = require(path.join(root, "lib/data/seed-updates.cjs"));

const articles = [...articles1, ...articles2];

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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("No POSTGRES_URL");
  process.exit(1);
}

const sql = neon(url);
const now = new Date().toISOString();

for (const art of articles) {
  const slug = slugify(art.title);
  const data = JSON.stringify({ verified: !!art.verified });
  await sql`
    INSERT INTO cms_content (id, content_type, slug, status, title, summary, category, body, data, created_at, updated_at)
    VALUES (
      ${art.id}, 'article', ${slug}, 'published',
      ${art.title}, ${art.summary}, ${art.category}, ${art.body}, ${data}::jsonb, ${now}, ${now}
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
}

for (const doc of documents) {
  const slug = slugify(doc.title);
  const data = JSON.stringify({
    external_url: doc.external_url ?? null,
    go_number: doc.go_number ?? null,
    dated: doc.dated ?? null,
    department: doc.department ?? null,
    verified: true,
  });
  await sql`
    INSERT INTO cms_content (id, content_type, slug, status, title, summary, category, body, data, created_at, updated_at)
    VALUES (
      ${doc.id}, 'document', ${slug}, 'published',
      ${doc.title}, ${doc.summary}, ${doc.category}, ${doc.body}, ${data}::jsonb, ${now}, ${now}
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
}

for (const upd of updates) {
  const slug = slugify(upd.title);
  const data = JSON.stringify({ verified: true });
  await sql`
    INSERT INTO cms_content (id, content_type, slug, status, title, summary, category, body, data, created_at, updated_at)
    VALUES (
      ${upd.id}, 'update', ${slug}, 'published',
      ${upd.title}, ${upd.summary}, ${upd.category}, ${upd.body}, ${data}::jsonb, ${now}, ${now}
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
}

console.log(`Seeded ${articles.length} articles, ${documents.length} documents, ${updates.length} updates.`);
