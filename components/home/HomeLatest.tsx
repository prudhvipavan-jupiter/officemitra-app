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
    <section className="home-section border-t border-navy-100/80 !py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="home-heading">Latest from OfficeMitra</h2>
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700"
        >
          Explore Knowledge Hub <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {latestUpdates.length > 0 && latestArticles.length > 0 ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
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
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-navy-800">
              {latestUpdates.length > 0 ? "Recent updates" : "New articles"}
            </h3>
            <Link
              href={latestUpdates.length > 0 ? "/updates" : "/knowledge"}
              className="text-sm font-medium text-gold-600 hover:text-gold-700"
            >
              View all
            </Link>
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(latestUpdates.length > 0 ? latestUpdates : latestArticles).map((item) => (
              <li key={item.id}>
                <Link
                  href={`${PUBLIC_PATH[latestUpdates.length > 0 ? "update" : "article"]}/${item.slug}`}
                  className="card-interactive flex h-full flex-col !p-4"
                >
                  <p className="font-medium text-navy-900">{item.title}</p>
                  {item.summary && <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{item.summary}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
}
