#!/usr/bin/env node
/**
 * Seed a small set of useful FAQ entries (idempotent — safe to re-run).
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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const faqs = [
  {
    id: "faq-001-official",
    category: "general",
    title: "Is OfficeMitra an official government website?",
    body: "No. OfficeMitra is an independent administrative knowledge platform. It is not affiliated with the Government of Andhra Pradesh or any department. Content here is for guidance only — always verify with current Government Orders and your controlling officer.",
  },
  {
    id: "faq-002-gos",
    category: "general",
    title: "Where can I search Andhra Pradesh Government Orders?",
    body: "Use the GOIR portal (goir.ap.gov.in) to search and download Government Orders. OfficeMitra also publishes selected GOs and circulars in the Document Library when administrators upload them. For disputed or legally complex matters, consult your departmental legal cell.",
  },
  {
    id: "faq-003-cfms",
    category: "finance",
    title: "What is CFMS and who uses it?",
    body: "CFMS (Comprehensive Financial Management System) is Andhra Pradesh's online system for pay bills, receipts, and DDO financial workflows. Drawing and Disbursing Officers (DDOs) and ministerial staff in finance sections use it daily. Access it at cfms.ap.gov.in with your department credentials.",
  },
  {
    id: "faq-004-leave",
    category: "leave",
    title: "How do I check my leave balance?",
    body: "Log in to HRMS Employee Self Service (hrms.ap.gov.in) with your employee credentials. Leave balances and service details are shown in your profile. For leave applications, follow your institution's internal procedure and your controlling officer's approval channel.",
  },
  {
    id: "faq-005-apgli",
    category: "apgli",
    title: "Where can I view my APGLI policy details?",
    body: "Visit the APGLI portal at apgli.ap.gov.in. You can check policy number, insurable amount, premium deductions, and claim-related information. Monthly premium is also reflected on your pay slip. Use the APGLI Premium Calculator on OfficeMitra for a rough estimate only.",
  },
  {
    id: "faq-006-el",
    category: "leave",
    title: "How is Earned Leave (EL) credited to AP government employees?",
    body: "Under AP leave rules, Earned Leave is generally credited at 15 days per year (1.25 days per month) for employees entitled to EL, subject to service conditions and applicable GOs. Actual entitlement depends on your category, length of service, and any breaks in service. Verify with HRMS records and current leave rules.",
  },
];

const env = { ...loadEnv(path.join(root, ".env.local")), ...loadEnv(path.join(root, ".env.production.local")) };
const url = process.env.POSTGRES_URL ?? env.POSTGRES_URL ?? env.DATABASE_URL;
if (!url) {
  console.error("No POSTGRES_URL");
  process.exit(1);
}

const sql = neon(url);
const now = new Date().toISOString();

for (const faq of faqs) {
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
  console.log("FAQ:", faq.title);
}

console.log(`Seeded ${faqs.length} FAQ entries.`);
