import Link from "next/link";
import { Download, FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const docs = await listContent("document", true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Documents" }]}
            title="Document Library"
            description="Government Orders, circulars, forms, and reference files — uploaded and managed through the admin CMS."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        {docs.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={FolderOpen}
              title="No documents published yet"
              description="GOs, circulars, and office reference files will be listed here once uploaded. Documents are added by administrators — not scraped from other sites."
            >
              <Link href="/portals" className="btn-secondary">Browse Official Portals</Link>
            </EmptyState>
          </div>
        ) : (
          <ul className="mt-10 space-y-3">
            {docs.map((d) => {
              const goNumber = d.data.go_number ? String(d.data.go_number) : null;
              const dated = d.data.dated ? String(d.data.dated) : null;
              return (
              <li key={d.id} className="card flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge bg-navy-50 text-navy-700">{d.category}</span>
                    {goNumber && (
                      <span className="badge bg-gold-100 text-gold-800">{goNumber}</span>
                    )}
                  </div>
                  <Link href={`/documents/${d.slug}`} className="mt-2 block font-semibold text-navy-900 hover:text-gold-600">
                    {d.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-600">{d.summary}</p>
                  {dated && (
                    <p className="mt-1 text-xs text-gray-500">Dated: {dated}</p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link href={`/documents/${d.slug}`} className="btn-secondary shrink-0 text-sm">
                    View details
                  </Link>
                  {d.data.file ? (
                    <a
                      href={String(d.data.file)}
                      className="btn-secondary shrink-0 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  ) : d.data.external_url ? (
                    <a
                      href={String(d.data.external_url)}
                      className="btn-secondary shrink-0 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                      Official source
                    </a>
                  ) : null}
                </div>
              </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
