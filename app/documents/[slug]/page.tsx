import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Download } from "lucide-react";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { getBySlug } from "@/lib/cms/store";
import { slugify } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

export default async function DocumentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const decoded = decodeURIComponent(rawSlug);
  const canonical = slugify(decoded);

  if (decoded !== canonical) {
    redirect(`/documents/${canonical}`);
  }

  const doc = await getBySlug("document", canonical);
  if (!doc) notFound();

  const fileUrl = doc.data.file ? String(doc.data.file) : null;
  const externalUrl = doc.data.external_url ? String(doc.data.external_url) : null;

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/documents" className="hover:text-navy-700">Documents</Link>
          </nav>
          <span className="badge bg-navy-50 text-navy-700">{doc.category}</span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">{doc.title}</h1>
          {doc.summary && <p className="mt-3 text-lg text-gray-600">{doc.summary}</p>}
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice compact />
        {doc.body && (
          <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
            <p className="leading-relaxed text-gray-700">{doc.body}</p>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          {fileUrl && (
            <a href={fileUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download
            </a>
          )}
          {externalUrl && (
            <a href={externalUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              View external reference
            </a>
          )}
        </div>
        <p className="mt-8 text-sm text-gray-500">
          <Link href="/documents" className="font-medium text-gold-600 hover:text-gold-700">
            ← Back to document library
          </Link>
        </p>
      </div>
    </>
  );
}
