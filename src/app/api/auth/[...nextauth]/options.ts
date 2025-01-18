import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import EmailProvider from "next-auth/providers/email";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        //This is where you need to retrieve user daya
        // to verify with credentials
        // Docs: Https://next-auth.js.org/configuration/providers/credentials
        const user = { id: "42", name: "Dave", password: "nextauth" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    // SignIn: "/signin"
  },
};

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
