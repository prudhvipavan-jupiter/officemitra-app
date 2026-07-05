export interface PortalLink {
  name: string;
  url: string;
  description: string;
  category: "finance" | "establishment" | "health" | "general";
}

export const portalLinks: PortalLink[] = [
  {
    name: "CFMS — Comprehensive Financial Management System",
    url: "https://cfms.ap.gov.in/",
    description: "Pay bills, receipts, and DDO workflows",
    category: "finance",
  },
  {
    name: "GOIR — Government Orders Repository",
    url: "https://goir.ap.gov.in/",
    description: "Search Andhra Pradesh Government Orders",
    category: "general",
  },
  {
    name: "APGLI",
    url: "https://apgli.ap.gov.in/",
    description: "AP Government Life Insurance policies and claims",
    category: "finance",
  },
  {
    name: "HRMS — Employee Self Service",
    url: "https://hrms.ap.gov.in/",
    description: "Service details, leave, and employee records",
    category: "establishment",
  },
  {
    name: "EHS — Employees Health Scheme",
    url: "https://ehs.ap.gov.in/",
    description: "Health scheme eligibility and hospitals",
    category: "health",
  },
  {
    name: "NIDHI — Treasury Portal",
    url: "https://nidhi.ap.gov.in/",
    description: "Treasury and account-related services",
    category: "finance",
  },
];

export const tools = [
  { slug: "pay-bill-checklist", title: "Pay Bill Checklist", description: "Monthly pay bill verification steps for DDOs" },
  { slug: "probation-calculator", title: "Probation Calculator", description: "Estimate probation completion date" },
  { slug: "leave-accrual", title: "Leave Accrual Estimator", description: "Estimate earned leave balance" },
  { slug: "el-encashment", title: "EL Encashment Calculator", description: "Rough EL encashment amount estimate" },
  { slug: "working-days", title: "Working Days Calculator", description: "Count working days between two dates" },
  { slug: "apgli-premium", title: "APGLI Premium Calculator", description: "Estimate APGLI premium deduction" },
] as const;
