import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WhatsAppShare } from "@/components/ui/WhatsAppShare";
import { FAQ_CATEGORY_LABELS } from "@/lib/site-data";
import { getBySlug } from "@/lib/cms/store";
import { contentPublicHref } from "@/lib/cms/public-href";
import { slugify } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

export default async function FaqDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const decoded = decodeURIComponent(rawSlug);
  const canonical = slugify(decoded);

  if (decoded !== canonical) {
    redirect(`/faq/${canonical}`);
  }

  const faq = await getBySlug("faq", canonical);
  if (!faq) notFound();

  const path = contentPublicHref(faq);
  const verified = Boolean(faq.data?.verified);

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/faq" className="hover:text-navy-700">FAQ</Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge bg-navy-50 text-navy-700">{FAQ_CATEGORY_LABELS[faq.category] ?? faq.category}</span>
            {verified && <VerifiedBadge />}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 md:text-3xl">{faq.title}</h1>
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice compact />
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppShare title={faq.title} path={path} />
        </div>
        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <p className="leading-relaxed text-gray-700">{faq.body}</p>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          <Link href="/faq" className="font-medium text-gold-600 hover:text-gold-700">
            ← Back to all FAQ
          </Link>
        </p>
      </div>
    </>
  );
}
