import Link from "next/link";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [articles, updates, documents] = await Promise.all([
    listContent("article", true),
    listContent("update", true),
    listContent("document", true),
  ]);

  return (
    <>
      <section className="hero-gradient px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400">Andhra Pradesh · English</p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">One stop for office knowledge and tools</h1>
          <p className="mt-4 text-lg text-navy-100">
            Articles, government documents, community Q&amp;A, checklists, and official portal links — built for
            ministerial staff.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/knowledge" className="btn-primary">Browse Knowledge</Link>
            <Link href="/documents" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
              Document Library
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-navy-900">Quick access</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/knowledge", title: "Knowledge Hub", desc: `${articles.length} articles` },
            { href: "/documents", title: "Documents", desc: `${documents.length} files` },
            { href: "/community", title: "Staff Community", desc: "Ask & share" },
            { href: "/tools", title: "Office Tools", desc: "6 calculators" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="card">
              <h3 className="font-semibold text-navy-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {updates.length > 0 && (
        <section className="bg-navy-50 px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-navy-900">Latest updates</h2>
            <ul className="mt-6 space-y-3">
              {updates.slice(0, 5).map((u) => (
                <li key={u.id}>
                  <Link href={`/updates/${u.slug}`} className="font-medium text-navy-800 hover:text-gold-600">
                    {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl border border-gold-200 bg-gold-100 p-8 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Need expert guidance?</h2>
            <p className="mt-2 text-gray-700">Contact us for establishment and finance guidance from practitioners.</p>
          </div>
          <Link href="/contact" className="btn-primary mt-4 md:mt-0">Contact OfficeMitra</Link>
        </div>
      </section>
    </>
  );
}
