/** Curated policy updates — what changed, who is affected, action required */

module.exports.updates = [
  {
    id: "upd-da-37-31",
    category: "finance",
    title: "DA Enhanced to 37.31% — Pay Bill Action for DDOs",
    summary:
      "G.O.Ms.No.60 (20.10.2025): DA raised to 37.31% on RPS 2022 basic pay, effective January 2026; cash payment from October 2025 salary.",
    body: `## What changed

Dearness Allowance increased from **33.67%** to **37.31%** on basic pay under Revised Pay Scales 2022.

## Who is affected

All AP state government employees drawing pay under RPS 2022, unless specifically excluded in the G.O.

## Action required

1. Download and read full G.O.Ms.No.60 on GOIR.
2. Update DA percentage in HRMS/CFMS for all eligible employees.
3. Run sample pay bills before mass processing.
4. Process DA arrears as per G.O. schedule if applicable.
5. Use OfficeMitra DA Calculator as a cross-check only.

## Reference

Finance (HR.VI-PC&TA) Department — G.O.Ms.No.60, dated 20.10.2025.`,
  },
  {
    id: "upd-retirement-62",
    category: "establishment",
    title: "Retirement Age 62 — Service Register & Pension Planning",
    summary:
      "G.O.Ms.No.15 (2022): Superannuation age 62 years — update SR entries and pension timelines accordingly.",
    body: `## What changed

Retirement age for notified categories raised to **62 years**.

## Who is affected

Government servants covered by G.O.Ms.No.15 and A.P. Ordinance No.1 of 2022.

## Action required

1. Verify employee category against G.O. exceptions list.
2. Correct date of superannuation in service register and HRMS.
3. Adjust pension proposal preparation timeline (typically 6 months before retirement).
4. Inform employees approaching earlier retirement age of revised date.

## Reference

Finance (HR-IV-FR&LR) — G.O.Ms.No.15, dated 31.01.2022.`,
  },
  {
    id: "upd-apgli-slabs-rps",
    category: "apgli",
    title: "APGLI Premium Slabs Under RPS 2022",
    summary:
      "G.O.Ms.No.198: Revised APGLI rates per ₹1,000 sum assured — verify deductions in pay bills.",
    body: `## What changed

APGLI premium slabs realigned to Revised Pay Scales 2022 age bands.

## Who is affected

Employees enrolling or revising APGLI sum assured; DDOs processing proposals and salary deductions.

## Action required

1. Use current slab table from G.O.Ms.No.198 (not pre-RPS rates).
2. Verify age from service register before proposal.
3. Ensure premium deduction matches approved sum assured in pay bill.
4. Forward proposals through designated APGLI channel.

## Reference

Finance (Ins.I) — G.O.Ms.No.198, dated 18.10.2022.`,
  },
  {
    id: "upd-cfms-master-data",
    category: "treasury",
    title: "CFMS Employee Mapping — Common Pay Bill Holds",
    summary:
      "Treasury frequently returns bills when HRMS–CFMS employee codes or bank details mismatch. DDO checklist.",
    body: `## What changed

No single new G.O. — recurring operational issue flagged across districts.

## Who is affected

All DDOs submitting pay bills through CFMS.

## Action required

1. Reconcile HRMS employee ID with CFMS master before each pay cycle.
2. Verify bank account IFSC and account number match passbook.
3. Clear pending objections before generating new bills.
4. Escalate master data errors to district CFMS nodal officer in writing.

## Reference

CFMS portal — cfms.ap.gov.in; district finance/training circulars.`,
  },
  {
    id: "upd-nps-contribution",
    category: "finance",
    title: "NPS Contribution Rates — DDO Deduction Checklist",
    summary:
      "Employee 10% + employer 14% on pay — ensure correct NPS deduction and PRAN mapping in bills.",
    body: `## What changed

Standard NPS rates under AP adopted CPS/NPS framework (verify latest amendments for DA arrears treatment).

## Who is affected

Employees under NPS (post-2004 recruits as applicable) and their DDOs.

## Action required

1. Confirm employee is on NPS vs GPF before deduction.
2. Verify PRAN is active and mapped in HRMS/CFMS.
3. Deduct employee share 10% and ensure employer 14% in accounts.
4. Check DA arrears CPS split (90% cash / 10% to PRAN) per applicable G.O.

## Reference

G.O.Ms.No.250, Finance (Pen.I), dated 06.09.2012.`,
  },
];
