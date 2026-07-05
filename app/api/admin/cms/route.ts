import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteContent, getById, listContent, saveContent, saveFile } from "@/lib/cms/store";
import type { ContentType } from "@/lib/cms/types";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const type = req.nextUrl.searchParams.get("type") as ContentType | null;
  if (!type) return NextResponse.json({ error: "type required" }, { status: 400 });
  const items = await listContent(type);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const id = String(form.get("id") ?? "");
    const field = String(form.get("field") ?? "file");
    const file = form.get("file") as File | null;
    if (!id || !file) return NextResponse.json({ error: "Missing file" }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileId = await saveFile(id, field, file.name, file.type || "application/octet-stream", buffer);
    return NextResponse.json({ fileId });
  }
  const body = await req.json();
  const item = await saveContent(body);
  return NextResponse.json({ item });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await deleteContent(id);
  return NextResponse.json({ ok: true });
}
