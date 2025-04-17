// app/api/order/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import OrderModel from "@/models/Order";
import CartModel from "@/models/Cart";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  await db.connectDb();

  try {
    const token = await getToken({ req });
    const body = await req.json();
    const { items, shippingAddress, paymentMethod, total } = body;

    if (!items || !shippingAddress || !paymentMethod || !total) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const isGuest = !token;
    const userId = token?.id;
    const guestId = req.headers.get("x-guest-id");

    const newOrder = new OrderModel({
      user: userId || undefined,
      guestId: guestId || undefined,
      items,
      shippingAddress,
      paymentMethod,
      orderTotal: total,
      isPaid: false,
      status: "Not processed",
    });

    await newOrder.save();

    // Optionally clear cart after order placement
    if (userId) {
      await CartModel.findOneAndDelete({ user: userId });
    } else if (guestId) {
      await CartModel.findOneAndDelete({ guestId });
    }

    return NextResponse.json({ orderId: newOrder._id, success: true });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await db.disconnectDb();
  }
}
