import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authorization");

  if (!cookie) return NextResponse.redirect("http://localhost:8000");
  const backendIp = process.env.BACKEND_IP || "localhost";

  const res = await fetch(`http://${backendIp}:3000/user/me`, {
    headers: {
      Cookie: `authorization=${cookie.value}`,
    },
    credentials: "include",
  });

  console.log(" in the middleware", res.ok);

  if (!res.ok) return NextResponse.redirect("http://localhost:8000");

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
