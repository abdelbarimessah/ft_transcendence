import { NextRequest } from "next/server";


const url = "http://localhost:3000/auth/google";


export const GET = tokenFetcher(url);

function tokenFetcher(url: any) {
    return async function GET(request: NextRequest) {
      const query = request.nextUrl.searchParams.toString();
      console.log('query', query);
      console.log('url', url);
    }
}