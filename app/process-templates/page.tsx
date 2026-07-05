import Link from "next/link";
import { ArrowRight, ClipboardList, ListOrdered } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { processGuides } from "@/lib/data/process-templates";

export default function ProcessTemplatesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-4xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Process & Templates" }]}
            title="Process & Templates"
            description="Step-by-step office workflows and drafting guidance for AP government staff. More templates coming soon."
          />
        </div>
      </div>
      <div className="page-body max-w-4xl">
        <DisclaimerNotice />

        <p className="mt-6 text-[0.9375rem] leading-relaxed text-gray-700">
          Use these procedural guides to process common establishment and finance cases. Downloadable Word/PDF
          templates will be added in a future update — for now, follow the linked Knowledge Hub articles for full
          checklists.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processGuides.map((guide) => (
            <div key={guide.slug} className="home-card flex h-full flex-col">
              <div className="module-icon bg-indigo-50 text-indigo-700">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-navy-900">{guide.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{guide.description}</p>
              <ol className="mt-4 space-y-1.5 border-t border-navy-50 pt-4">
                {guide.steps.map((step, i) => (
                  <li key={step} className="flex gap-2 text-xs text-gray-600">
                    <ListOrdered className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                    <span>
                      <span className="font-medium text-navy-800">{i + 1}.</span> {step}
                    </span>
                  </li>
                ))}
              </ol>
              <Link
                href={`/knowledge/${guide.articleSlug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700"
              >
                Full guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-navy-900">More processes & downloadable templates coming soon</p>
          <p className="mt-2 text-sm text-gray-600">
            Proceedings formats, office notes, speaking orders, and bill checklists.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/knowledge" className="btn-primary">
              Knowledge Hub
            </Link>
            <Link href="/expert" className="btn-secondary">
              Request expert guidance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
