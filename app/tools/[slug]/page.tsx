"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
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
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={item}>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!checked[i]} onChange={() => setChecked({ ...checked, [i]: !checked[i] })} />
            {item}
          </label>
        </li>
      ))}
    </ul>
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
    <div className="space-y-3">
      <input type="date" className="input-field" value={start} onChange={(e) => setStart(e.target.value)} />
      {end && <p className="text-sm">Estimated completion (24 months): <strong>{end}</strong></p>}
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
    <div className="space-y-3">
      <input type="date" className="input-field" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="date" className="input-field" value={to} onChange={(e) => setTo(e.target.value)} />
      {days != null && <p>Working days (excl. Sat/Sun): <strong>{days}</strong></p>}
    </div>
  );
}

function SimpleCalc({ label, formula }: { label: string; formula: (n: number) => number }) {
  const [v, setV] = useState("");
  const result = v ? formula(Number(v)) : null;
  return (
    <div className="space-y-3">
      <input type="number" className="input-field" placeholder={label} value={v} onChange={(e) => setV(e.target.value)} />
      {result != null && !Number.isNaN(result) && <p>Result: <strong>{result.toFixed(2)}</strong></p>}
    </div>
  );
}

const toolComponents: Record<string, React.ReactNode> = {
  "pay-bill-checklist": <PayBillChecklist />,
  "probation-calculator": <ProbationCalculator />,
  "leave-accrual": <SimpleCalc label="Months of service" formula={(m) => m * 1.25} />,
  "el-encashment": <SimpleCalc label="Basic pay" formula={(b) => b * 0.5} />,
  "working-days": <WorkingDays />,
  "apgli-premium": <SimpleCalc label="Insurable amount" formula={(a) => a * 0.045} />,
};

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = tools.find((t) => t.slug === slug);
  if (!meta) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/tools" className="text-sm text-navy-700">← Tools</Link>
      <h1 className="mt-4 text-2xl font-bold text-navy-900">{meta.title}</h1>
      <p className="mt-2 text-gray-600">{meta.description}</p>
      <div className="card mt-8">{toolComponents[slug]}</div>
      <p className="mt-4 text-xs text-gray-500">Estimates only — verify with current rules and your DDO.</p>
    </div>
  );
}
