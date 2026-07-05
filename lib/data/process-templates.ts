export const processGuides = [
  {
    slug: "pension-proposal",
    articleSlug: "pension-proposal-preparation-checklist",
    title: "Pension Proposal Preparation",
    description: "Document checklist, SR verification, and Treasury readiness for superannuation cases.",
    steps: ["Verify qualifying service", "Collect pension forms", "Check nominations", "Prepare covering memo", "Submit to Treasury"],
  },
  {
    slug: "earned-leave",
    articleSlug: "how-to-process-an-earned-leave-application",
    title: "Earned Leave Processing",
    description: "From application receipt to sanction and SR update for EL.",
    steps: ["Check EL balance", "Verify application", "Draft sanction", "Update leave account", "Issue orders"],
  },
  {
    slug: "service-register",
    articleSlug: "service-register-verification-common-errors",
    title: "Service Register Verification",
    description: "Common SR errors and how to correct before increment or pension.",
    steps: ["Chronological review", "Match with G.O.s", "Reconcile HRMS", "Attest corrections", "Obtain certification"],
  },
] as const;
