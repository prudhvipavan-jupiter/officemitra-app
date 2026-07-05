"use client";

import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/lib/data/types";
import { calculators } from "@/lib/tool-engine";

function ChecklistTool({ items }: { items: string[] }) {
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

function CalculatorTool({ tool }: { tool: Extract<ToolDefinition, { kind: "calculator" }> }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const results = useMemo(() => {
    const calc = calculators[tool.calculatorId];
    if (!calc) return null;
    const hasRequired = tool.inputs.some((inp) => {
      if (inp.type === "select") return values[inp.key];
      return values[inp.key]?.trim();
    });
    if (!hasRequired) return null;
    return calc(values);
  }, [tool, values]);

  return (
    <div className="space-y-4">
      {tool.inputs.map((inp) => (
        <div key={inp.key}>
          <label className="block text-sm font-medium text-gray-700">{inp.label}</label>
          {inp.type === "select" ? (
            <select
              className="input-field mt-1"
              value={values[inp.key] ?? ""}
              onChange={(e) => setValues({ ...values, [inp.key]: e.target.value })}
            >
              <option value="">Select…</option>
              {inp.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={inp.type === "date" ? "date" : inp.type === "number" ? "number" : "text"}
              className="input-field mt-1"
              placeholder={inp.placeholder}
              value={values[inp.key] ?? ""}
              onChange={(e) => setValues({ ...values, [inp.key]: e.target.value })}
            />
          )}
        </div>
      ))}
      {tool.hint && <p className="text-xs text-gray-500">{tool.hint}</p>}
      {results && (
        <div className="space-y-2 rounded-xl bg-navy-50 px-4 py-3 text-sm">
          {results.map((r) => (
            <p key={r.label}>
              {r.label}: <strong className="text-navy-900">{r.value}</strong>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function ToolRenderer({ tool }: { tool: ToolDefinition }) {
  if (tool.kind === "checklist") return <ChecklistTool items={tool.items} />;
  return <CalculatorTool tool={tool} />;
}
