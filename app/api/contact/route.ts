import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  createContactRequest,
  listContactRequests,
  updateContactRequest,
  type ContactRequestStatus,
  type ContactRequestType,
} from "@/lib/contact/store";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") as ContactRequestStatus | "all" | null;
  const items = await listContactRequests(status ?? "all");
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const department = String(body.department ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const request_type = (body.request_type ?? "general") as ContactRequestType;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const item = await createContactRequest({
    name,
    email,
    department,
    subject,
    message,
    request_type: ["expert", "feedback", "general"].includes(request_type) ? request_type : "general",
  });

  return NextResponse.json({ ok: true, item });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }
  const valid: ContactRequestStatus[] = ["new", "read", "replied", "archived"];
  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const item = await updateContactRequest(String(id), status);
  return NextResponse.json({ item });
}
