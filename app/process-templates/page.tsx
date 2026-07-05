import Link from "next/link";
import { ArrowRight, ClipboardList, Download, FileText, ListOrdered } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { officeTemplates } from "@/lib/data/office-templates";
import { processGuides } from "@/lib/data/process-templates";

const CATEGORY_LABELS: Record<string, string> = {
  establishment: "Establishment",
  leave: "Leave",
  finance: "Finance",
  pension: "Pension",
  apgli: "APGLI",
  gpf: "GPF",
  general: "General",
};

export default function ProcessTemplatesPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-6xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Process & Templates" }]}
            title="Process & Templates"
            description="Step-by-step workflows for common AP government office cases, plus ready-to-use drafting formats."
          />
        </div>
      </div>
      <div className="page-body max-w-6xl">
        <DisclaimerNotice />

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy-900">Process guides</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            {processGuides.length} procedural workflows for establishment, leave, finance, and pension matters.
            Each guide links to a full Knowledge Hub article with checklists and references.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {processGuides.map((guide) => (
              <div key={guide.slug} className="home-card flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="module-icon bg-indigo-50 text-indigo-700">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <span className="badge bg-navy-50 text-navy-700">
                    {CATEGORY_LABELS[guide.category] ?? guide.category}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{guide.description}</p>
                <ol className="mt-4 space-y-1.5 border-t border-navy-50 pt-4">
                  {guide.steps.slice(0, 4).map((step, i) => (
                    <li key={step} className="flex gap-2 text-xs text-gray-600">
                      <span className="font-semibold text-gold-600">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                  {guide.steps.length > 4 && (
                    <li className="text-xs text-gray-500">+{guide.steps.length - 4} more steps in full guide</li>
                  )}
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
        </section>

        <section className="mt-16 border-t border-navy-100 pt-16">
          <h2 className="text-xl font-bold text-navy-900">Downloadable templates</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            Plain-text drafting formats for common office orders and letters. Open in Word, fill in the bracketed
            fields, and adapt to your department&apos;s standing instructions.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officeTemplates.map((tpl) => (
              <li key={tpl.id} className="home-card flex h-full flex-col">
                <div className="module-icon bg-gold-100 text-gold-700">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="mt-3 badge bg-navy-50 text-navy-700 w-fit">
                  {CATEGORY_LABELS[tpl.category] ?? tpl.category}
                </span>
                <h3 className="mt-3 font-semibold text-navy-900">{tpl.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-600">{tpl.description}</p>
                <a
                  href={`/templates/${tpl.filename}`}
                  download={tpl.filename}
                  className="btn-secondary mt-5 w-fit text-sm"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/documents" className="btn-primary">
            Document Library
          </Link>
          <Link href="/knowledge" className="btn-secondary">
            Knowledge Hub
          </Link>
          <Link href="/expert" className="btn-secondary">
            Request expert guidance
          </Link>
        </div>
      </div>
    </>
  );
}
