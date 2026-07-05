import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = await getBySlug("update", slug);
  if (!update) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/updates" className="text-sm text-navy-700">← Updates</Link>
      <h1 className="mt-6 text-3xl font-bold text-navy-900">{update.title}</h1>
      <div className="prose-article mt-8">
        <ReactMarkdown>{update.body ?? ""}</ReactMarkdown>
      </div>
    </article>
  );
}
