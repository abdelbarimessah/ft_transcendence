import { NextRequest, NextResponse } from "next/server";
import ms from "ms";

export function tokenFetcher(tokenUrl: string) {
  return async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.toString();

    console.log('query', query);
    try {
      const data = await fetch(`${tokenUrl}?${query}`).then((res) =>
        res.json(),
      );

      // const res = redirect("/settings");
     const res =  NextResponse.redirect("http://localhost:8000/setting");
     // const otp = data.otp;
     // console.log('-------- otp', otp);
     
     // if (!otp) return redirect("/");
     
     // const isOTP = otp.enabled && !otp.verified;
     // const res = redirect(isOTP ? "/auth/otp" : "/home");
     
     res.cookies.set("authorization", data.token, {
         httpOnly: true,
         maxAge: ms("999years"),
       });
       
       return res;
      } catch (error) {
        console.log(error);
        NextResponse.redirect("http://localhost:8000/");
    }
  };
}
