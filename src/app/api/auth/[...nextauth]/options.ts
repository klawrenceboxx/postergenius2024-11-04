import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple";
// import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/mongodb";
import userModel from "@/models/Users";
import { IUser } from "@/models/Users";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID as string,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    //   issuer: process.env.AUTH0_ISSUER as string,
    // }),
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
        const user = (await userModel.findOne({
          email: credentials?.username,
        })) as IUser;

        if (
          user &&
          (await bcrypt.compare(credentials!.password, user.password))
        ) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Inject the MongoDB _id into session.user.id
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },

  secret: process.env.JWT_SECRET,
};
