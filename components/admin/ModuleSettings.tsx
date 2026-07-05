"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteSettingsMap } from "@/lib/site/settings-store";

export function ModuleSettings({ initial }: { initial: SiteSettingsMap }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSettings(initial);
  }, [initial]);

  async function save(patch: Partial<SiteSettingsMap>) {
    setSaving(true);
    setMessage("");
    const next = { ...settings, ...patch };
    setSettings(next);
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: patch }),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Could not save settings");
      setSettings(settings);
      return;
    }
    setMessage("Settings saved.");
    router.refresh();
  }

  const toggles: { key: keyof SiteSettingsMap; label: string; description: string }[] = [
    {
      key: "process_templates_visible",
      label: "Process & Templates module",
      description: "Show on homepage and navigation. Page displays “Coming soon” until content is ready.",
    },
    {
      key: "show_public_visitor_count",
      label: "Public visitor counter",
      description: "Show total page views in the site footer.",
    },
    {
      key: "email_notifications",
      label: "Email notifications",
      description: "Notify admin and send confirmation emails for contact form (requires RESEND_API_KEY).",
    },
  ];

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-navy-900">Module visibility & notifications</h2>
      <p className="mt-1 text-sm text-gray-600">Control what appears on the public site and admin alerts.</p>
      <ul className="mt-6 space-y-4">
        {toggles.map((t) => (
          <li key={t.key} className="flex items-start justify-between gap-4 rounded-xl border border-navy-50 bg-navy-50/30 px-4 py-3">
            <div>
              <p className="font-medium text-navy-900">{t.label}</p>
              <p className="mt-0.5 text-xs text-gray-600">{t.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings[t.key]}
              disabled={saving}
              onClick={() => save({ [t.key]: !settings[t.key] })}
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                settings[t.key] ? "bg-gold-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                  settings[t.key] ? "translate-x-5" : ""
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
      {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}
    </div>
  );
}
