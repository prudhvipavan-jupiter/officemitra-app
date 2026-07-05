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
            {docs.map((d) => (
              <li key={d.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-navy-900">{d.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{d.summary}</p>
                </div>
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
                    View on GOIR
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
