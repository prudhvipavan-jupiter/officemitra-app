import { AP_GO, apgliRatePerThousand, apProfessionalTax } from "@/lib/ap-go-constants";

type Values = Record<string, string>;

function num(values: Values, key: string) {
  const n = Number(values[key]);
  return Number.isFinite(n) ? n : 0;
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

function monthsBetween(from: string, to: string) {
  const a = new Date(from);
  const b = new Date(to);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime()) || b < a) return null;
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) months -= 1;
  return Math.max(0, months);
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

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export type CalcResult = { label: string; value: string }[];

export const calculators: Record<string, (values: Values) => CalcResult | null> = {
  "da-current": (v) => {
    const basic = num(v, "basic");
    const pct = num(v, "daPercent") || AP_GO.da.currentPercent;
    if (!basic) return null;
    return [
      { label: "DA amount", value: `₹ ${fmt(Math.round((basic * pct) / 100))}` },
      { label: "DA rate applied", value: `${pct}%` },
    ];
  },
  "da-arrears": (v) => {
    const basic = num(v, "basic");
    const months = num(v, "months");
    const oldPct = num(v, "oldDa") || AP_GO.da.previousPercent;
    const newPct = num(v, "newDa") || AP_GO.da.currentPercent;
    if (!basic || !months) return null;
    const oldDa = Math.round((basic * oldPct) / 100);
    const newDa = Math.round((basic * newPct) / 100);
    const monthlyDiff = newDa - oldDa;
    return [
      { label: "Old DA amount", value: `₹ ${fmt(oldDa)}` },
      { label: "New DA amount", value: `₹ ${fmt(newDa)}` },
      { label: "Monthly DA difference", value: `₹ ${fmt(monthlyDiff)}` },
      { label: "Total arrears (DA diff × months)", value: `₹ ${fmt(monthlyDiff * months)}` },
    ];
  },
  "hra-rps": (v) => {
    const basic = num(v, "basic");
    if (!basic) return null;
    const cityClass = v.cityClass || "I";
    const rates: Record<string, number> = { I: AP_GO.hra.classI, II: AP_GO.hra.classII, III: AP_GO.hra.classIII };
    const pct = num(v, "customPercent") || rates[cityClass] || AP_GO.hra.classI;
    const hra = Math.round((basic * pct) / 100);
    return [
      { label: "HRA percentage", value: `${pct}%` },
      { label: "HRA on basic pay", value: `₹ ${fmt(hra)}` },
    ];
  },
  "professional-tax-ap": (v) => {
    const gross = num(v, "gross");
    const month = num(v, "month") || 1;
    if (!gross) return null;
    const pt = apProfessionalTax(gross, month);
    return [
      { label: "Professional tax (this month)", value: `₹ ${fmt(pt)}` },
      { label: "Slab", value: gross <= 15000 ? "Nil (up to ₹15,000)" : gross <= 20000 ? "₹150" : month === 3 ? "₹300 (March)" : "₹200" },
    ];
  },
  "apgli-premium": (v) => {
    const basic = num(v, "basic");
    const age = num(v, "age");
    if (!basic || !age) return null;
    const sa = num(v, "sumAssured") || basic * 100;
    const rate = num(v, "ratePerThousand") || apgliRatePerThousand(age);
    const monthly = Math.round((sa / 1000) * rate);
    return [
      { label: "Sum assured used", value: `₹ ${fmt(sa)}` },
      { label: "Rate per ₹1,000 SA", value: `${rate}` },
      { label: "Monthly APGLI premium", value: `₹ ${fmt(monthly)}` },
      { label: "Annual premium", value: `₹ ${fmt(monthly * 12)}` },
    ];
  },
  "gpf-subscription": (v) => {
    const basic = num(v, "basic");
    const pct = Math.max(num(v, "percent") || AP_GO.gpf.minSubscriptionPercent, AP_GO.gpf.minSubscriptionPercent);
    if (!basic) return null;
    const monthly = Math.round((basic * pct) / 100);
    return [
      { label: "Subscription rate", value: `${pct}%` },
      { label: "Monthly GPF subscription", value: `₹ ${fmt(monthly)}` },
      { label: "Annual subscription", value: `₹ ${fmt(monthly * 12)}` },
    ];
  },
  "gpf-interest": (v) => {
    const balance = num(v, "balance");
    const rate = num(v, "interestRate") || 7.7;
    if (!balance) return null;
    const interest = Math.round((balance * rate) / 100);
    return [
      { label: "Interest rate applied", value: `${rate}%` },
      { label: "Annual GPF interest", value: `₹ ${fmt(interest)}` },
    ];
  },
  "nps-contribution": (v) => {
    const emoluments = num(v, "emoluments");
    const empPct = num(v, "employeePercent") || AP_GO.nps.employeePercent;
    const govPct = num(v, "employerPercent") || AP_GO.nps.employerPercent;
    if (!emoluments) return null;
    return [
      { label: "Employee NPS (10%)", value: `₹ ${fmt(Math.round((emoluments * empPct) / 100))}` },
      { label: "Government contribution (14%)", value: `₹ ${fmt(Math.round((emoluments * govPct) / 100))}` },
    ];
  },
  "leave-accrual-el": (v) => {
    const joining = v.joining;
    const asOn = v.asOn || new Date().toISOString().slice(0, 10);
    const opening = num(v, "opening");
    const availed = num(v, "availed");
    const months = joining ? monthsBetween(joining, asOn) : num(v, "months");
    if (months == null) return null;
    const accrued = Math.round(months * AP_GO.leave.elPerMonth * 10) / 10;
    const balance = Math.max(0, opening + accrued - availed);
    return [
      { label: "Completed months", value: `${months}` },
      { label: "EL accrued (15 days/year)", value: `${accrued} days` },
      { label: "Estimated EL balance", value: `${balance} days` },
    ];
  },
  "leave-accrual-hpl": (v) => {
    const months = num(v, "months") || (v.joining ? monthsBetween(v.joining, v.asOn || new Date().toISOString().slice(0, 10)) : 0);
    if (!months) return null;
    const accrued = Math.round(months * (AP_GO.leave.hplPerYear / 12) * 10) / 10;
    return [{ label: "HPL accrued (20 days/year)", value: `${accrued} days` }];
  },
  "leave-accrual-cl": (v) => {
    const months = num(v, "months");
    if (!months) return null;
    const accrued = Math.min(Math.round(months), AP_GO.leave.clPerYear);
    return [{ label: "CL accrued (max 12/year)", value: `${accrued} days` }];
  },
  "el-encashment": (v) => {
    const basic = num(v, "basic");
    const balance = num(v, "balanceDays");
    const maxDays = num(v, "maxDays") || AP_GO.leave.elEncashmentMaxDays;
    if (!basic || !balance) return null;
    const encashable = Math.min(balance, maxDays);
    const amount = Math.round((basic / 30) * encashable);
    return [
      { label: "Encashable EL days", value: `${encashable} days` },
      { label: "EL encashment amount", value: `₹ ${fmt(amount)}` },
    ];
  },
  "ltc-encashment": (v) => {
    const basic = num(v, "basic");
    const days = num(v, "days") || AP_GO.leave.ltcEncashmentDays;
    if (!basic) return null;
    const amount = Math.round((basic / 30) * days);
    return [{ label: `LTC leave encashment (${days} days)`, value: `₹ ${fmt(amount)}` }];
  },
  "lwp-impact": (v) => {
    const basic = num(v, "basic");
    const daPct = num(v, "daPercent") || AP_GO.da.currentPercent;
    const lwpDays = num(v, "lwpDays");
    const monthStr = v.month || new Date().toISOString().slice(0, 7);
    if (!basic || !lwpDays) return null;
    const [y, m] = monthStr.split("-").map(Number);
    const dim = daysInMonth(y, m);
    const da = Math.round((basic * daPct) / 100);
    const gross = basic + da;
    const perDay = gross / dim;
    const deduction = Math.round(perDay * lwpDays);
    return [
      { label: "Days in month", value: `${dim}` },
      { label: "Gross (basic + DA)", value: `₹ ${fmt(gross)}` },
      { label: "LWP deduction", value: `₹ ${fmt(deduction)}` },
      { label: "Estimated net after LWP", value: `₹ ${fmt(gross - deduction)}` },
    ];
  },
  "hpl-half-pay": (v) => {
    const basic = num(v, "basic");
    const daPct = num(v, "daPercent") || AP_GO.da.currentPercent;
    if (!basic) return null;
    const da = Math.round((basic * daPct) / 100);
    const half = Math.round((basic + da) * 0.5);
    return [{ label: "Half pay (50% of basic + DA)", value: `₹ ${fmt(half)}` }];
  },
  "superannuation-date": (v) => {
    const dob = v.dob;
    const age = num(v, "retirementAge") || AP_GO.retirement.age;
    const date = addYears(dob, age);
    if (!date) return null;
    return [
      { label: "Date of superannuation", value: date },
      { label: "Retirement age applied", value: `${age} years` },
    ];
  },
  "probation-end": (v) => {
    const start = v.start;
    const months = num(v, "months") || AP_GO.probation.defaultMonths;
    const end = addMonths(start, months);
    if (!end) return null;
    return [{ label: "Probation completion date", value: end }];
  },
  "service-period": (v) => {
    const from = v.from;
    const to = v.to || new Date().toISOString().slice(0, 10);
    if (!from) return null;
    const a = new Date(from);
    const b = new Date(to);
    const years = (b.getTime() - a.getTime()) / (365.25 * 24 * 3600 * 1000);
    return [{ label: "Qualifying service", value: `${fmt(years, 1)} years` }];
  },
  "gratuity": (v) => {
    const lastPay = num(v, "lastPay");
    const years = num(v, "years");
    if (!lastPay || !years) return null;
    const gratuity = Math.round((lastPay * years * 15) / 26);
    return [{ label: "Gratuity (15/26 formula)", value: `₹ ${fmt(gratuity)}` }];
  },
  "pension-basic": (v) => {
    const avgEmoluments = num(v, "avgEmoluments");
    if (!avgEmoluments) return null;
    return [{ label: "Basic pension (50% of average emoluments)", value: `₹ ${fmt(Math.round(avgEmoluments * 0.5))}` }];
  },
  "family-pension": (v) => {
    const lastPay = num(v, "lastPay");
    if (!lastPay) return null;
    return [
      { label: "Normal family pension (30%)", value: `₹ ${fmt(Math.round(lastPay * 0.3))}` },
      { label: "Enhanced family pension (50%)", value: `₹ ${fmt(Math.round(lastPay * 0.5))}` },
    ];
  },
  "commutation": (v) => {
    const pension = num(v, "pension");
    const pct = num(v, "percent") || AP_GO.pension.maxCommutationPercent;
    const factor = num(v, "factor") || 8.194;
    if (!pension) return null;
    const commuted = pension * (pct / 100);
    const lumpSum = Math.round(commuted * 12 * factor);
    return [
      { label: "Commuted pension portion", value: `₹ ${fmt(Math.round(commuted))} / month` },
      { label: "Commutation lump sum", value: `₹ ${fmt(lumpSum)}` },
      { label: "Residual pension", value: `₹ ${fmt(Math.round(pension - commuted))}` },
    ];
  },
  "pay-estimate": (v) => {
    const basic = num(v, "basic");
    const daPct = num(v, "daPercent") || AP_GO.da.currentPercent;
    const cityClass = v.cityClass || "I";
    if (!basic) return null;
    const rates: Record<string, number> = { I: AP_GO.hra.classI, II: AP_GO.hra.classII, III: AP_GO.hra.classIII };
    const hraPct = rates[cityClass] || AP_GO.hra.classI;
    const da = Math.round((basic * daPct) / 100);
    const hra = Math.round((basic * hraPct) / 100);
    return [
      { label: "DA", value: `₹ ${fmt(da)}` },
      { label: "HRA", value: `₹ ${fmt(hra)}` },
      { label: "Gross (basic + DA + HRA)", value: `₹ ${fmt(basic + da + hra)}` },
    ];
  },
  "cea": (v) => {
    const children = Math.min(num(v, "children"), AP_GO.cea.maxChildren);
    if (!children) return null;
    const monthly = children * AP_GO.cea.perChildMonthly;
    return [{ label: "Children Education Allowance", value: `₹ ${fmt(monthly)} / month` }];
  },
  "ta-mileage": (v) => {
    const km = num(v, "km");
    const rate = num(v, "rate") || AP_GO.ta.defaultKmRate;
    if (!km) return null;
    return [{ label: "Travel allowance", value: `₹ ${fmt(Math.round(km * rate))}` }];
  },
  "increment-revised-basic": (v) => {
    const basic = num(v, "basic");
    const increment = num(v, "increment");
    if (!basic || !increment) return null;
    return [{ label: "Revised basic after increment", value: `₹ ${fmt(basic + increment)}` }];
  },
  "da-cps-arrear-split": (v) => {
    const arrear = num(v, "arrear");
    if (!arrear) return null;
    const toPran = Math.round(arrear * 0.1);
    const cash = arrear - toPran;
    return [
      { label: "Cash component (90%)", value: `₹ ${fmt(cash)}` },
      { label: "To PRAN (10%)", value: `₹ ${fmt(toPran)}` },
    ];
  },
};
