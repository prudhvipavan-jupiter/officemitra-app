import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { FaqList } from "@/components/faq/FaqList";
import { listContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const items = await listContent("faq", true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-4xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
            title="Frequently Asked Questions"
            description={`${items.length} practical answers for AP government ministerial staff — leave, pay, tax, pension, and more.`}
          />
        </div>
      </div>
      <div className="page-body max-w-4xl">
        <DisclaimerNotice />
        <FaqList items={items} />
      </div>
    </>
  );
}
