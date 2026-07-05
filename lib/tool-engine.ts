type Values = Record<string, string>;

function num(values: Values, key: string) {
  const n = Number(values[key]);
  return Number.isFinite(n) ? n : 0;
}

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

function incomeTaxOld(taxable: number) {
  let tax = 0;
  if (taxable <= 250000) tax = 0;
  else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
  else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
  else tax = 112500 + (taxable - 1000000) * 0.3;
  if (taxable <= 500000) tax = Math.max(0, tax - 12500);
  return tax * 1.04;
}

function incomeTaxNew(taxable: number) {
  let tax = 0;
  if (taxable <= 300000) tax = 0;
  else if (taxable <= 700000) tax = (taxable - 300000) * 0.05;
  else if (taxable <= 1000000) tax = 20000 + (taxable - 700000) * 0.1;
  else if (taxable <= 1200000) tax = 50000 + (taxable - 1000000) * 0.15;
  else if (taxable <= 1500000) tax = 80000 + (taxable - 1200000) * 0.2;
  else tax = 140000 + (taxable - 1500000) * 0.3;
  if (taxable <= 700000) tax = Math.max(0, tax - 25000);
  return tax * 1.04;
}

function workingDays(from: string, to: string) {
  if (!from || !to) return null;
  const a = new Date(from);
  const b = new Date(to);
  if (b < a) return null;
  let n = 0;
  for (const d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
    const w = d.getDay();
    if (w !== 0 && w !== 6) n++;
  }
  return n;
}

function addMonths(dateStr: string, months: number) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function addYears(dateStr: string, years: number) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().slice(0, 10);
}

export type CalcResult = { label: string; value: string }[];

