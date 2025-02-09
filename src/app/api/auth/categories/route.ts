import { NextResponse } from "next/server";
import connectDb from "@/utils/db";
import Category from "@/models/Category/category.schema";

// GET all categories
export async function GET() {
  try {
    await connectDb.connectDb();
    const categories = await Category.find({});
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// POST create a new category
export async function POST(req: Request) {
  try {
    const { name, slug } = await req.json();
    await connectDb.connectDb();
    const category = await Category.create({ name, slug });
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
