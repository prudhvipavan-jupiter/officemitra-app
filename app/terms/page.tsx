import { PageHeader } from "@/components/ui/PageHeader";

export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} title="Terms of Use" />
        </div>
      </div>
      <div className="page-body-narrow prose-article">
        <p className="mt-8">Last updated: July 2026</p>

        <h2>Acceptance</h2>
        <p>
          By using OfficeMitra, you agree to these terms. If you do not agree, please do not use the platform.
        </p>

        <h2>Nature of the service</h2>
        <p>
          OfficeMitra is a professional administrative knowledge platform. It is <strong>not</strong> an official
          government website and does <strong>not</strong> provide legal advice. All content is for guidance purposes
          only.
        </p>

        <h2>Your responsibilities</h2>
        <ul>
          <li>Verify all information with current Government Orders and your controlling officer</li>
          <li>Do not rely on OfficeMitra as a substitute for official channels or legal counsel</li>
          <li>Provide accurate information when submitting community questions</li>
          <li>Do not submit confidential or sensitive government documents without authorisation</li>
        </ul>

        <h2>Content accuracy</h2>
        <p>
          We strive to keep content accurate and up to date, but rules change frequently. OfficeMitra makes no
          warranty that content is complete, current, or applicable to your specific situation.
        </p>

        <h2>Expert Assistance</h2>
        <p>
          Expert Assistance provides administrative guidance based on practical office experience. It is not a legal
          opinion or official government direction. For disputed or legally complex matters, consult your controlling
          officer or legal cell.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          OfficeMitra and its contributors are not liable for any loss or damage arising from use of the platform or
          reliance on its content.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: admin@theofficemitra.com
        </p>
      </div>
    </>
  );
}
