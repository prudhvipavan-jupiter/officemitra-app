"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import type { ToolDefinition } from "@/lib/data/types";
import { GO_LAST_VERIFIED } from "@/lib/site-config";
import { calculators } from "@/lib/tool-engine";

function CalculatorTool({ tool }: { tool: ToolDefinition }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const results = useMemo(() => {
    const calc = calculators[tool.calculatorId];
    if (!calc) return null;
    const hasInput = tool.inputs.some((inp) => values[inp.key]?.trim());
    if (!hasInput) return null;
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
              type={inp.type === "date" ? "date" : inp.type === "month" ? "month" : "number"}
              className="input-field mt-1"
              placeholder={inp.placeholder}
              value={values[inp.key] ?? ""}
              onChange={(e) => setValues({ ...values, [inp.key]: e.target.value })}
            />
          )}
        </div>
      ))}
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
  return (
    <>
      <div className="mb-6 flex gap-3 rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm text-gray-800">
        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
        <div>
          <p className="font-semibold text-navy-900">AP Government Order basis</p>
          <p className="mt-1">{tool.goReference}</p>
          {tool.goNote && <p className="mt-1 text-gray-600">{tool.goNote}</p>}
          <p className="mt-2 text-xs text-gray-500">Rates last verified: {GO_LAST_VERIFIED}. Confirm on GOIR before action.</p>
        </div>
      </div>
      <CalculatorTool tool={tool} />
    </>
  );
}
