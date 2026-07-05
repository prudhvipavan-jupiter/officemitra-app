#!/usr/bin/env node
/**
 * Smoke-test production (or any base URL) for broken routes.
 * Usage: node scripts/smoke-production.mjs https://officemitra.vercel.app
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";

const base = (process.argv[2] ?? "https://officemitra.vercel.app").replace(/\/$/, "");
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
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

const pathBases = { article: "/knowledge", document: "/documents", update: "/updates", faq: "/faq" };
function contentHref(item) {
  return `${pathBases[item.content_type]}/${item.slug || slugify(item.title)}`;
}

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const sql = neon(process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL);
const rows = await sql`SELECT content_type, slug, title FROM cms_content WHERE status = 'published'`;
const toolSlugs = [...fs.readFileSync(path.join(root, "lib/data/tools.ts"), "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const routes = [
  "/", "/faq", "/knowledge", "/tools", "/search?q=leave",
  ...rows.map(contentHref),
  ...toolSlugs.map((s) => `/tools/${s}`),
];

const failures = [];
for (const route of routes) {
  const res = await fetch(`${base}${route}`, { redirect: "manual", headers: { "Cache-Control": "no-cache" } });
  if (res.status >= 400) failures.push({ route, status: res.status });
}

console.log(`Smoke test ${base}: ${routes.length} routes, ${failures.length} failures`);
failures.forEach((f) => console.log(`  ${f.status} ${f.route}`));
process.exit(failures.length ? 1 : 0);
