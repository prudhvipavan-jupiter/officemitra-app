"use client";

import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import {
  portalLinks,
  portalCategories,
  PORTAL_CATEGORY_LABELS,
  PORTAL_CATEGORY_COLORS,
} from "@/lib/site-data";
import type { PortalCategory } from "@/lib/site-data";

export default function PortalsPage() {
  const [category, setCategory] = useState<PortalCategory | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? portalLinks : portalLinks.filter((p) => p.category === category)),
    [category],
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Official Portals" }]}
            title="Official Portals"
            description={`${portalLinks.length} curated links to AP and central government systems used by ministerial staff.`}
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              category === "all" ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100"
            }`}
          >
            All ({portalLinks.length})
          </button>
          {portalCategories.map((cat) => {
            const count = portalLinks.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  category === cat ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100"
                }`}
              >
                {PORTAL_CATEGORY_LABELS[cat]} ({count})
              </button>
            );
          })}
        </div>
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.url + p.name} className="card group">
              <div className="flex flex-col gap-3">
                <span className={`badge w-fit ${PORTAL_CATEGORY_COLORS[p.category]}`}>
                  {PORTAL_CATEGORY_LABELS[p.category]}
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 font-semibold text-navy-900 hover:text-gold-600"
                >
                  {p.name}
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                </a>
                <p className="text-sm text-gray-600">{p.description}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-fit text-sm"
                >
                  Open portal
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
