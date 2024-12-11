// //src/app/api/auth/[...nextauth].ts

// import NextAuth, { NextAuthOptions } from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";

// const options: NextAuthOptions = {
//   providers: [
//     // OAuth authentication providers
//     AppleProvider({
//       clientId: process.env.APPLE_ID || "",
//       clientSecret: process.env.APPLE_SECRET || "",
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID || "",
//       clientSecret: process.env.FACEBOOK_SECRET || "",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET || "",
//     }),
//     // Passwordless / email sign-in
//   ],
// };

// export default NextAuth(options);
