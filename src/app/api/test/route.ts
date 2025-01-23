import { NextResponse } from "next/server";
import db from "@/utils/db";

export async function GET() {
  try {
    await db.connectDb();
    return NextResponse.json({
      message: "Successfully connected to the database!",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to connect to the database.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred." },
      { status: 500 }
    );
  } finally {
    // Always disconnect from the database, whether an error occurs or not
    await db.disconnectDb();
  }
}
