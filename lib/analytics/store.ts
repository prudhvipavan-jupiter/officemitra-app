import { createHash } from "crypto";
import { ensureSchema, getSql, isDatabaseEnabled } from "@/lib/db/client";

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export async function recordPageView(path: string, referrer: string, ip: string) {
  if (!isDatabaseEnabled()) return;
  if (path.startsWith("/admin") || path.startsWith("/api")) return;
  await ensureSchema();
  const db = getSql();
  const sessionHash = createHash("sha256").update(`${ip}:${dayKey()}`).digest("hex").slice(0, 16);
  await db`
    INSERT INTO page_views (id, path, session_hash, referrer, viewed_at)
    VALUES (${crypto.randomUUID()}, ${path.slice(0, 500)}, ${sessionHash}, ${referrer.slice(0, 500)}, NOW())
  `;
}

export async function getAnalyticsSummary() {
  if (!isDatabaseEnabled()) {
    return {
      totalViews: 0,
      todayViews: 0,
      uniqueToday: 0,
      uniqueWeek: 0,
      topPages: [] as { path: string; views: number }[],
      dailyViews: [] as { day: string; views: number }[],
    };
  }
  await ensureSchema();
  const db = getSql();

  const [totalRow] = await db`SELECT COUNT(*)::int AS c FROM page_views`;
  const [todayRow] = await db`
    SELECT COUNT(*)::int AS c FROM page_views WHERE viewed_at >= CURRENT_DATE
  `;
  const [uniqueTodayRow] = await db`
    SELECT COUNT(DISTINCT session_hash)::int AS c FROM page_views WHERE viewed_at >= CURRENT_DATE
  `;
  const [uniqueWeekRow] = await db`
    SELECT COUNT(DISTINCT session_hash)::int AS c FROM page_views WHERE viewed_at >= CURRENT_DATE - INTERVAL '7 days'
  `;
  const topPages = await db`
    SELECT path, COUNT(*)::int AS views FROM page_views
    WHERE viewed_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY path ORDER BY views DESC LIMIT 10
  `;
  const dailyViews = await db`
    SELECT TO_CHAR(viewed_at::date, 'YYYY-MM-DD') AS day, COUNT(*)::int AS views
    FROM page_views WHERE viewed_at >= CURRENT_DATE - INTERVAL '14 days'
    GROUP BY viewed_at::date ORDER BY day ASC
  `;

  return {
    totalViews: Number((totalRow as { c: number }).c ?? 0),
    todayViews: Number((todayRow as { c: number }).c ?? 0),
    uniqueToday: Number((uniqueTodayRow as { c: number }).c ?? 0),
    uniqueWeek: Number((uniqueWeekRow as { c: number }).c ?? 0),
    topPages: topPages.map((r) => ({
      path: String((r as { path: string }).path),
      views: Number((r as { views: number }).views),
    })),
    dailyViews: dailyViews.map((r) => ({
      day: String((r as { day: string }).day),
      views: Number((r as { views: number }).views),
    })),
  };
}

export async function getPublicVisitorCount() {
  const summary = await getAnalyticsSummary();
  return summary.totalViews;
}
