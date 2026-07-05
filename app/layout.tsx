import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, HERO_DESCRIPTION, HERO_HEADLINE, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: HERO_DESCRIPTION,
  keywords: [
    "Andhra Pradesh government",
    "ministerial staff",
    "DDO",
    "DA calculator",
    "APGLI",
    "GPF",
    "leave rules",
    "CFMS",
    "government orders",
    "office procedures",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: SITE_NAME,
    description: HERO_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  other: { contact: CONTACT_EMAIL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
