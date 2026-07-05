/** Starter Knowledge Hub articles — seeded via scripts/seed-content.mjs */

module.exports.articles = [
  {
    id: "art-el-processing",
    category: "leave",
    title: "How to Process an Earned Leave Application",
    summary:
      "Step-by-step establishment workflow for EL applications — documents, SR entry, and common DDO checks before forwarding.",
    verified: true,
    body: `## When an employee applies for Earned Leave

Verify the leave account balance in the Service Register and HRMS/CFMS before accepting the application. EL is earned at the notified rate under AP Leave Rules.

## Documents to check

- Duly signed leave application in the prescribed format
- Leave account statement (current balance)
- Sanction order copy if EL was previously encashed or adjusted
- Relieving order if leave spans transfer period (if applicable)

## DDO processing steps

1. Verify EL balance and last leave availed dates in SR.
2. Check whether EL is applied with sufficient notice (as per departmental practice).
3. Ensure no disciplinary proceedings are pending that restrict leave.
4. Prepare sanction draft with correct leave period (from–to dates).
5. Enter in leave register and update HRMS/CFMS where applicable.
6. Forward to competent authority for approval.

## Common objections

- Insufficient EL balance
- Overlapping with unauthorized absence
- Missing signatures or incorrect designation
- Leave applied retrospectively without recording

## After sanction

Issue copy to employee, update SR leave account, and retain office copy in establishment file. For EL exceeding 30 days, verify special rules if applicable to your department.

> **Guidance only.** Verify current leave rules and departmental instructions before sanction.`,
  },
  {
    id: "art-pension-checklist",
    category: "pension",
    title: "Pension Proposal Preparation Checklist",
    summary:
      "Document checklist for DDOs preparing pension proposals — SR, qualifying service, forms, and Treasury readiness.",
    verified: true,
    body: `## Before starting the pension file

Confirm date of superannuation or voluntary retirement, qualifying service, and whether the employee is under AP Revised Pension Rules or CCS (Pension) Rules as adopted.

## Core documents

- Service Register (complete and verified)
- Last pay certificate / pay fixation orders
- Qualifying service statement
- Form 7/I (or applicable pension form)
- Nomination forms (GPF/APGLI/pension)
- Leave account (EL balance for encashment)
- Disciplinary clearance / no-dues certificate

## Service verification

- Check every appointment, promotion, and transfer entry
- Verify breaks in service and whether period counts
- Confirm increment dates and pay fixation after PRC
- Reconcile HRMS/CFMS data with physical SR

## Treasury common returns

- Missing nomination or specimen signature
- Discrepancy in qualifying service
- Incorrect last pay drawn
- Unverified leave account
- APGLI/GPF final settlement not initiated

## DDO tip

Prepare a covering memo listing enclosures and pointing out any special features (LWA, suspension period, foreign service). Use OfficeMitra pension calculators only as a cross-check — Treasury figures are final.

> **Guidance only.** Not legal advice. Verify with current G.O.s and pension rules.`,
  },
  {
    id: "art-sr-verification",
    category: "establishment",
    title: "Service Register Verification — Common Errors",
    summary:
      "What to look for when verifying SR entries before increment, promotion, or pension.",
    verified: true,
    body: `## Why SR verification matters

Treasury, AG, and pension authorities rely on the Service Register as the primary record. Errors cause bill objections, pension delays, and audit observations.

## Entries to verify

- Date of birth and date of entry into service
- Initial appointment order reference
- All promotions with G.O. numbers and effective dates
- Pay fixation after each PRC or scale revision
- Leave account (opening balance and annual credits)
- Increment dates and pay drawn

## Frequent mistakes

- Missing promotion entry after proceeding
- Pay fixed on wrong scale or incorrect stage
- EL/HPL not credited annually
- Break in service not noted
- Typographical errors in G.O. numbers

## Verification procedure

1. Start from first appointment page and work forward chronologically.
2. Cross-check each entry with proceeding and G.O. copy.
3. Reconcile with HRMS/CFMS pay history.
4. Note corrections in red ink with attestation and date.
5. Obtain controlling officer certification before pension.

## When to seek expert help

If missing service spans several years, disputed promotions, or Treasury has already raised objections, document the issue summary before attempting correction.

> **Guidance only.** Follow departmental SR maintenance instructions.`,
  },
  {
    id: "art-medical-reimbursement",
    category: "finance",
    title: "Medical Reimbursement Bill — Document Checklist",
    summary:
      "Documents DDOs should verify before forwarding medical reimbursement claims to Treasury.",
    verified: true,
    body: `## Applicable rules

Medical reimbursement is governed by AP medical reimbursement rules and adopted central health scheme provisions. Verify the employee's eligibility category and ceiling limits.

## Standard enclosures

- Sanctioned medical reimbursement claim form
- Original bills and receipts (hospital/pharmacy)
- Doctor's prescription and diagnosis certificate
- Discharge summary for hospitalization claims
- Employee certificate that treatment was for self/dependent
- Non-drawal certificate if advance was not taken

## DDO checks

- Claim is within financial year and notified ceiling
- Dependent relationship supported (if applicable)
- Bills are in employee's or dependent's name as required
- Amounts match supporting vouchers
- Previous claims in the year do not exceed limit

## Treasury objections

- Missing prescription or diagnosis
- Bills not in acceptable format
- Exceeding category limit
- Duplicate claim for same period

Forward with establishment section note citing rule provision. Retain photocopy set in employee file.

> **Guidance only.** Verify current medical reimbursement G.O.s.`,
  },
  {
    id: "art-apgli-workflow",
    category: "apgli",
    title: "APGLI Proposal Submission Workflow",
    summary:
      "How ministerial staff and DDOs process APGLI proposals using notified slab rates.",
    verified: true,
    body: `## Overview

APGLI premiums are based on age and sum assured per G.O.Ms.No.198 and subsequent amendments under RPS 2022 slabs.

## Employee action

- Submit proposal form through DDO
- Declare correct age and sum assured within insurable limits
- Provide nomination in prescribed format

## DDO action

1. Verify age from SR and date of birth certificate.
2. Check insurable age limit (typically up to 57 years for new proposals).
3. Calculate premium using notified rate per ₹1,000 sum assured.
4. Recover premium through salary bill deduction.
5. Forward proposal to APGLI department through designated channel.

## Common issues

- Age discrepancy between SR and medical certificate
- Sum assured exceeds eligible limit
- Missing nomination
- Premium not deducted in pay bill

Use the OfficeMitra APGLI calculator as a working estimate — confirm on official APGLI tables before deduction.

> **Guidance only.** Refer to latest APGLI G.O.s and APGLI portal.`,
  },
  {
    id: "art-pay-fixation-rps",
    category: "finance",
    title: "Pay Fixation Under RPS 2022 — Overview for DDOs",
    summary:
      "Key steps when fixing pay after appointment, promotion, or PRC implementation.",
    verified: true,
    body: `## When pay fixation is required

- New appointment or promotion
- Implementation of Revised Pay Scales (RPS) 2022
- Notional fixation cases
- Transfer from other state/central service (if applicable)

## Basic steps

1. Identify the relevant pay scale and level under RPS 2022.
2. Determine the fixation option if choice is available (e.g. PRC option).
3. Prepare fixation statement showing old pay, new pay, and effective date.
4. Issue proceedings with G.O. reference where required.
5. Update HRMS/CFMS and SR with fixation order.

## Allowances after fixation

- DA at notified rate on basic pay
- HRA by city classification (Class I/II/III)
- Other allowances as per post and rules

## Audit points

- Wrong level selected in pay matrix
- Fixation date mismatch with promotion G.O.
- Arrears not calculated correctly

Cross-check using OfficeMitra pay estimate and DA calculators. Obtain competent authority approval before payment.

> **Guidance only.** Verify fixation G.O.s on GOIR.`,
  },
  {
    id: "art-treasury-objections",
    category: "finance",
    title: "How to Respond to Treasury Bill Objections",
    summary:
      "Practical steps for DDOs when CFMS/Treasury returns a salary or establishment bill.",
    verified: true,
    body: `## When a bill is objected

Treasury returns bills through CFMS with objection codes and remarks. Read the objection carefully — it may relate to pay, allowances, deductions, or establishment data.

## Immediate steps

1. Open objection details in CFMS/HRMS.
2. Identify whether error is in pay data, SR, or missing attachment.
3. Assign to establishment/finance section as appropriate.
4. Prepare correction memo or revised bill.

## Common objection types

- Pay fixation not updated in system
- DA/HRA percentage mismatch
- APGLI/GPF deduction errors
- Missing sanction for allowance
- Employee not mapped correctly in DDO

## Response format

- Point-wise reply citing G.O. or sanction
- Attach corrected documents or revised proceedings
- Resubmit bill with objection clearance remarks

Maintain a register of objections to avoid repeat errors for the same employee.

> **Guidance only.** Treasury decision is final on payment.`,
  },
  {
    id: "art-da-enhancement-ddo",
    category: "finance",
    title: "DA Enhancement — What the DDO Should Check",
    summary:
      "Checklist when new DA rate is notified (e.g. G.O.Ms.No.60) before running pay bills.",
    verified: true,
    body: `## On DA notification

When Government notifies DA enhancement, DDOs must update rates for all eligible employees drawing pay under RPS 2022.

## Verification checklist

- Confirm G.O. number, effective date, and DA percentage
- Identify whether arrears are payable and from which month
- Check if any category is excluded (verify G.O.)
- Update CFMS/HRMS DA component
- Run test pay bill for sample employees before mass payment

## Arrears processing

- Calculate difference between old and new DA on basic pay
- Prepare arrears schedule department-wise
- Obtain administrative sanction for arrears payment
- Ensure PF/APGLI implications are considered per rules

## OfficeMitra tools

Use the DA Calculator and DA Arrears Calculator with G.O.Ms.No.60 rates as a cross-check. Always match CFMS output before submission.

> **Guidance only.** Verify G.O. on GOIR before pay action.`,
  },
];
