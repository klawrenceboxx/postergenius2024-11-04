import { NextResponse } from "next/server";
// add > http://localhost:3000/api/auth/signupT > in postman

export const POST = async () => {
  //   return NextResponse.json({ message: "Welcome from sign up API" });
  return new Response("Welcome from sign up APIIIII", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
};
