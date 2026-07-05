import Link from "next/link";
import { tools } from "@/lib/site-data";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Office Tools</h1>
      <p className="mt-2 text-gray-600">Free calculators and checklists for daily AP government work.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="card">
            <h2 className="font-semibold text-navy-900">{t.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
