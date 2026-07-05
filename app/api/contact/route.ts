import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  createContactRequest,
  listContactRequests,
  updateContactRequest,
  type ContactRequestStatus,
  type ContactRequestType,
} from "@/lib/contact/store";
import { notifyAdminNewContact, sendContactConfirmation } from "@/lib/email/send";
import { checkRateLimit, isValidEmail, sanitizeText } from "@/lib/security";

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") as ContactRequestStatus | "all" | null;
  const items = await listContactRequests(status ?? "all");
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(req, "contact", 5, 15);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json();
  const name = sanitizeText(String(body.name ?? ""), 120);
  const email = sanitizeText(String(body.email ?? ""), 254);
  const department = sanitizeText(String(body.department ?? ""), 200);
  const subject = sanitizeText(String(body.subject ?? ""), 200);
  const message = sanitizeText(String(body.message ?? ""), 5000);
  const request_type = (body.request_type ?? "general") as ContactRequestType;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const item = await createContactRequest({
    name,
    email,
    department,
    subject,
    message,
    request_type: ["expert", "feedback", "general"].includes(request_type) ? request_type : "general",
  });

  await Promise.all([
    notifyAdminNewContact({ name, email, subject, request_type: item.request_type }),
    sendContactConfirmation({ name, email, subject }),
  ]);

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
