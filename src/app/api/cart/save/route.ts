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
      console.warn("❌ Invalid cart data received:", body);
      return NextResponse.json(
        { error: "Invalid cart data." },
        { status: 400 }
      );
    }

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;
    const guestId = userId ? null : getGuestIdServer();

    console.log("🔐 Session user ID:", userId);
    console.log("👤 Guest ID from cookie:", guestId);

    if (!userId && !guestId) {
      console.warn("❌ Neither user ID nor guest ID found.");
      return NextResponse.json(
        { error: "No user or guest ID found." },
        { status: 400 }
      );
    }

    // 🧹 Clean up existing cart
    await CartModel.findOneAndDelete(userId ? { user: userId } : { guestId });

    // 💾 Create new cart
    const newCart = new CartModel({
      user: userId || undefined,
      guestId: guestId || undefined,
      items,
      cartTotal,
    });

    await newCart.save();

    console.log("✅ Saved cart to DB:", {
      userId,
      guestId,
      itemCount: items.length,
      cartTotal,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error saving cart:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
