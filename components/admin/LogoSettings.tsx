"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LogoInfo = { url: string; filename: string; mime_type: string } | null;

export function LogoSettings({ initialLogo }: { initialLogo: LogoInfo }) {
  const router = useRouter();
  const [logo, setLogo] = useState<LogoInfo>(initialLogo);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLogo(initialLogo);
  }, [initialLogo]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSuccess("");
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/settings", { method: "POST", body: form });
    const json = await res.json();
    setUploading(false);
    e.target.value = "";
    if (!res.ok) {
      setError(json.error ?? "Upload failed");
      return;
    }
    setLogo({ url: `${json.url}?t=${Date.now()}`, filename: json.filename, mime_type: file.type });
    setSuccess("Logo updated. It will appear in the site header.");
    router.refresh();
  }

  async function remove() {
    if (!confirm("Remove the custom logo and revert to the default?")) return;
    setError("");
    setSuccess("");
    setRemoving(true);
    const res = await fetch("/api/admin/settings", { method: "DELETE" });
    setRemoving(false);
    if (!res.ok) {
      setError("Could not remove logo");
      return;
    }
    setLogo(null);
    setSuccess("Logo removed.");
    router.refresh();
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-navy-900">Website logo</h2>
      <p className="mt-1 text-sm text-gray-600">
        Shown in the site header. PNG, JPG, WebP, SVG, or GIF — max 2 MB. Recommended height: 36–48 px.
      </p>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-navy-100 bg-navy-900 p-2">
          {logo ? (
            <img src={logo.url} alt="Site logo" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-600 text-sm font-extrabold text-white">
              OM
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="btn-primary cursor-pointer">
            {uploading ? "Uploading…" : logo ? "Replace logo" : "Upload logo"}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" className="hidden" onChange={upload} disabled={uploading} />
          </label>
          {logo && (
            <button type="button" className="btn-secondary" onClick={remove} disabled={removing}>
              {removing ? "Removing…" : "Remove logo"}
            </button>
          )}
        </div>
      </div>

      {logo && <p className="mt-4 text-xs text-gray-500">Current file: {logo.filename}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-4 text-sm text-emerald-700">{success}</p>}
    </div>
  );
}
