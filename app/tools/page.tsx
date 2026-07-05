import type { ReactNode } from "react";
import Link from "next/link";
import {
  Calculator,
  Calendar,
  CheckSquare,
  Clock,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { tools } from "@/lib/site-data";

const toolIcons: Record<string, ReactNode> = {
  "pay-bill-checklist": <CheckSquare className="h-5 w-5" />,
  "probation-calculator": <Clock className="h-5 w-5" />,
  "leave-accrual": <Calendar className="h-5 w-5" />,
  "working-days": <Calculator className="h-5 w-5" />,
  "apgli-premium": <Wallet className="h-5 w-5" />,
};

export default function ToolsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Office Tools" }]}
            title="Office Tools"
            description="Free calculators and checklists for daily AP government work. Estimates only — always verify with current rules."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="card-interactive group">
              <div className="module-icon bg-gold-100 text-gold-700">
                {toolIcons[t.slug] ?? <Calculator className="h-5 w-5" />}
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
