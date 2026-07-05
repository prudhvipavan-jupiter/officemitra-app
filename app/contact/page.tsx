import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            title="Contact"
            description="For expert guidance requests, platform feedback, and general enquiries."
          />
        </div>
      </div>
      <div className="page-body-narrow">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card">
            <div className="module-icon bg-gold-100 text-gold-700">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-semibold text-navy-900">Email</h2>
            <a href="mailto:admin@theofficemitra.com" className="mt-2 block text-navy-700 hover:text-gold-600">
              admin@theofficemitra.com
            </a>
            <p className="mt-2 text-sm text-gray-600">Expert guidance requests and platform feedback.</p>
          </div>
          <div className="card">
            <div className="module-icon bg-navy-50 text-navy-700">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-semibold text-navy-900">Staff Community</h2>
            <p className="mt-2 text-sm text-gray-600">For general questions visible to other staff after moderation.</p>
            <Link href="/community" className="btn-secondary mt-4 text-sm">
              Ask in Community
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-500">
          OfficeMitra is not an official government website. We do not provide legal advice.
        </p>
      </div>
    </>
  );
}
