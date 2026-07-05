import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/analytics/store";
import { checkRateLimit, getClientIp } from "@/lib/security";

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(req, "analytics", 120, 1);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const path = String(body.path ?? "/").slice(0, 500);
  const referrer = String(body.referrer ?? "").slice(0, 500);

  if (!path.startsWith("/") || path.startsWith("//")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  await recordPageView(path, referrer, getClientIp(req));
  return NextResponse.json({ ok: true });
}
