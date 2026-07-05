import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await listContent("faq", true);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">FAQ</h1>
      {items.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No FAQ entries yet.</p>
      ) : (
        <dl className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="card">
              <dt className="font-semibold text-navy-900">{item.title}</dt>
              <dd className="mt-2 text-gray-700">{item.body}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
