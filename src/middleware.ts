import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");
    const expected = `Basic ${btoa(`${process.env.ADMIN_USERNAME || "admin"}:${process.env.ADMIN_PASSWORD || "changeme"}`)}`;

    if (authHeader !== expected) {
      return new NextResponse("Авторизация required", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic realm=\"Admin Panel\"" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
