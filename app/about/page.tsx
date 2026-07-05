import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]} title="About OfficeMitra" />
        </div>
      </div>
      <div className="page-body-narrow prose-article">
        <DisclaimerNotice />
        <p className="mt-8">
          OfficeMitra is a professional administrative knowledge platform for Andhra Pradesh government ministerial
          staff. We help you find practical guidance on office procedures, understand Government Orders, and use
          everyday tools — without wading through scattered PDFs and circulars.
        </p>
        <h2>The problem we solve</h2>
        <p>
          Government employees spend hours searching scattered GOs, circulars, and office files, yet still lack clear
          guidance on how to process cases, what documents are required, and how to draft proceedings correctly.
          OfficeMitra brings that knowledge together in one place.
        </p>
        <h2>Who prepares the content</h2>
        <p>
          Our content is prepared by practitioners with Health Department administrative experience in Andhra Pradesh.
          It reflects common office practice and is updated as rules change.
        </p>
        <h2>What we are not</h2>
        <ul>
          <li>OfficeMitra does not represent the Government of Andhra Pradesh or any department.</li>
          <li>We do not issue official orders or directions.</li>
          <li>We do not provide legal advice.</li>
          <li>For disputed, legally complex, or policy-decision matters, consult your controlling officer or departmental legal cell.</li>
        </ul>
        <h2>Our modules</h2>
        <ul>
          <li><strong>Knowledge Hub</strong> — practical articles on establishment, finance, and procedures</li>
          <li><strong>Documents</strong> — GOs, circulars, and reference files</li>
          <li><strong>Updates</strong> — what changed and what action is required</li>
          <li><strong>Staff Community</strong> — moderated Q&amp;A from peers</li>
          <li><strong>Office Tools</strong> — calculators and checklists</li>
          <li><strong>Expert Assistance</strong> — guidance from experienced practitioners</li>
        </ul>
      </div>
    </>
  );
}
