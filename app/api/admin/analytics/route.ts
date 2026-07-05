import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/analytics/store";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const summary = await getAnalyticsSummary();
  return NextResponse.json(summary);
}
