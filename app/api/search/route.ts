import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/search/unified";
import { checkRateLimit } from "@/lib/security";

export async function GET(req: NextRequest) {
  const limited = await checkRateLimit(req, "search", 60, 1);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (q.length > 200) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  const items = await searchAll(q);
  return NextResponse.json({ items });
}
