import Link from "next/link";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const docs = await listContent("document", true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Document Library</h1>
      <p className="mt-2 text-gray-600">GOs, circulars, forms, and office documents.</p>
      {docs.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-navy-200 py-12 text-center text-gray-500">No documents yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {docs.map((d) => (
            <li key={d.id} className="card flex items-center justify-between">
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="text-sm text-gray-500">{d.summary}</p>
              </div>
              {d.data.file ? (
                <a href={String(d.data.file)} className="btn-secondary text-sm" target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
