#!/usr/bin/env node
/**
 * Remove placeholder document entries that only link to the GOIR homepage (no real file).
 * Usage: node scripts/purge-dummy-documents.mjs
 */
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

const DUMMY_IDS = ["doc-go-da-60", "doc-go-retirement-62", "doc-go-apgli-198"];

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("No POSTGRES_URL");
  process.exit(1);
}

const sql = neon(url);

for (const id of DUMMY_IDS) {
  const result = await sql`
    DELETE FROM cms_content
    WHERE id = ${id} AND content_type = 'document'
    RETURNING id
  `;
  if (result.length > 0) {
    console.log(`Removed dummy document: ${id}`);
  }
}

const generic = await sql`
  DELETE FROM cms_content
  WHERE content_type = 'document'
    AND (data->>'external_url') = 'https://goir.ap.gov.in/'
  RETURNING id, title
`;

for (const row of generic) {
  console.log(`Removed generic GOIR stub: ${row.id} — ${row.title}`);
}

console.log("Done.");
