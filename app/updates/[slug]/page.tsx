import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { getBySlug } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const update = await getBySlug("update", slug);
  if (!update) notFound();

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/updates" className="hover:text-navy-700">Updates</Link>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">{update.title}</h1>
          {update.summary && <p className="mt-3 text-lg text-gray-600">{update.summary}</p>}
        </div>
      </div>
      <div className="page-body-narrow">
        <DisclaimerNotice compact />
        <div className="prose-article mt-8">
          <ReactMarkdown>{update.body ?? ""}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
