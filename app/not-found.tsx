import Link from "next/link";
import { HelpCircle, Home, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-navy-900">Page not available</h1>
          <p className="mt-3 text-gray-600">
            This link may be outdated or the content may have moved. Use search or browse FAQ to find what you need.
          </p>
        </div>
      </div>
      <div className="page-body-narrow">
        <EmptyState
          icon={HelpCircle}
          title="Let us help you find it"
          description="Search across FAQ, articles, calculators, and official portals — or return to the homepage."
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="/search" className="btn-secondary">
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link href="/faq" className="btn-secondary">
              Browse FAQ
            </Link>
          </div>
        </EmptyState>
      </div>
    </>
  );
}
