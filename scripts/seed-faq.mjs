#!/usr/bin/env node
/**
 * Seed 105 FAQ entries (idempotent — safe to re-run).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { neon } from "@neondatabase/serverless";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { faqEntries } = require(path.join(root, "lib/data/faq-entries.cjs"));

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

// Remove old FAQ entries not in the new set (optional cleanup of previous 6)
const keepIds = new Set(faqEntries.map((f) => f.id));
const existing = await sql`SELECT id FROM cms_content WHERE content_type = 'faq'`;
for (const row of existing) {
  if (!keepIds.has(String(row.id))) {
    await sql`DELETE FROM cms_content WHERE id = ${String(row.id)}`;
  }
}

for (const faq of faqEntries) {
  const slug = slugify(faq.title);
  await sql`
    INSERT INTO cms_content (id, content_type, slug, status, title, summary, category, body, data, created_at, updated_at)
    VALUES (
      ${faq.id}, 'faq', ${slug}, 'published',
      ${faq.title}, '', ${faq.category}, ${faq.body}, '{}', ${now}, ${now}
    )
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      status = EXCLUDED.status,
      title = EXCLUDED.title,
      category = EXCLUDED.category,
      body = EXCLUDED.body,
      updated_at = EXCLUDED.updated_at
  `;
}

console.log(`Seeded ${faqEntries.length} FAQ entries.`);
