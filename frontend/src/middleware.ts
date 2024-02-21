import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("authorization");

  if (!cookie) return  NextResponse.redirect("http://localhost:8000");

  const res = await fetch('http://localhost:3000/user/me', {
    headers: {
      authorization: `bearer ${cookie.value}`,
    },
  });

  if (!res.ok) return  NextResponse.redirect("http://localhost:8000");

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/game/:path*", "/profile/:path*", "/setting/:path*"],
};

