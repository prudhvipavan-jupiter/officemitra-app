import { NextRequest, NextResponse } from "next/server";
import { createDiscussion, listDiscussions, updateDiscussion } from "@/lib/community/store";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  if (status === "pending" && !(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await listDiscussions(status === "all" ? undefined : status ?? "published");
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await createDiscussion({
    author_name: String(body.author_name ?? ""),
    designation: String(body.designation ?? ""),
    institution: String(body.institution ?? ""),
    category: String(body.category ?? "general"),
    title: String(body.title ?? ""),
    body: String(body.body ?? ""),
  });
  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const item = await updateDiscussion(String(body.id), {
    status: body.status,
    reply_markdown: body.reply_markdown,
  });
  return NextResponse.json({ item });
}
