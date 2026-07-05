import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { getPublicVisitorCount } from "@/lib/analytics/store";
import { getSiteLogoUrl } from "@/lib/site/store";
import { getSiteSettings } from "@/lib/site/settings-store";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [logoUrl, settings] = await Promise.all([getSiteLogoUrl(), getSiteSettings()]);
  const visitorCount = settings.show_public_visitor_count ? await getPublicVisitorCount() : null;

  return (
    <>
      <PageViewTracker />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header logoUrl={logoUrl} showProcessTemplates={settings.process_templates_visible} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer logoUrl={logoUrl} visitorCount={visitorCount} />
    </>
  );
}
