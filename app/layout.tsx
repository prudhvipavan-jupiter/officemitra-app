import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theofficemitra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OfficeMitra — AP Government Office Knowledge",
    template: "%s | OfficeMitra",
  },
  description:
    "Administrative knowledge, documents, community Q&A, and office tools for Andhra Pradesh government ministerial staff.",
  openGraph: {
    title: "OfficeMitra",
    description: "One stop for AP government office knowledge and tools.",
    url: siteUrl,
    siteName: "OfficeMitra",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
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
