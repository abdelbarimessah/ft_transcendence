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
      console.log('data in the api', otp);

      // console.log('res in the midlware ===>', res.ok); 
      // const data = await res.json();
      // console.log('data in the midlware ===>', data);

      if (!otp) return NextResponse.redirect("http://localhost:8000");

      const isOTP = otp.enabled && !otp.verified;
      let redirectUrl = "http://localhost:8000/profile";
      if (data.otp.firstTime === false) {
        redirectUrl = "http://localhost:8000/setting";
      }
      const res = NextResponse.redirect(isOTP ? "http://localhost:8000/auth" : redirectUrl);
      
      res.cookies.set("authorization", data.token, {
        httpOnly: true,
        maxAge: ms("999years"),
      });
      
      console.log('in the ..', res);
             
       return res;
      } catch (error) {
       return NextResponse.redirect("http://localhost:8000");
    }
  };
}
