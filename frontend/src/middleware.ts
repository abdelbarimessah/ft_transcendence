import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authorization");
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  if (!cookie) return NextResponse.redirect(frontendUrl);
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  const res = await fetch(`${backendUrl}/user/me`, {
    headers: {
      Cookie: `authorization=${cookie.value}`,
    },
    credentials: "include",
  });

  console.log(" in the middleware", res.ok);

  if (!res.ok) return NextResponse.redirect(frontendUrl);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/chat/:path*",
    "/game/:path*",
    "/profile/:path*",
    "/setting/:path*",
  ],
};
