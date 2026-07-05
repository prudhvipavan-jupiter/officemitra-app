export interface PortalLink {
  name: string;
  url: string;
  description: string;
  category: "finance" | "establishment" | "health" | "general";
}

/** Curated AP portals used most often by ministerial staff */
export const portalLinks: PortalLink[] = [
  {
    name: "CFMS — Comprehensive Financial Management System",
    url: "https://cfms.ap.gov.in/",
    description: "Generate pay bills, receipts, and DDO financial workflows",
    category: "finance",
  },
  {
    name: "HRMS — Employee Self Service",
    url: "https://hrms.ap.gov.in/",
    description: "Service book, leave balance, and employee records",
    category: "establishment",
  },
  {
    name: "GOIR — Government Orders Repository",
    url: "https://goir.ap.gov.in/",
    description: "Search and download Andhra Pradesh Government Orders",
    category: "general",
  },
  {
    name: "APGLI Portal",
    url: "https://apgli.ap.gov.in/",
    description: "Policy details, premium, and AP Government Life Insurance claims",
    category: "finance",
  },
  {
    name: "EHS — Employees Health Scheme",
    url: "https://ehs.ap.gov.in/",
    description: "Health scheme eligibility, empanelled hospitals, and cards",
    category: "health",
  },
];

/** Daily-use calculators and checklists for AP ministerial staff */
export const tools = [
  {
    slug: "pay-bill-checklist",
    title: "Pay Bill Checklist",
    description: "Step-by-step verification before forwarding the monthly pay bill",
  },
  {
    slug: "leave-accrual",
    title: "Leave Accrual Estimator",
    description: "Rough estimate of earned leave accrued based on months of service",
  },
  {
    slug: "working-days",
    title: "Working Days Calculator",
    description: "Count working days between two dates (excludes Saturdays and Sundays)",
  },
  {
    slug: "apgli-premium",
    title: "APGLI Premium Calculator",
    description: "Estimate monthly APGLI premium from insurable amount",
  },
  {
    slug: "probation-calculator",
    title: "Probation Calculator",
    description: "Estimate probation completion date from date of joining",
  },
] as const;
