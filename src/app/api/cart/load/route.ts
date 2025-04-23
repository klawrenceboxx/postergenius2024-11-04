// app/api/cart/load/route.ts
// After login or page refresh -- loads MongoDB cart into Redux store -- CartSync
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import CartModel from "@/models/Cart";

export async function GET(req: NextRequest) {
  await db.connectDb();

  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json({ items: [], cartTotal: 0 });
    }

    return NextResponse.json({ items: cart.items, cartTotal: cart.cartTotal });
  } catch (err) {
    console.error("Load cart failed:", err);
    return NextResponse.json(
      { error: "Server error during cart load" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
