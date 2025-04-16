// extending the NextApiRequest interface to include req.user, which is middleware/backend specific
// /types/next.d.ts
import type { NextApiRequest } from "next";
import "next";

declare module "next" {
  interface NextApiRequest {
    user?: {
      id: string;
    };
  }
}
