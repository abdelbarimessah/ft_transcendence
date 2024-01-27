import { tokenFetcher } from "../common";


console.log("tokenFetcher");
export const GET = tokenFetcher("http://localhost:3000/auth/google");
