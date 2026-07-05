"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { getToolBySlug, TOOL_CATEGORY_LABELS } from "@/lib/site-data";

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-2xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: tool.title }]}
            title={tool.title}
            description={tool.description}
          />
          <span className="badge mt-3 bg-gold-100 text-gold-800">{TOOL_CATEGORY_LABELS[tool.category]}</span>
        </div>
      </div>
      <div className="page-body-narrow !max-w-2xl">
        <div className="card">
          <ToolRenderer tool={tool} />
        </div>
        <DisclaimerNotice compact />
        <p className="mt-4 text-xs text-gray-500">
          Verify result against current GO on GOIR and your DDO before any pay action.
        </p>
        <Link href="/tools" className="mt-6 inline-block text-sm font-medium text-navy-700 hover:text-gold-600">
          ← All tools
        </Link>
      </div>
    </>
  );
}
