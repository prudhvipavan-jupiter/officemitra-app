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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
const sql = neon(url);

const rows = await sql`SELECT id, content_type, slug, status, title FROM cms_content ORDER BY content_type, title`;
const published = rows.filter((r) => r.status === "published");

const target = "what-is-the-joining-time-limit-after-transfer-order";
const match = published.find((r) => r.slug === target || slugify(r.title) === target);

console.log("DB URL host:", new URL(url).hostname);
console.log("Total published:", published.length);
console.log("FAQ count:", published.filter((r) => r.content_type === "faq").length);
console.log("\nTarget slug lookup:", match ?? "NOT FOUND");

const dupes = await sql`
  SELECT content_type, slug, COUNT(*)::int AS n
  FROM cms_content WHERE status = 'published' AND slug IS NOT NULL
  GROUP BY content_type, slug HAVING COUNT(*) > 1
`;
console.log("Duplicate slugs:", dupes.length);

const badSlugs = published.filter((r) => r.slug && r.slug !== slugify(r.slug));
console.log("Non-canonical slugs:", badSlugs.length);
if (badSlugs.length) badSlugs.slice(0, 10).forEach((r) => console.log(" ", r.content_type, r.slug, "->", slugify(r.slug)));

const nullSlug = published.filter((r) => !r.slug);
console.log("Missing slug field:", nullSlug.length);

const truncated = published.filter((r) => {
  const full = slugify(r.title);
  return r.slug && r.slug !== full && full.startsWith(r.slug);
});
console.log("Possibly truncated slugs:", truncated.length);
truncated.slice(0, 5).forEach((r) => console.log(" ", r.slug, "| full:", slugify(r.title)));
