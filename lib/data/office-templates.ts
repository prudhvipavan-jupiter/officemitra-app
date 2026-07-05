export type OfficeTemplate = {
  id: string;
  title: string;
  description: string;
  category: "establishment" | "leave" | "finance" | "pension" | "general";
  filename: string;
};

export const officeTemplates: OfficeTemplate[] = [
  {
    id: "tpl-el-sanction",
    title: "Earned Leave Sanction Order",
    description: "Draft sanction order for EL — fill employee details, dates, and approving authority.",
    category: "leave",
    filename: "earned-leave-sanction-order.txt",
  },
  {
    id: "tpl-cl-sanction",
    title: "Casual Leave Sanction",
    description: "Short-format CL sanction for 1–3 days absence.",
    category: "leave",
    filename: "casual-leave-sanction.txt",
  },
  {
    id: "tpl-pension-covering",
    title: "Pension Proposal Covering Memo",
    description: "DDO covering letter listing pension enclosures for Treasury.",
    category: "pension",
    filename: "pension-covering-memo.txt",
  },
  {
    id: "tpl-office-note",
    title: "Office Note (Forwarding Note)",
    description: "Standard office note format for forwarding files to superior officer.",
    category: "general",
    filename: "office-note-forwarding.txt",
  },
  {
    id: "tpl-joining-report",
    title: "Joining Report After Transfer",
    description: "Employee joining report at new station after transfer order.",
    category: "establishment",
    filename: "joining-report-transfer.txt",
  },
  {
    id: "tpl-relieving-order",
    title: "Relieving Order on Transfer",
    description: "Relieving order issued by outgoing DDO when employee transfers out.",
    category: "establishment",
    filename: "relieving-order-transfer.txt",
  },
  {
    id: "tpl-apgli-forwarding",
    title: "APGLI Proposal Forwarding Letter",
    description: "DDO letter forwarding APGLI proposal with enclosures.",
    category: "finance",
    filename: "apgli-proposal-forwarding.txt",
  },
  {
    id: "tpl-bill-objection-reply",
    title: "Treasury Objection Reply Format",
    description: "Point-wise reply template for CFMS/Treasury bill objections.",
    category: "finance",
    filename: "treasury-objection-reply.txt",
  },
];
