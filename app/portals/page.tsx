import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { portalLinks } from "@/lib/site-data";

const categoryLabels: Record<string, string> = {
  finance: "Finance",
  establishment: "Establishment",
  health: "Health",
  general: "General",
};

const categoryColors: Record<string, string> = {
  finance: "bg-emerald-50 text-emerald-700",
  establishment: "bg-blue-50 text-blue-700",
  health: "bg-rose-50 text-rose-700",
  general: "bg-gray-100 text-gray-700",
};

export default function PortalsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Official Portals" }]}
            title="Official Portals"
            description="Curated links to Andhra Pradesh government systems. OfficeMitra is not affiliated with these portals."
          />
        </div>
      </div>
      <div className="page-body">
        <DisclaimerNotice />
        <ul className="mt-10 space-y-4">
          {portalLinks.map((p) => (
            <li key={p.url} className="card group">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className={`badge ${categoryColors[p.category]}`}>{categoryLabels[p.category]}</span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 font-semibold text-navy-900 hover:text-gold-600"
                  >
                    {p.name}
                    <ExternalLink className="h-4 w-4 shrink-0 opacity-60" />
                  </a>
                  <p className="mt-1.5 text-sm text-gray-600">{p.description}</p>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary shrink-0 self-start text-sm"
                >
                  Open portal
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