export const calculators: Record<string, (values: Values) => CalcResult | null> = {
  "leave-accrual": (v) => {
    const months = num(v, "months");
    if (!months) return null;
    return [{ label: "Estimated EL accrued", value: `${fmt(months * 1.25, 1)} days (approx.)` }];
  },
  "cl-accrual": (v) => {
    const months = num(v, "months");
    if (!months) return null;
    return [{ label: "Estimated CL accrued", value: `${fmt(Math.min(months, 12), 0)} days (max 12/year)` }];
  },
  "apgli-premium": (v) => {
    const amount = num(v, "amount");
    if (!amount) return null;
    return [{ label: "Monthly premium (approx. 4.5%)", value: `₹ ${fmt(amount * 0.045)}` }];
  },
  "apgli-sum-assured": (v) => {
    const basic = num(v, "basic");
    if (!basic) return null;
    const sa = Math.min(basic * 20, basic * 20);
    return [{ label: "Indicative sum assured (20× basic cap varies)", value: `₹ ${fmt(sa, 0)}` }];
  },
  "el-encashment": (v) => {
    const basic = num(v, "basic");
    const days = num(v, "days");
    if (!basic || !days) return null;
    const amount = (basic / 30) * Math.min(days, 300);
    return [{ label: "Rough EL encashment", value: `₹ ${fmt(amount, 0)}` }];
  },
  "da-calculator": (v) => {
    const basic = num(v, "basic");
    const pct = num(v, "daPercent") || 46.39;
    if (!basic) return null;
    return [{ label: "DA amount", value: `₹ ${fmt(basic * (pct / 100), 0)}` }];
  },
  "hra-calculator": (v) => {
    const basic = num(v, "basic");
    const pct = num(v, "hraPercent") || 27;
    if (!basic) return null;
    return [{ label: "HRA amount", value: `₹ ${fmt(basic * (pct / 100), 0)}` }];
  },
  "gpf-interest": (v) => {
    const balance = num(v, "balance");
    if (!balance) return null;
    return [{ label: "Annual interest (7.7% indicative)", value: `₹ ${fmt(balance * 0.077, 0)}` }];
  },
  "gratuity-estimator": (v) => {
    const lastPay = num(v, "lastPay");
    const years = num(v, "years");
    if (!lastPay || !years) return null;
    const gratuity = (lastPay * years * 15) / 26;
    return [{ label: "Gratuity (15/26 formula)", value: `₹ ${fmt(gratuity, 0)}` }];
  },
  "pension-basic": (v) => {
    const lastPay = num(v, "lastPay");
    if (!lastPay) return null;
    return [{ label: "Indicative basic pension (50% average emoluments)", value: `₹ ${fmt(lastPay * 0.5, 0)}` }];
  },
  "family-pension": (v) => {
    const lastPay = num(v, "lastPay");
    if (!lastPay) return null;
    return [
      { label: "Normal family pension (30%)", value: `₹ ${fmt(lastPay * 0.3, 0)}` },
      { label: "Enhanced family pension (50%, time-limited)", value: `₹ ${fmt(lastPay * 0.5, 0)}` },
    ];
  },
  "nps-contribution": (v) => {
    const basic = num(v, "basic");
    const pct = num(v, "pct") || 10;
    if (!basic) return null;
    return [{ label: "NPS employee contribution", value: `₹ ${fmt(basic * (pct / 100), 0)}` }];
  },
  "professional-tax-ap": (v) => {
    const gross = num(v, "gross");
    if (!gross) return null;
    let pt = 0;
    if (gross <= 15000) pt = 0;
    else if (gross <= 20000) pt = 150;
    else pt = 200;
    return [{ label: "Professional Tax (AP, monthly)", value: `₹ ${fmt(pt, 0)}` }];
  },
  "income-tax-old-regime": (v) => {
    const income = num(v, "annualIncome");
    const ded80c = num(v, "deduction80c");
    const hraExempt = num(v, "hraExempt");
    if (!income) return null;
    const stdDed = 50000;
    const taxable = Math.max(0, income - stdDed - Math.min(ded80c, 150000) - hraExempt);
    const tax = incomeTaxOld(taxable);
    return [
      { label: "Taxable income (after std. deduction & declared exemptions)", value: `₹ ${fmt(taxable, 0)}` },
      { label: "Estimated annual tax (old regime + 4% cess)", value: `₹ ${fmt(tax, 0)}` },
      { label: "Estimated monthly TDS", value: `₹ ${fmt(tax / 12, 0)}` },
    ];
  },
  "income-tax-new-regime": (v) => {
    const income = num(v, "annualIncome");
    if (!income) return null;
    const stdDed = 75000;
    const taxable = Math.max(0, income - stdDed);
    const tax = incomeTaxNew(taxable);
    return [
      { label: "Taxable income (after standard deduction)", value: `₹ ${fmt(taxable, 0)}` },
      { label: "Estimated annual tax (new regime FY 2024-25 + 4% cess)", value: `₹ ${fmt(tax, 0)}` },
      { label: "Estimated monthly TDS", value: `₹ ${fmt(tax / 12, 0)}` },
    ];
  },
  "hra-exemption": (v) => {
    const basic = num(v, "basic");
    const da = num(v, "da");
    const rent = num(v, "rent");
    const isMetro = v.metro === "yes";
    if (!basic || !rent) return null;
    const salary = basic + da;
    const a = rent - salary * 0.1;
    const b = isMetro ? salary * 0.5 : salary * 0.4;
    const exempt = Math.max(0, Math.min(a, b, rent));
    return [
      { label: "HRA exemption (indicative)", value: `₹ ${fmt(exempt, 0)} / month` },
      { label: "Annual exemption", value: `₹ ${fmt(exempt * 12, 0)}` },
    ];
  },
  "section-80c-room": (v) => {
    const invested = num(v, "invested");
    return [{ label: "Remaining 80C room (₹1.5L limit)", value: `₹ ${fmt(Math.max(0, 150000 - invested), 0)}` }];
  },
  "tds-monthly": (v) => {
    const annualTax = num(v, "annualTax");
    if (!annualTax) return null;
    return [{ label: "Monthly TDS", value: `₹ ${fmt(annualTax / 12, 0)}` }];
  },
  "emi-calculator": (v) => {
    const principal = num(v, "principal");
    const rate = num(v, "rate");
    const months = num(v, "months");
    if (!principal || !rate || !months) return null;
    const r = rate / 12 / 100;
    const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return [
      { label: "Monthly EMI", value: `₹ ${fmt(emi, 0)}` },
      { label: "Total payment", value: `₹ ${fmt(emi * months, 0)}` },
    ];
  },
  "percentage-calculator": (v) => {
    const value = num(v, "value");
    const pct = num(v, "percent");
    if (!value || !pct) return null;
    return [{ label: "Result", value: `${fmt((value * pct) / 100, 2)} (${pct}% of ${value})` }];
  },
  "simple-interest": (v) => {
    const p = num(v, "principal");
    const r = num(v, "rate");
    const t = num(v, "years");
    if (!p || !r || !t) return null;
    const si = (p * r * t) / 100;
    return [
      { label: "Simple interest", value: `₹ ${fmt(si, 0)}` },
      { label: "Total amount", value: `₹ ${fmt(p + si, 0)}` },
    ];
  },
  "increment-estimator": (v) => {
    const basic = num(v, "basic");
    const pct = num(v, "percent") || 21;
    if (!basic) return null;
    return [{ label: "Revised basic (after increment)", value: `₹ ${fmt(basic * (1 + pct / 100), 0)}` }];
  },
  "ltc-encashment": (v) => {
    const basic = num(v, "basic");
    const days = num(v, "days") || 10;
    if (!basic) return null;
    return [{ label: "LTC encashment (indicative)", value: `₹ ${fmt((basic / 30) * days, 0)}` }];
  },
  "mileage-allowance": (v) => {
    const km = num(v, "km");
    const rate = num(v, "rate") || 5.4;
    if (!km) return null;
    return [{ label: "TA amount", value: `₹ ${fmt(km * rate, 0)}` }];
  },
  "part-pay-estimator": (v) => {
    const basic = num(v, "basic");
    if (!basic) return null;
    return [{ label: "Half pay (50% of basic)", value: `₹ ${fmt(basic * 0.5, 0)}` }];
  },
  "children-education-allowance": (v) => {
    const children = num(v, "children");
    if (!children) return null;
    const monthly = Math.min(children * 1000, children * 1000);
    return [{ label: "CEA (₹1,000/child/month, indicative)", value: `₹ ${fmt(monthly, 0)} / month` }];
  },
  "gross-pay-estimator": (v) => {
    const basic = num(v, "basic");
    const da = num(v, "da");
    const hra = num(v, "hra");
    if (!basic) return null;
    return [{ label: "Gross (basic + DA + HRA)", value: `₹ ${fmt(basic + da + hra, 0)}` }];
  },
  "net-pay-estimator": (v) => {
    const gross = num(v, "gross");
    const deductions = num(v, "deductions");
    if (!gross) return null;
    return [{ label: "Net pay", value: `₹ ${fmt(gross - deductions, 0)}` }];
  },
  "probation-end": (v) => {
    const start = v.start;
    const months = num(v, "months") || 24;
    const end = addMonths(start, months);
    if (!end) return null;
    return [{ label: "Probation completion date", value: end }];
  },
  "retirement-date": (v) => {
    const dob = v.dob;
    const age = num(v, "retirementAge") || 60;
    const end = addYears(dob, age);
    if (!end) return null;
    return [{ label: "Superannuation date (indicative)", value: end }];
  },
  "working-days": (v) => {
    const days = workingDays(v.from, v.to);
    if (days == null) return null;
    return [{ label: "Working days (excl. Sat & Sun)", value: `${days} days` }];
  },
  "service-years": (v) => {
    const from = v.from;
    const to = v.to || new Date().toISOString().slice(0, 10);
    if (!from) return null;
    const a = new Date(from);
    const b = new Date(to);
    const years = (b.getTime() - a.getTime()) / (365.25 * 24 * 3600 * 1000);
    return [{ label: "Years of service", value: `${fmt(years, 1)} years` }];
  },
  "age-calculator": (v) => {
    const dob = v.dob;
    if (!dob) return null;
    const a = new Date(dob);
    const b = new Date();
    let years = b.getFullYear() - a.getFullYear();
    const m = b.getMonth() - a.getMonth();
    if (m < 0 || (m === 0 && b.getDate() < a.getDate())) years--;
    return [{ label: "Current age", value: `${years} years` }];
  },
  "days-between": (v) => {
    const from = v.from;
    const to = v.to;
    if (!from || !to) return null;
    const diff = Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86400000);
    return [{ label: "Total days", value: `${diff} days` }];
  },
  "months-between": (v) => {
    const from = v.from;
    const to = v.to;
    if (!from || !to) return null;
    const a = new Date(from);
    const b = new Date(to);
    const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    return [{ label: "Months between dates", value: `${months} months` }];
  },
  "commutation-estimator": (v) => {
    const pension = num(v, "pension");
    const pct = num(v, "percent") || 40;
    if (!pension) return null;
    const commuted = pension * (pct / 100);
    return [
      { label: "Commuted portion (one-time indicative factor varies)", value: `₹ ${fmt(commuted * 12 * 8.194, 0)} lump sum (factor illustrative)` },
      { label: "Reduced monthly pension", value: `₹ ${fmt(pension - commuted, 0)}` },
    ];
  },
  "fixed-medical-allowance": (v) => {
    const level = v.level;
    const fma = level === "high" ? 1000 : 500;
    return [{ label: "Fixed Medical Allowance (indicative)", value: `₹ ${fma} / month` }];
  },
};
