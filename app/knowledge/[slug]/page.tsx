import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { getBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBySlug("article", slug);
  if (!article) notFound();

  const cover = article.data.cover_image ? String(article.data.cover_image) : null;

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
          <span className="badge bg-navy-50 text-navy-700">{article.category}</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">{article.title}</h1>
          {article.summary && <p className="mt-3 text-lg text-gray-600">{article.summary}</p>}
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice compact />
        <div className="prose-article mt-8">
          <ReactMarkdown>{article.body ?? ""}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
