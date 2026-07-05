import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listContent } from "@/lib/cms/store";
import { PUBLIC_PATH } from "@/lib/cms/types";

export async function HomeLatest() {
  const [updates, articles] = await Promise.all([
    listContent("update", true),
    listContent("article", true),
  ]);

  const latestUpdates = updates.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  if (latestUpdates.length === 0 && latestArticles.length === 0) return null;

  return (
    <section className="border-t border-navy-100 bg-white px-4 py-14">
      <div className="page-body !py-0">
        <h2 className="text-2xl font-bold text-navy-900">Latest from OfficeMitra</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {latestUpdates.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy-800">Recent updates</h3>
                <Link href="/updates" className="text-sm font-medium text-gold-600 hover:text-gold-700">
                  View all
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {latestUpdates.map((u) => (
                  <li key={u.id}>
                    <Link href={`${PUBLIC_PATH.update}/${u.slug}`} className="card-interactive block !p-4">
                      <p className="font-medium text-navy-900">{u.title}</p>
                      {u.summary && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{u.summary}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {latestArticles.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy-800">New articles</h3>
                <Link href="/knowledge" className="text-sm font-medium text-gold-600 hover:text-gold-700">
                  View all
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {latestArticles.map((a) => (
                  <li key={a.id}>
                    <Link href={`${PUBLIC_PATH.article}/${a.slug}`} className="card-interactive block !p-4">
                      <p className="font-medium text-navy-900">{a.title}</p>
                      {a.summary && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{a.summary}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link href="/knowledge" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-gold-600">
          Explore Knowledge Hub <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
