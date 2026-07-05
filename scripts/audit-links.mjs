#!/usr/bin/env node
/**
 * Audit all CMS slugs, search hrefs, and route coverage.
 * Usage: node scripts/audit-links.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { neon } from "@neondatabase/serverless";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { tools } = require(path.join(root, "lib/data/tools.ts"));
const { portalLinks } = require(path.join(root, "lib/data/portals.ts"));

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

function contentPublicHref(item) {
  const bases = { article: "/knowledge", document: "/documents", update: "/updates", faq: "/faq" };
  const base = bases[item.content_type];
  const slug = item.slug || slugify(item.title);
  return `${base}/${slug}`;
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("No POSTGRES_URL");
  process.exit(1);
}

const sql = neon(url);
const rows = await sql`
  SELECT id, content_type, slug, status, title
  FROM cms_content
  ORDER BY content_type, title
`;

const published = rows.filter((r) => r.status === "published");
const issues = [];

for (const item of published) {
  const slug = item.slug || slugify(item.title);
  if (!slug) issues.push({ type: "missing-slug", item });
  if (item.slug && item.slug !== slugify(item.slug)) {
    issues.push({ type: "non-canonical-slug", item, slug: item.slug, canonical: slugify(item.slug) });
  }
  if (item.slug && item.slug !== slug) {
    issues.push({ type: "slug-title-mismatch", item, expected: slugify(item.title) });
  }
}

const slugSets = {};
for (const t of ["faq", "article", "document", "update"]) {
  slugSets[t] = new Set(published.filter((r) => r.content_type === t).map((r) => r.slug || slugify(r.title)));
}

for (const item of published) {
  const href = contentPublicHref(item);
  const slug = item.slug || slugify(item.title);
  const found = slugSets[item.content_type]?.has(slug);
  if (!found) issues.push({ type: "href-not-resolvable", href, item });
}

const dupes = await sql`
  SELECT content_type, slug, COUNT(*)::int AS n
  FROM cms_content
  WHERE status = 'published' AND slug IS NOT NULL
  GROUP BY content_type, slug
  HAVING COUNT(*) > 1
`;

const transferFaq = published.filter((r) =>
  String(r.title).toLowerCase().includes("joining time") ||
  String(r.slug || "").includes("joining-time")
);

console.log("=== CMS AUDIT ===");
console.log(`Published: ${published.length} (faq=${published.filter(r=>r.content_type==='faq').length}, article=${published.filter(r=>r.content_type==='article').length}, document=${published.filter(r=>r.content_type==='document').length}, update=${published.filter(r=>r.content_type==='update').length})`);
console.log(`Tools: ${tools.length}, Portals: ${portalLinks.length}`);
console.log(`Duplicate slugs: ${dupes.length}`);
if (dupes.length) console.log(dupes);

console.log("\n=== JOINING TIME FAQ ===");
console.log(transferFaq.length ? transferFaq : "NOT FOUND IN DB");

console.log("\n=== ISSUES ===");
console.log(issues.length ? issues : "None");

const sampleFaqs = published.filter((r) => r.content_type === "faq").slice(0, 5);
console.log("\n=== SAMPLE FAQ SLUGS ===");
for (const f of sampleFaqs) {
  console.log(`  ${contentPublicHref(f)}  |  ${f.title.slice(0, 60)}`);
}
