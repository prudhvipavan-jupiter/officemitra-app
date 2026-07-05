import Link from "next/link";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  const updates = await listContent("update", true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Updates Centre</h1>
      {updates.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No updates published yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {updates.map((u) => (
            <li key={u.id}>
              <Link href={`/updates/${u.slug}`} className="card block">
                <h2 className="font-semibold text-navy-900">{u.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{u.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
