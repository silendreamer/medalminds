import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, { cookiePrefix: "medalminds" });

  if (!sessionCookie) {
    const loginUrl = new URL(
      `/login?next=${encodeURIComponent(request.nextUrl.pathname)}`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*"],
};
