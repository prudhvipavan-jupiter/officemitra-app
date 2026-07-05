"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-600 text-sm font-extrabold text-white">
            OM
          </span>
          <div>
            <h1 className="text-xl font-bold text-navy-900">Admin portal</h1>
            <p className="text-sm text-gray-500">OfficeMitra content management</p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link href="/" className="mt-4 block text-center text-sm text-navy-700 hover:text-gold-600">
          ← Back to public site
        </Link>
      </div>
    </div>
  );
}
