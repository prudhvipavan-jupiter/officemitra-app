"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { tools, toolCategories, TOOL_CATEGORY_LABELS } from "@/lib/site-data";
import type { ToolCategory } from "@/lib/site-data";

export default function ToolsPage() {
  const [category, setCategory] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? tools : tools.filter((t) => t.category === category)),
    [category],
  );

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Office Tools" }]}
            title="Office Tools"
            description={`${tools.length} free calculators, checklists, and estimators for AP government staff — including income tax. Estimates only.`}
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
            All ({tools.length})
          </button>
          {toolCategories.map((cat) => {
            const count = tools.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  category === cat ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700 hover:bg-navy-100"
                }`}
              >
                {TOOL_CATEGORY_LABELS[cat]} ({count})
              </button>
            );
          })}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="card-interactive group">
              <div className="flex items-center justify-between gap-2">
                <div className="module-icon bg-gold-100 text-gold-700">
                  <Calculator className="h-5 w-5" />
                </div>
                <span className="badge bg-navy-50 text-navy-600">{TOOL_CATEGORY_LABELS[t.category]}</span>
              </div>
              <h2 className="mt-4 font-semibold text-navy-900">{t.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
