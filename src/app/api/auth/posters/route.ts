import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Poster from "@/models/Posters/poster.schema";

// GET all posters
export async function GET() {
  try {
    await connectDb.connectDb();
    const posters = await Poster.find({}).populate("categories", "name slug");
    return NextResponse.json({ success: true, data: posters });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// POST create a new poster
export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      categories,
      tags,
      variations,
    } = await req.json();
    await connectDb.connectDb();
    const poster = await Poster.create({
      title,
      description,
      price,
      imageUrl,
      categories,
      tags,
      variations,
    });
    return NextResponse.json({ success: true, data: poster }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
