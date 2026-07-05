import { HelpCircle } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await listContent("faq", true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
            title="Frequently Asked Questions"
            description="Quick answers to common administrative questions for AP government staff."
          />
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice />
        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon={HelpCircle}
              title="FAQ entries coming soon"
              description="Common questions and answers will be added here. For immediate help, try the Staff Community or contact us directly."
            />
          </div>
        ) : (
          <dl className="mt-10 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card">
                <dt className="font-semibold text-navy-900">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-gray-700">{item.body}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </>
  );
}
