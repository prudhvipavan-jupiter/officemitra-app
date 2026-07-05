import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProcessTemplatesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Process & Templates" }]}
            title="Process & Templates"
            description="Step-by-step office workflows and downloadable formats for AP government staff."
          />
        </div>
      </div>
      <div className="page-body-narrow">
        <div className="empty-state">
          <div className="empty-state-icon">
            <Clock className="h-7 w-7 text-gold-600" />
          </div>
          <h2 className="mt-6 text-xl font-bold text-navy-900">Coming soon</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
            We are preparing procedure guides (leave processing, APGLI claims, pay fixation) and downloadable
            templates (proceedings, office notes, checklists). This module will launch in a future update.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/knowledge" className="btn-primary">
              Knowledge Hub
            </Link>
            <Link href="/faq" className="btn-secondary">
              Browse FAQ
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
          Need a specific format now?{" "}
          <Link href="/expert" className="font-medium text-navy-700 hover:text-gold-600">
            Request expert guidance
            <ArrowRight className="ml-0.5 inline h-3 w-3" />
          </Link>
        </p>
      </div>
    </>
  );
}
