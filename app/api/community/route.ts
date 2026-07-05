import { NextRequest, NextResponse } from "next/server";
import { createDiscussion, listDiscussions, updateDiscussion } from "@/lib/community/store";
import { notifyAdminNewCommunity } from "@/lib/email/send";
import { isAdmin } from "@/lib/auth";
import { checkRateLimit, sanitizeText } from "@/lib/security";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  if (status === "pending" && !(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await listDiscussions(status === "all" ? undefined : status ?? "published");
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(req, "community", 5, 15);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json();
  const author_name = sanitizeText(String(body.author_name ?? ""), 120);
  const designation = sanitizeText(String(body.designation ?? ""), 120);
  const institution = sanitizeText(String(body.institution ?? ""), 200);
  const category = sanitizeText(String(body.category ?? "general"), 60);
  const title = sanitizeText(String(body.title ?? ""), 200);
  const questionBody = sanitizeText(String(body.body ?? ""), 5000);

  if (!author_name || !title || !questionBody) {
    return NextResponse.json({ error: "Name, subject, and question are required" }, { status: 400 });
  }

  const item = await createDiscussion({
    author_name,
    designation,
    institution,
    category,
    title,
    body: questionBody,
  });

  await notifyAdminNewCommunity({ title, author_name });

  return NextResponse.json({ item });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const item = await updateDiscussion(String(body.id), {
    status: body.status,
    reply_markdown: body.reply_markdown != null ? sanitizeText(String(body.reply_markdown), 10000) : undefined,
  });
  return NextResponse.json({ item });
}
