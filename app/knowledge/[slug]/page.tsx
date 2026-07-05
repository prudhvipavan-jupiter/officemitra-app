import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getBySlug("article", slug);
  if (!article) notFound();

  const cover = article.data.cover_image ? String(article.data.cover_image) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/knowledge" className="text-sm text-navy-700">← Knowledge</Link>
      {cover && <img src={cover} alt="" className="mt-4 rounded-xl" />}
      <h1 className="mt-6 text-3xl font-bold text-navy-900">{article.title}</h1>
      <p className="mt-2 text-gray-600">{article.summary}</p>
      <div className="prose-article mt-8">
        <ReactMarkdown>{article.body ?? ""}</ReactMarkdown>
      </div>
    </article>
  );
}
