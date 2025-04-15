// saveCart function
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import CartModel from "@/models/Cart";
import { getGuestIdServer } from "@/utils/guest";

export async function POST(req: Request) {
  await db.connectDb();

  try {
    const body = await req.json();
    const { items, cartTotal } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid cart data." },
        { status: 400 }
      );
    }

    // Try to get session user
    const session = await getServerSession(options);
    const userId = session?.user?.id || null;

    // Or try to get guest ID
    const guestId = userId ? null : await getGuestIdServer();
    if (!userId && !guestId) {
      return NextResponse.json(
        { error: "No user or guest ID found." },
        { status: 400 }
      );
    }

    // Remove any existing cart (per user or guest)
    await CartModel.findOneAndDelete(userId ? { user: userId } : { guestId });

    // Create a new cart
    const newCart = new CartModel({
      user: userId || undefined,
      guestId: guestId || undefined,
      items,
      cartTotal,
    });

    await newCart.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
