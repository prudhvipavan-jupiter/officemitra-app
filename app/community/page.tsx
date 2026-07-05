import { CommunityForm } from "@/components/CommunityForm";
import { listDiscussions } from "@/lib/community/store";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const all = await listDiscussions();
  const visible = all.filter((d) => d.status === "published" || d.status === "resolved");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-navy-900">Staff Community</h1>
      <p className="mt-2 text-gray-600">Public Q&amp;A for AP ministerial staff — moderated before publishing.</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          {visible.length === 0 ? (
            <p className="text-gray-500">No discussions yet. Be the first to ask.</p>
          ) : (
            <ul className="space-y-4">
              {visible.map((d) => (
                <li key={d.id} className="card">
                  <h2 className="font-semibold">{d.title}</h2>
                  <p className="mt-2 text-sm text-gray-700">{d.body}</p>
                  {d.reply_markdown && (
                    <div className="mt-4 rounded-lg bg-navy-50 p-3 text-sm">
                      <strong>Reply:</strong> {d.reply_markdown}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <CommunityForm />
      </div>
    </div>
  );
}
