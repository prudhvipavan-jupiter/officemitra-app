import { Info } from "lucide-react";

export function DisclaimerNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-gray-500">
        Guidance only — verify with current GOs and your controlling officer.
      </p>
    );
  }

  return (
    <div className="flex gap-3 rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-gray-700">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
      <p>
        <strong className="text-navy-900">Guidance only.</strong> Verify all information with current Government
        Orders and your controlling officer. OfficeMitra is not an official government website.
      </p>
    </div>
  );
}
