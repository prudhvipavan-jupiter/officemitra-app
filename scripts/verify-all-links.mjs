#!/usr/bin/env node
/**
 * Verify every CMS slug resolves and optionally hit HTTP routes.
 * Usage: node scripts/verify-all-links.mjs [--base http://localhost:3456]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = process.argv.includes("--base")
  ? process.argv[process.argv.indexOf("--base") + 1]
  : null;

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

const pathBases = { article: "/knowledge", document: "/documents", update: "/updates", faq: "/faq" };

function contentHref(item) {
  const slug = item.slug || slugify(item.title);
  return `${pathBases[item.content_type]}/${slug}`;
}

async function resolves(sql, type, slug) {
  const decoded = decodeURIComponent(slug);
  const candidates = [...new Set([slug, decoded, slugify(decoded), slugify(slug)])].filter(Boolean);
  for (const candidate of candidates) {
    const rows = await sql`
      SELECT id FROM cms_content
      WHERE content_type = ${type} AND slug = ${candidate} AND status = 'published'
      LIMIT 1
    `;
    if (rows[0]) return true;
  }
  return false;
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const dbUrl = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
const sql = neon(dbUrl);

const rows = await sql`
  SELECT id, content_type, slug, status, title
  FROM cms_content WHERE status = 'published'
`;

const toolSlugs = [...fs.readFileSync(path.join(root, "lib/data/tools.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const staticRoutes = [
  "/", "/about", "/contact", "/expert", "/faq", "/tools", "/portals",
  "/knowledge", "/documents", "/updates", "/community", "/search",
  "/privacy", "/terms", "/process-templates",
];

const dbFailures = [];
const httpFailures = [];

for (const item of rows) {
  const slug = item.slug || slugify(item.title);
  const ok = await resolves(sql, item.content_type, slug);
  if (!ok) dbFailures.push({ href: contentHref(item), id: item.id, title: item.title });
}

async function checkUrl(route) {
  const res = await fetch(`${base}${route}`, { redirect: "manual" });
  return res.status;
}

if (base) {
  for (const route of staticRoutes) {
    const status = await checkUrl(route);
    if (status >= 400) httpFailures.push({ route, status });
  }
  for (const item of rows) {
    const route = contentHref(item);
    const status = await checkUrl(route);
    if (status >= 400) httpFailures.push({ route, status, title: item.title });
  }
  for (const slug of toolSlugs) {
    const route = `/tools/${slug}`;
    const status = await checkUrl(route);
    if (status >= 400) httpFailures.push({ route, status });
  }
}

console.log("=== VERIFY ALL LINKS ===");
console.log(`Published CMS: ${rows.length} | Tools: ${toolSlugs.length}`);
console.log(`DB failures: ${dbFailures.length}`);
dbFailures.forEach((f) => console.log(`  DB  ${f.href}`));

if (base) {
  console.log(`HTTP failures (${base}): ${httpFailures.length}`);
  httpFailures.forEach((f) => console.log(`  ${f.status} ${f.route}${f.title ? ` — ${f.title.slice(0, 50)}` : ""}`));
}

process.exit(dbFailures.length || httpFailures.length ? 1 : 0);
