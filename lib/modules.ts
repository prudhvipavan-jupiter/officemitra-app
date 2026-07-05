import {
  Bell,
  BookOpen,
  Calculator,
  ExternalLink,
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
    description:
      "Government rules, establishment matters, finance, leave, pension, and administrative procedures explained in simple language.",
    icon: BookOpen,
    accent: "bg-blue-50 text-blue-700",
  },
  {
    href: "/documents",
    title: "Documents",
    description: "Government Orders, circulars, proceedings, forms, manuals, and reference documents.",
    icon: FolderOpen,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/updates",
    title: "Updates",
    description: "Latest Government Orders, circulars, policy changes, and implementation guidance.",
    icon: Bell,
    accent: "bg-amber-50 text-amber-800",
  },
  {
    href: "/community",
    title: "Staff Community",
    description:
      "Ask questions, share experiences, discuss office procedures, and learn from fellow government employees.",
    icon: MessageCircle,
    accent: "bg-violet-50 text-violet-700",
  },
  {
    href: "/tools",
    title: "Office Calculators",
    description:
      "Smart calculators for Pay Fixation, Leave Encashment, APGLI, GPF, Pension, DA Arrears, Income Tax, and more.",
    icon: Calculator,
    accent: "bg-rose-50 text-rose-700",
  },
  {
    href: "/portals",
    title: "Official Portals",
    description:
      "Quick access to CFMS, HRMS, AP Treasury, APGLI, GPF, Income Tax, and other official government websites.",
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
    description: "Guidance from experienced AP Government ministerial experts",
    icon: BookOpen,
  },
];
