import Link from "next/link";
import { MessageCircle, Shield } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";

export default function ExpertPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Expert Help" }]}
            title="Expert Assistance"
            description="Personalized administrative guidance from experienced Health Department practitioners."
          />
        </div>
      </div>
      <div className="page-body-narrow space-y-8">
        <DisclaimerNotice />

        <div className="expert-banner">
          <div className="pl-3">
            <h2 className="text-xl font-bold text-navy-900">What we can help with</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                How to process a case and which rules apply
              </li>
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                Draft format and common corrections
              </li>
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                Document completeness checks
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-navy-900">What we do not provide</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Expert Assistance does not provide legal opinions, issue official orders, guarantee audit clearance,
            or act on behalf of any government department. For disputed or legally complex matters, consult your
            controlling officer or departmental legal cell.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Contact OfficeMitra
          </Link>
          <Link href="/community" className="btn-secondary">
            <MessageCircle className="h-4 w-4" />
            Ask in Community
          </Link>
        </div>
      </div>
    </>
  );
}
