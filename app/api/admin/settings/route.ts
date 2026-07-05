import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteSiteLogo, getSiteLogo, saveSiteLogo } from "@/lib/site/store";
import { getSiteSettings, setSiteSettings } from "@/lib/site/settings-store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [logo, settings] = await Promise.all([getSiteLogo(), getSiteSettings()]);
  return NextResponse.json({
    logo: logo ? { url: logo.url, filename: logo.filename, mime_type: logo.mime_type } : null,
    settings,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await saveSiteLogo(file.name, file.type || "application/octet-stream", buffer);
      return NextResponse.json({ url, filename: file.name });
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 400 });
    }
  }

  const body = await req.json();
  if (body.settings) {
    await setSiteSettings(body.settings);
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteSiteLogo();
  return NextResponse.json({ ok: true });
}
