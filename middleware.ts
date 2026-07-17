import { NextRequest, NextResponse } from "next/server";

/**
 * Guards the admin area and its APIs.
 *
 * Auth model: single shared password (ADMIN_PASSWORD env). The session cookie
 * holds SHA-256(password) — logging in is comparing hashes, logging out is
 * clearing the cookie. Plenty for a single-admin tool; swap for real auth if
 * this ever grows users.
 *
 * Dev convenience: when ADMIN_PASSWORD is not set outside production, the
 * gate is open (with a console warning) so local work needs no setup.
 */

const COOKIE = "kj_admin";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // login endpoints stay reachable
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[admin] ADMIN_PASSWORD not set — admin is open in dev.");
      return NextResponse.next();
    }
    return new NextResponse("Admin is not configured.", { status: 503 });
  }

  const expected = await sha256Hex(password);
  const got = req.cookies.get(COOKIE)?.value;
  if (got === expected) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const login = req.nextUrl.clone();
  login.pathname = "/admin/login";
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/proposals/:path*",
    "/api/proposals",
    "/api/ai/:path*",
    "/api/imagery/:path*",
  ],
};
