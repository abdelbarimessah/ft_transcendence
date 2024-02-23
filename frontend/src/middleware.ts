import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authorization");

  if (!cookie) return NextResponse.redirect("http://localhost:8000/login");

  const res = await fetch("http://localhost:3000/user/me", {
    headers: {
      Cookie: `authorization=${cookie.value}`,
    },
    credentials: "include",
  });
  console.log("res in the middleware ===>", res.ok);

  if (!res.ok) return NextResponse.redirect("http://localhost:8000/login");

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
