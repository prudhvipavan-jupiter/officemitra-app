import { MessageCircle } from "lucide-react";
import { CommunityForm } from "@/components/CommunityForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { listDiscussions } from "@/lib/community/store";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const all = await listDiscussions();
  const visible = all.filter((d) => d.status === "published" || d.status === "resolved");

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Staff Community" }]}
            title="Staff Community"
            description="Public Q&A for AP ministerial staff. Questions are moderated before publishing."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            {visible.length === 0 ? (
              <EmptyState
                icon={MessageCircle}
                title="Be the first to ask"
                description="No discussions published yet. Submit a question using the form — it will be reviewed before appearing here."
              />
            ) : (
              <ul className="space-y-4">
                {visible.map((d) => (
                  <li key={d.id} className="card">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-navy-50 text-navy-700">{d.category}</span>
                      {d.status === "resolved" && (
                        <span className="badge bg-emerald-50 text-emerald-700">Resolved</span>
                      )}
                    </div>
                    <h2 className="mt-3 font-semibold text-navy-900">{d.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{d.body}</p>
                    {d.reply_markdown && (
                      <div className="mt-4 rounded-xl border border-navy-100 bg-navy-50 p-4 text-sm leading-relaxed text-gray-700">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-navy-600">Reply</p>
                        {d.reply_markdown}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <CommunityForm />
          </aside>
        </div>
      </div>
    </>
  );
}
