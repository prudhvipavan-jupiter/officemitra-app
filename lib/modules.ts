import {
  Bell,
  BookOpen,
  Calculator,
  ExternalLink,
  FileText,
  FolderOpen,
  HelpCircle,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export interface PlatformModule {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const platformModules: PlatformModule[] = [
  {
    href: "/knowledge",
    title: "Knowledge Hub",
    description: "Practical articles on establishment, finance, and office procedures",
    icon: BookOpen,
    accent: "bg-blue-50 text-blue-700",
  },
  {
    href: "/documents",
    title: "Documents",
    description: "Government Orders, circulars, forms, and reference files",
    icon: FolderOpen,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/updates",
    title: "Updates",
    description: "What changed, who is affected, and what action is required",
    icon: Bell,
    accent: "bg-amber-50 text-amber-700",
  },
  {
    href: "/community",
    title: "Staff Community",
    description: "Ask questions and learn from peers — moderated before publishing",
    icon: MessageCircle,
    accent: "bg-violet-50 text-violet-700",
  },
  {
    href: "/tools",
    title: "Office Calculators",
    description: "AP Government Order–based calculators for pay, leave, APGLI, GPF, and pension",
    icon: Calculator,
    accent: "bg-rose-50 text-rose-700",
  },
  {
    href: "/portals",
    title: "Official Portals",
    description: "Curated links to CFMS, HRMS, incometax.gov.in, and 50+ official portals",
    icon: ExternalLink,
    accent: "bg-cyan-50 text-cyan-700",
  },
];

export const secondaryModules = [
  {
    href: "/faq",
    title: "FAQ",
    description: "Quick answers to common administrative questions",
    icon: HelpCircle,
  },
  {
    href: "/expert",
    title: "Expert Help",
    description: "Guidance from experienced Health Department practitioners",
    icon: FileText,
  },
];
