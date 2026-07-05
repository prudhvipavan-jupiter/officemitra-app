import Link from "next/link";
import { Bell } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  const updates = await listContent("update", true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Updates" }]}
            title="Updates Centre"
            description="What changed, who is affected, and what action is required — explained in plain language."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        {updates.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={Bell}
              title="No updates yet"
              description="Policy changes, new GOs, and office announcements will appear here once published. Subscribe to updates by checking back regularly."
            />
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {updates.map((u) => (
              <li key={u.id}>
                <Link href={`/updates/${u.slug}`} className="card-interactive block">
                  <h2 className="font-semibold text-navy-900">{u.title}</h2>
                  <p className="mt-1.5 text-sm text-gray-600">{u.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
