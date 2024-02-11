import { NextRequest, NextResponse } from "next/server";
import ms from "ms";

export function tokenFetcher(tokenUrl: string) {
  return async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.toString();

    try {
      const data = await fetch(`${tokenUrl}?${query}`).then((res) =>
        res.json(),
      );
      const otp = data.otp;

      if (!otp) return NextResponse.redirect("http://localhost:8000/login");

      const isOTP = otp.enabled && !otp.verified;
      const res = NextResponse.redirect(isOTP ? "http://localhost:8000/auth" : "http://localhost:8000/setting");
      
      res.cookies.set("authorization", data.token, {
        httpOnly: true,
        maxAge: ms("999years"),
      });
      
      console.log('in the ..', res);
             
       return res;
      } catch (error) {
       return NextResponse.redirect("http://localhost:8000/login");
    }
  };
}
