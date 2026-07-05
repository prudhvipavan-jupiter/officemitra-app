"use client";

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
    return <p className="rounded-xl bg-green-50 p-4 text-green-800">Submitted for moderation. Thank you.</p>;
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h2 className="font-semibold">Ask a question</h2>
      <input className="input-field" placeholder="Your name" required value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
      <input className="input-field" placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
      <input className="input-field" placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
      <input className="input-field" placeholder="Subject" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea className="input-field min-h-24" placeholder="Your question" required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      <button type="submit" className="btn-primary">Submit</button>
    </form>
  );
}
