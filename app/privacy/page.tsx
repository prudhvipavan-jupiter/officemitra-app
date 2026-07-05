import { PageHeader } from "@/components/ui/PageHeader";

export default function PrivacyPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl">
          <PageHeader breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} title="Privacy Policy" />
        </div>
      </div>
      <div className="page-body-narrow prose-article">
        <p className="mt-8">Last updated: July 2026</p>

        <h2>What we collect</h2>
        <p>We collect information you voluntarily submit through:</p>
        <ul>
          <li>Staff Community question forms (name, designation, institution, question details)</li>
          <li>Contact and expert guidance enquiries (email correspondence)</li>
          <li>Admin CMS usage (restricted to authorised administrators)</li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To respond to community questions and expert guidance requests</li>
          <li>To improve platform content and usability</li>
          <li>To moderate community submissions before publishing</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell or share your personal data with third parties for marketing purposes. Data is stored
          securely on our hosting infrastructure.
        </p>

        <h2>Retention</h2>
        <p>
          Community submissions and contact correspondence are retained as long as needed to provide the service.
          You may request deletion of your personal data by emailing admin@theofficemitra.com.
        </p>

        <h2>Security</h2>
        <p>
          Data is transmitted over encrypted connections (HTTPS). Admin access is restricted and password-protected.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact admin@theofficemitra.com.
        </p>
      </div>
    </>
  );
}
