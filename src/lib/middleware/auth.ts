// /lib/middleware/auth.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextHandler } from "next-connect";

const secret = process.env.JWT_SECRET as string;

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    const token = await getToken({
      req,
      secret,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token || !token.sub) {
      return res.status(401).json({ message: "Not signed in" });
    }

    // Attach user ID to request object so we don’t pass it from frontend
    req.user = { id: token.sub };

    return next(); // allow request to proceed
  } catch (err) {
    return res.status(500).json({ message: "Internal auth error" });
  }
};

export default auth;
