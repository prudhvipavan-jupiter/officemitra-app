import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleMarkdown } from "@/components/content/ArticleMarkdown";
import { ArticleToc, extractHeadings } from "@/components/content/ArticleToc";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WhatsAppShare } from "@/components/ui/WhatsAppShare";
import { getBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBySlug("article", slug);
  if (!article) notFound();

  const cover = article.data.cover_image ? String(article.data.cover_image) : null;
  const verified = Boolean(article.data.verified);
  const body = article.body ?? "";
  const headings = extractHeadings(body);
  const path = `/knowledge/${slug}`;

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/knowledge" className="hover:text-navy-700">Knowledge</Link>
          </nav>
          {cover && <img src={cover} alt="" className="mb-6 rounded-xl shadow-sm" />}
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge bg-navy-50 text-navy-700">{article.category}</span>
            {verified && <VerifiedBadge label="Verified guidance" />}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">{article.title}</h1>
          {article.summary && <p className="mt-3 text-lg text-gray-600">{article.summary}</p>}
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice compact />
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppShare title={article.title} path={path} />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ArticleToc headings={headings} />
            </div>
          </aside>
          <div>
            {headings.length >= 2 && (
              <div className="mb-8 lg:hidden">
                <ArticleToc headings={headings} />
              </div>
            )}
            <div className="prose-article">
              <ArticleMarkdown body={body} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
