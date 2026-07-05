import Link from "next/link";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function KnowledgePage() {
  const articles = await listContent("article", true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Knowledge Hub" }]}
            title="Knowledge Hub"
            description="Practical articles on establishment, finance, leave, and office procedures for AP government staff."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={BookOpen}
              title="Articles coming soon"
              description="Knowledge articles will appear here once published through the admin CMS. Check back shortly or browse office tools and official portals in the meantime."
            >
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/tools" className="btn-primary">Browse Tools</Link>
                <Link href="/portals" className="btn-secondary">Official Portals</Link>
              </div>
            </EmptyState>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <li key={a.id}>
                <Link href={`/knowledge/${a.slug}`} className="card-interactive block">
                  <p className="badge bg-navy-50 text-navy-700">{a.category}</p>
                  <h2 className="mt-3 font-semibold text-navy-900">{a.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{a.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
