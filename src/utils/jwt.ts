import jwt from "jsonwebtoken";

// Ensure you add this to your .env file
const ACTIVATION_TOKEN_SECRET =
  process.env.ACTIVATION_TOKEN_SECRET || "default_secret_key";

export function createActivationToken(payload: { id: string }): string {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: "2d" });
}
