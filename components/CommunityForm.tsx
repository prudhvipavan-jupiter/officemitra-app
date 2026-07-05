"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function CommunityForm() {
  const [form, setForm] = useState({
    author_name: "",
    designation: "",
    institution: "",
    category: "general",
    title: "",
    body: "",
  });
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <p className="mt-3 font-semibold text-emerald-900">Submitted for moderation</p>
        <p className="mt-1 text-sm text-emerald-700">Thank you. Your question will be reviewed before publishing.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h2 className="text-lg font-semibold text-navy-900">Ask a question</h2>
      <p className="text-sm text-gray-600">Moderated before publishing. Do not include confidential documents.</p>
      <input
        className="input-field"
        placeholder="Your name"
        required
        value={form.author_name}
        onChange={(e) => setForm({ ...form, author_name: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Designation"
        value={form.designation}
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Institution"
        value={form.institution}
        onChange={(e) => setForm({ ...form, institution: e.target.value })}
      />
      <input
        className="input-field"
        placeholder="Subject"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="input-field min-h-28"
        placeholder="Your question"
        required
        value={form.body}
        onChange={(e) => setForm({ ...form, body: e.target.value })}
      />
      <button type="submit" className="btn-primary w-full">
        Submit for review
      </button>
    </form>
  );
}
