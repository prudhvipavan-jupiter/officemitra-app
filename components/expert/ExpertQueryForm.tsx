"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ExpertQueryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    subject: "",
    go_numbers: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const messageParts = [
      form.designation ? `Designation: ${form.designation}` : "",
      form.go_numbers ? `Relevant G.O. numbers: ${form.go_numbers}` : "",
      "",
      form.message,
    ].filter((line, i, arr) => line !== "" || (i > 0 && arr[i - 1] !== ""));

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        department: form.department,
        subject: form.subject,
        message: messageParts.join("\n"),
        request_type: "expert",
      }),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error ?? "Could not send query");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <p className="mt-3 font-semibold text-emerald-900">Query submitted</p>
        <p className="mt-1 text-sm text-emerald-700">
          Thank you. General queries are typically answered in 1–2 business days; complex case reviews may take 2–5
          business days. For urgent matters, consult your controlling officer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-3" id="expert-form">
      <h2 className="text-lg font-semibold text-navy-900">Submit your query</h2>
      <p className="text-sm text-gray-600">
        Include enough detail for us to understand the case. Do not attach confidential employee IDs or full service
        records — describe the issue instead.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
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
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input-field"
          placeholder="Department *"
          required
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          className="input-field"
          placeholder="Employee designation *"
          required
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />
      </div>
      <input
        className="input-field"
        placeholder="Subject of the case *"
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Relevant G.O. numbers (if available)"
        value={form.go_numbers}
        onChange={(e) => setForm({ ...form, go_numbers: e.target.value })}
      />
      <textarea
        className="input-field min-h-36"
        placeholder="Brief description of the issue *"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Submitting…" : "Submit expert query"}
      </button>
    </form>
  );
}
