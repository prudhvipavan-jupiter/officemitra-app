"use client";

import { useEffect, useState } from "react";

type Summary = {
  totalViews: number;
  todayViews: number;
  uniqueToday: number;
  uniqueWeek: number;
  topPages: { path: string; views: number }[];
  dailyViews: { day: string; views: number }[];
};

export function AdminAnalyticsDashboard() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) return <p className="text-gray-500">Loading analytics…</p>;

  const maxDaily = Math.max(...data.dailyViews.map((d) => d.views), 1);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total page views", value: data.totalViews },
          { label: "Views today", value: data.todayViews },
          { label: "Unique visitors today", value: data.uniqueToday },
          { label: "Unique visitors (7 days)", value: data.uniqueWeek },
        ].map((s) => (
          <div key={s.label} className="card !p-5">
            <p className="text-2xl font-bold text-navy-900">{s.value.toLocaleString("en-IN")}</p>
            <p className="mt-1 text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="font-semibold text-navy-900">Last 14 days</h2>
        <div className="mt-4 flex items-end gap-1 h-32">
          {data.dailyViews.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gold-500/80"
                style={{ height: `${Math.max((d.views / maxDaily) * 100, 4)}%` }}
                title={`${d.day}: ${d.views}`}
              />
              <span className="text-[10px] text-gray-400 rotate-0">{d.day.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-navy-900">Top pages (30 days)</h2>
        {data.topPages.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No page views recorded yet.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {data.topPages.map((p) => (
              <li key={p.path} className="flex justify-between gap-4 text-sm">
                <span className="truncate text-navy-800">{p.path}</span>
                <span className="shrink-0 font-medium text-gray-600">{p.views}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
