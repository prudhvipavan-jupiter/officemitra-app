import { Footer } from "./Footer";
import { Header } from "./Header";
import { getSiteLogoUrl } from "@/lib/site/store";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const logoUrl = await getSiteLogoUrl();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header logoUrl={logoUrl} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer logoUrl={logoUrl} />
    </>
  );
}
