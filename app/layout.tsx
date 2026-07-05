import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "OfficeMitra",
    template: "%s | OfficeMitra",
  },
  description:
    "Administrative knowledge, documents, community Q&A, and office tools for Andhra Pradesh government staff.",
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
