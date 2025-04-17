// app/api/coupon/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import CouponModel from "@/models/Coupon";
import CartModel from "@/models/Cart";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await db.connectDb();

  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ message: "Coupon code required." });

    const token = await getToken({ req });
    const userId = token?.id;

    const coupon = await CouponModel.findOne({ code: code.toUpperCase() });
    if (!coupon) return NextResponse.json({ message: "Invalid coupon." });

    let cart = null;
    if (userId) {
      cart = await CartModel.findOne({ user: userId });
    } else {
      const guestId = (await cookies()).get("guestId")?.value;
      if (guestId) cart = await CartModel.findOne({ guestId });
    }

    if (!cart || cart.cartTotal === undefined) {
      return NextResponse.json({ message: "Cart not found." });
    }

    const totalAfterDiscount = parseFloat(
      (cart.cartTotal - (cart.cartTotal * coupon.discount) / 100).toFixed(2)
    );

    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      totalAfterDiscount,
    });
  } catch (err) {
    console.error("Coupon validation error:", err);
    return NextResponse.json({ message: "Server error" });
  } finally {
    await db.disconnectDb();
  }
}
