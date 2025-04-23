// app/api/cart/merge/route.ts
// after user logs in -- merge guest cart with user cart in MongoDB -- CartSync
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import CartModel from "@/models/Cart";

export async function POST(req: NextRequest) {
  await db.connectDb();

  try {
    const { guestId, userId } = await req.json();
    if (!guestId || !userId) {
      return NextResponse.json(
        { error: "Missing guestId or userId" },
        { status: 400 }
      );
    }

    const guestCart = await CartModel.findOne({ guestId });
    const userCart = await CartModel.findOne({ user: userId });

    if (!guestCart) {
      return NextResponse.json({
        success: true,
        message: "No guest cart found to merge.",
      });
    }

    const mergedItems = [...(userCart?.items || [])];

    for (const gItem of guestCart.items) {
      const match = mergedItems.find(
        (uItem) =>
          uItem._id === gItem._id && uItem.dimensions === gItem.dimensions
      );
      if (match) {
        match.quantity += gItem.quantity;
      } else {
        mergedItems.push(gItem);
      }
    }

    if (userCart) {
      userCart.items = mergedItems;
      userCart.cartTotal = mergedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await userCart.save();
    } else {
      await CartModel.create({
        user: userId,
        items: mergedItems,
        cartTotal: mergedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      });
    }

    await CartModel.deleteOne({ guestId });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Merge failed:", err);
    return NextResponse.json(
      { error: "Server error during merge" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
