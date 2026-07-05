export type PortalCategory =
  | "finance"
  | "establishment"
  | "health"
  | "tax"
  | "pension"
  | "general"
  | "central"
  | "utility";

export interface PortalLink {
  name: string;
  url: string;
  description: string;
  category: PortalCategory;
}

export type ToolCategory =
  | "checklist"
  | "leave"
  | "finance"
  | "establishment"
  | "tax"
  | "pension"
  | "general";

export type ToolInput = {
  key: string;
  label: string;
  type?: "number" | "date" | "text" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type ToolDefinition =
  | {
      slug: string;
      title: string;
      description: string;
      category: ToolCategory;
      kind: "checklist";
      items: string[];
    }
  | {
      slug: string;
      title: string;
      description: string;
      category: ToolCategory;
      kind: "calculator";
      calculatorId: string;
      inputs: ToolInput[];
      hint?: string;
    };

export interface FaqEntry {
  id: string;
  category: string;
  title: string;
  body: string;
}

export const PORTAL_CATEGORY_LABELS: Record<PortalCategory, string> = {
  finance: "Finance & Treasury",
  establishment: "Establishment & HR",
  health: "Health",
  tax: "Income Tax",
  pension: "Pension & Retirement",
  general: "AP Government",
  central: "Central Government",
  utility: "Utilities & Services",
};

export const PORTAL_CATEGORY_COLORS: Record<PortalCategory, string> = {
  finance: "bg-emerald-50 text-emerald-700",
  establishment: "bg-blue-50 text-blue-700",
  health: "bg-rose-50 text-rose-700",
  tax: "bg-amber-50 text-amber-800",
  pension: "bg-violet-50 text-violet-700",
  general: "bg-gray-100 text-gray-700",
  central: "bg-indigo-50 text-indigo-700",
  utility: "bg-cyan-50 text-cyan-700",
};

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  checklist: "Checklists",
  leave: "Leave",
  finance: "Pay & Allowances",
  establishment: "Establishment",
  tax: "Income Tax",
  pension: "Pension & Gratuity",
  general: "General",
};

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  leave: "Leave",
  finance: "Pay & Finance",
  apgli: "APGLI",
  gpf: "GPF / NPS",
  establishment: "Establishment",
  treasury: "Treasury & CFMS",
  health: "Health & EHS",
  tax: "Income Tax",
  pension: "Pension",
  retirement: "Retirement",
  transfer: "Transfer & Posting",
};
