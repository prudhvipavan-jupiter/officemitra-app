"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclaimerNotice } from "@/components/ui/DisclaimerNotice";
import { tools } from "@/lib/site-data";

function PayBillChecklist() {
  const items = [
    "Verify attendance and LWP",
    "Check APGLI / GPF deductions",
    "Validate HRA and DA",
    "Cross-check increment if due",
    "Sign and forward to treasury",
  ];
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">
        Progress: {done} of {items.length} completed
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={item}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-navy-100 px-4 py-3 hover:bg-navy-50">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-gold-600"
                checked={!!checked[i]}
                onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
              />
              <span className={checked[i] ? "text-gray-500 line-through" : ""}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProbationCalculator() {
  const [start, setStart] = useState("");
  const end = useMemo(() => {
    if (!start) return "";
    const d = new Date(start);
    d.setMonth(d.getMonth() + 24);
    return d.toISOString().slice(0, 10);
  }, [start]);
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Probation start date</label>
      <input type="date" className="input-field" value={start} onChange={(e) => setStart(e.target.value)} />
      {end && (
        <div className="rounded-xl bg-navy-50 px-4 py-3 text-sm">
          Estimated completion (24 months): <strong className="text-navy-900">{end}</strong>
        </div>
      )}
    </div>
  );
}

function WorkingDays() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const days = useMemo(() => {
    if (!from || !to) return null;
    const a = new Date(from);
    const b = new Date(to);
    let n = 0;
    for (const d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
      const w = d.getDay();
      if (w !== 0 && w !== 6) n++;
    }
    return n;
  }, [from, to]);
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">From</label>
        <input type="date" className="input-field mt-1" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">To</label>
        <input type="date" className="input-field mt-1" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      {days != null && (
        <div className="rounded-xl bg-navy-50 px-4 py-3 text-sm">
          Working days (excl. Sat/Sun): <strong className="text-navy-900">{days}</strong>
        </div>
      )}
    </div>
  );
}

function SimpleCalc({ label, formula, unit }: { label: string; formula: (n: number) => number; unit?: string }) {
  const [v, setV] = useState("");
  const result = v ? formula(Number(v)) : null;
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="number" className="input-field" placeholder="Enter value" value={v} onChange={(e) => setV(e.target.value)} />
      {result != null && !Number.isNaN(result) && (
        <div className="rounded-xl bg-navy-50 px-4 py-3 text-sm">
          Result: <strong className="text-navy-900">{result.toFixed(2)}{unit ? ` ${unit}` : ""}</strong>
        </div>
      )}
    </div>
  );
}

const toolComponents: Record<string, React.ReactNode> = {
  "pay-bill-checklist": <PayBillChecklist />,
  "probation-calculator": <ProbationCalculator />,
  "leave-accrual": <SimpleCalc label="Months of service" formula={(m) => m * 1.25} unit="days (approx.)" />,
  "el-encashment": <SimpleCalc label="Basic pay (₹)" formula={(b) => b * 0.5} unit="₹ (rough estimate)" />,
  "working-days": <WorkingDays />,
  "apgli-premium": <SimpleCalc label="Insurable amount (₹)" formula={(a) => a * 0.045} unit="₹" />,
};

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = tools.find((t) => t.slug === slug);
  if (!meta) notFound();

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner max-w-2xl">
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: meta.title }]}
            title={meta.title}
            description={meta.description}
          />
        </div>
      </div>
      <div className="page-body-narrow !max-w-2xl">
        <div className="card">{toolComponents[slug]}</div>
        <DisclaimerNotice compact />
        <p className="mt-4 text-xs text-gray-500">Estimates only — verify with current rules and your DDO.</p>
        <Link href="/tools" className="mt-6 inline-block text-sm font-medium text-navy-700 hover:text-gold-600">
          ← All tools
        </Link>
      </div>
    </>
  );
}
