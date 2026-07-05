import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteSiteLogo, getSiteLogo, saveSiteLogo } from "@/lib/site/store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const logo = await getSiteLogo();
  return NextResponse.json({
    logo: logo ? { url: logo.url, filename: logo.filename, mime_type: logo.mime_type } : null,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteSiteLogo();
  return NextResponse.json({ ok: true });
}
