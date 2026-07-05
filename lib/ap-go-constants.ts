/**
 * Andhra Pradesh Government Order references and notified rates
 * used by OfficeMitra calculators. Verify on GOIR before pay action.
 */
export const AP_GO = {
  da: {
    currentPercent: 37.31,
    previousPercent: 33.67,
    enhancementPercent: 3.64,
    effectiveFrom: "2026-01-01",
    reference: "G.O.Ms.No.60, Finance (HR.VI-PC&TA) Dept., dated 20.10.2025",
    note: "DA on basic pay of AP state employees under RPS 2022. Paid in cash from Oct 2025 salary.",
  },
  hra: {
    classI: 24,
    classII: 16,
    classIII: 8,
    reference: "Revised Pay Scales (RPS) 2022 — HRA on basic pay by city classification",
    note: "Class I / II / III as notified for station of posting. Confirm from current pay fixation GO.",
  },
  leave: {
    elPerYear: 15,
    elPerMonth: 15 / 12,
    clPerYear: 12,
    hplPerYear: 20,
    reference: "AP Leave Rules (Fundamental Rules / AP Revised Leave Rules as adopted)",
    elEncashmentMaxDays: 300,
    elEncashmentFormula: "(Last basic pay ÷ 30) × encashable EL days",
    ltcEncashmentDays: 10,
  },
  retirement: {
    age: 62,
    effectiveFrom: "2022-01-01",
    reference: "G.O.Ms.No.15, Finance (HR-IV-FR&LR) Dept., dated 31.01.2022 / A.P. Ordinance No.1 of 2022",
  },
  probation: {
    defaultMonths: 24,
    reference: "AP Service Rules — probation for direct recruits (verify post/category)",
  },
  apgli: {
    reference: "G.O.Ms.No.198, Finance (Ins.I) Dept., dated 18.10.2022 (RPS 2022 slab rates)",
    maxInsurableAge: 57,
    maturityAge: 62,
    note: "Premium per ₹1,000 sum assured as per slab table. Submit proposal form through DDO.",
  },
  gpf: {
    minSubscriptionPercent: 6,
    reference: "AP GPF Rules — minimum subscription 6% of emoluments",
    interestNote: "Interest rate notified annually by Government — enter current GO rate.",
  },
  nps: {
    employeePercent: 10,
    employerPercent: 14,
    reference: "G.O.Ms.No.250, Finance (Pen.I) Dept., dated 06.09.2012 (CPS / NPS for AP)",
    daArrearCpsSplit: "90% cash / 10% to PRAN on DA arrears per GO",
  },
  professionalTax: {
    reference: "Andhra Pradesh Tax on Professions, Trades, Callings and Employments Act",
    slabs: [
      { max: 15000, monthly: 0 },
      { max: 20000, monthly: 150 },
      { max: Infinity, monthly: 200 },
    ],
    marchAdditional: 100,
    annualCap: 2500,
    note: "₹200/month; March deduction ₹300 so annual total does not exceed ₹2,500.",
  },
  gratuity: {
    formula: "(Last drawn pay × qualifying service × 15) ÷ 26",
    reference: "Payment of Gratuity Act, 1972 as applicable to AP government employees",
  },
  pension: {
    basicPercent: 50,
    familyNormalPercent: 30,
    familyEnhancedPercent: 50,
    maxCommutationPercent: 40,
    reference: "AP Revised Pension Rules / CCS (Pension) Rules as adopted",
  },
  cea: {
    perChildMonthly: 2250,
    maxChildren: 2,
    reference: "Central pay allowance adopted by AP — Children Education Allowance rates",
  },
  ta: {
    reference: "AP Travel Allowance Rules — enter notified rate per km for your cadre/vehicle",
    defaultKmRate: 5.4,
  },
} as const;

/** APGLI rate per ₹1,000 sum assured by age band (G.O.Ms.No.198 — illustrative; verify slab table) */
export function apgliRatePerThousand(age: number): number {
  if (age <= 30) return 0.45;
  if (age <= 40) return 0.55;
  if (age <= 50) return 0.7;
  return 0.85;
}

/** Professional tax for a given month (1–12); March uses higher deduction */
export function apProfessionalTax(gross: number, month = 1): number {
  let pt = 0;
  if (gross <= 15000) pt = 0;
  else if (gross <= 20000) pt = 150;
  else pt = 200;
  if (month === 3 && gross > 20000) pt = 300;
  return pt;
}
