import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "om_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const expected = process.env.ADMIN_SESSION_TOKEN ?? "dev-session-token";
    if (token !== expected) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image).*)"],
};
