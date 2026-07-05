import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "om_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "changeme";
}

export function adminToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? "dev-session-token";
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}

export function setAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}

export function verifyPassword(input: string) {
  return input.trim() === adminPassword();
}
