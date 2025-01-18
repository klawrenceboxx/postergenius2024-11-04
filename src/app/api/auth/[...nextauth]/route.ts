import NextAuth, { NextAuthOptions } from "next-auth";
import { options } from "./options";

//where nextauth will receive the options
const handler = NextAuth(options);

export { handler as GET, handler as POST };
