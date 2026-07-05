import { redirect } from "next/navigation";
import { LogoSettings } from "@/components/admin/LogoSettings";
import { ModuleSettings } from "@/components/admin/ModuleSettings";
import { isAdmin } from "@/lib/auth";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site/settings-store";
import { getSiteLogo } from "@/lib/site/store";

export default async function AdminSettingsPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [logo, settings] = await Promise.all([getSiteLogo(), getSiteSettings()]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900">Site settings</h1>
      <p className="mt-1 text-gray-600">Branding, module visibility, and site information.</p>

      <div className="mt-8 space-y-6">
        <LogoSettings
          initialLogo={
            logo ? { url: logo.url, filename: logo.filename, mime_type: logo.mime_type } : null
          }
        />

        <ModuleSettings initial={settings} />

        <div className="card">
          <h2 className="text-lg font-semibold text-navy-900">Site information</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-navy-50 pb-3">
              <dt className="text-gray-500">Public URL</dt>
              <dd className="font-medium text-navy-900">
                <a href={SITE_URL} className="hover:text-gold-600" target="_blank" rel="noopener noreferrer">
                  {SITE_URL}
                </a>
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-navy-50 pb-3">
              <dt className="text-gray-500">Contact email</dt>
              <dd className="font-medium text-navy-900">{CONTACT_EMAIL}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Sitemap</dt>
              <dd className="font-medium text-navy-900">
                <a href={`${SITE_URL}/sitemap.xml`} className="hover:text-gold-600" target="_blank" rel="noopener noreferrer">
                  /sitemap.xml
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
