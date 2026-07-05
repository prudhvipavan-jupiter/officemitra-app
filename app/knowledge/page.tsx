import Link from "next/link";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function KnowledgePage() {
  const articles = await listContent("article", true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Knowledge Hub</h1>
      <p className="mt-2 text-gray-600">Practical articles for AP government administration.</p>
      {articles.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-navy-200 py-12 text-center text-gray-500">No articles yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {articles.map((a) => (
            <li key={a.id}>
              <Link href={`/knowledge/${a.slug}`} className="card block">
                <h2 className="font-semibold text-navy-900">{a.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
