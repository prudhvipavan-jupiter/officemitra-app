import { NextRequest, NextResponse } from "next/server";
import { isAdmin, setAdminCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!verifyPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  return setAdminCookie(NextResponse.json({ ok: true }));
}

export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("om_admin");
  return res;
}
