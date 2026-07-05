"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Invalid password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-20 max-w-sm rounded-2xl border border-navy-100 p-8 shadow-sm">
      <h1 className="text-xl font-bold text-navy-900">Admin login</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field mt-4"
        placeholder="Admin password"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button type="submit" className="btn-primary mt-4 w-full">Sign in</button>
      <Link href="/" className="mt-4 block text-center text-sm text-navy-700">← Back to site</Link>
    </form>
  );
}
