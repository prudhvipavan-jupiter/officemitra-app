"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { ContactRequestType } from "@/lib/contact/store";

const TYPES: { value: ContactRequestType; label: string }[] = [
  { value: "expert", label: "Expert guidance request" },
  { value: "feedback", label: "Platform feedback" },
  { value: "general", label: "General enquiry" },
];

export function ContactForm({
  defaultType = "general",
  showTypeSelect = true,
}: {
  defaultType?: ContactRequestType;
  showTypeSelect?: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
    request_type: defaultType,
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error ?? "Could not send message");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <p className="mt-3 font-semibold text-emerald-900">Message sent</p>
        <p className="mt-1 text-sm text-emerald-700">
          Thank you. We typically respond within 2–3 working days. For urgent office matters, consult your controlling officer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h2 className="text-lg font-semibold text-navy-900">Send a message</h2>
      <p className="text-sm text-gray-600">
        For expert guidance, feedback, or general enquiries. Do not include confidential employee data or file numbers.
      </p>
      {showTypeSelect && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Enquiry type</label>
          <select
            className="input-field mt-1"
            value={form.request_type}
            onChange={(e) => setForm({ ...form, request_type: e.target.value as ContactRequestType })}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <input
        className="input-field"
        placeholder="Your name *"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        className="input-field"
        placeholder="Email address *"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Department / institution (optional)"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Subject *"
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        className="input-field min-h-32"
        placeholder="Your message *"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
