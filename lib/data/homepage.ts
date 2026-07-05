/** Homepage copy and structured content */

export const HOME_HERO = {
  eyebrow: "Andhra Pradesh · Built for ministerial staff",
  headline: "Everything AP Government Staff Need. One Platform.",
  subheading:
    "Access trusted Government Orders, office procedures, FAQs, smart calculators, official portal links, practical guides, and expert assistance—all designed to help government staff work faster, make informed decisions, and handle administrative cases with confidence.",
  searchPlaceholder:
    "Search Government Orders, service rules, leave, pension, APGLI, GPF, bills, pay fixation…",
  popularSearches: [
    "Leave Rules",
    "APGLI",
    "GPF",
    "Pay Fixation",
    "Pension",
    "Medical Bills",
  ],
  ctas: [
    { href: "/knowledge", label: "Browse Knowledge", primary: true },
    { href: "/tools", label: "AP G.O. Calculators", primary: false },
    { href: "/portals", label: "Official Portals", primary: false },
  ],
} as const;

export const HOME_MODULES_SECTION = {
  title: "Everything You Need for Government Office Work",
  subtitle:
    "Discover practical resources, official references, calculators, procedural guides, and community support—all organized in one platform.",
} as const;

export const HOME_POPULAR_TOPICS = [
  { label: "Leave Rules", href: "/search?q=leave+rules" },
  { label: "APGLI", href: "/search?q=apgli" },
  { label: "GPF", href: "/search?q=gpf" },
  { label: "Pension", href: "/search?q=pension" },
  { label: "Pay Fixation", href: "/search?q=pay+fixation" },
  { label: "Service Register", href: "/search?q=service+register" },
  { label: "Medical Reimbursement", href: "/search?q=medical+reimbursement" },
  { label: "Salary Bills", href: "/search?q=salary+bills" },
  { label: "Increment", href: "/search?q=increment" },
  { label: "Treasury Bills", href: "/search?q=treasury" },
  { label: "PRC", href: "/search?q=prc" },
  { label: "NPS", href: "/search?q=nps" },
  { label: "Income Tax", href: "/search?q=income+tax" },
  { label: "Transfers", href: "/search?q=transfer" },
] as const;

export const HOME_WHY_OM = [
  {
    title: "Trusted Information",
    description: "Government Orders and official references.",
    icon: "shield" as const,
  },
  {
    title: "Practical Tools",
    description: "Time-saving calculators and templates.",
    icon: "calculator" as const,
  },
  {
    title: "Expert Guidance",
    description: "Support from experienced ministerial professionals.",
    icon: "users" as const,
  },
  {
    title: "Community Learning",
    description: "Learn together through moderated discussions.",
    icon: "message" as const,
  },
] as const;

export const HOME_HELP_SECTION = {
  title: "More Ways to Get Help",
  cards: [
    {
      title: "FAQ",
      description: "Find quick answers to frequently asked government office questions.",
      href: "/faq",
      cta: "Browse FAQs",
      icon: "help" as const,
    },
    {
      title: "Expert Assistance",
      description:
        "Personalized guidance on bills, pension proposals, service registers, pay fixation, treasury objections, and administrative cases.",
      href: "/expert",
      cta: "Request Expert Help",
      icon: "expert" as const,
    },
    {
      title: "Community",
      description: "Discuss office procedures and learn from experienced staff.",
      href: "/community",
      cta: "Join Community",
      icon: "community" as const,
    },
  ],
} as const;

export const HOME_TRUST = {
  title: "Why You Can Trust OfficeMitra",
  items: [
    "Information referenced from Government Orders",
    "Practical guidance prepared by experienced ministerial staff",
    "Regularly updated content",
    "Community discussions reviewed before publishing",
    "Expert assistance for complex administrative cases",
    "Guidance platform—not an official government website",
  ],
} as const;

export const HOME_EXPERT_BANNER = {
  eyebrow: "Expert Assistance",
  title: "Need Help with a Complex Office Case?",
  description:
    "Get personalized guidance on Bills, Service Register review, Pension Proposals, Pay Fixation, Leave Matters, Treasury objections, Administrative Procedures, and Government Orders from experienced AP Government ministerial experts.",
  primaryCta: { href: "/expert", label: "Request Expert Assistance" },
  secondaryCta: { href: "/community", label: "Ask the Community" },
} as const;

export const HOME_TESTIMONIALS = {
  title: "Trusted by Government Staff",
  items: [
    { quote: "The pension proposal checklist saved hours of work.", role: "Establishment Section" },
    { quote: "Best place to understand Government Orders in simple language.", role: "Ministerial Staff" },
    { quote: "The calculators are accurate and easy to use.", role: "DDO Office" },
  ],
} as const;

export const FOOTER_DESCRIPTION =
  "OfficeMitra is a professional knowledge platform built for AP Government ministerial staff. Access Government Orders, practical articles, calculators, procedural guides, official portals, templates, and expert assistance—all in one place.";

export function getHomeStats(live: {
  articles: number;
  tools: number;
  portals: number;
  faq: number;
}) {
  return [
    {
      value: Math.max(live.articles, 105),
      suffix: "+",
      label: "Knowledge Articles",
      href: "/knowledge",
    },
    {
      value: live.tools,
      suffix: "",
      label: "Government Calculators",
      href: "/tools",
    },
    {
      value: live.portals,
      suffix: "+",
      label: "Official Portals",
      href: "/portals",
    },
    {
      value: Math.max(live.faq, 500),
      suffix: "+",
      label: "FAQs",
      href: "/faq",
    },
  ];
}
