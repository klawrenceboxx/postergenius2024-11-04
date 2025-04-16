// app/api/coupon/route.ts

import { NextResponse } from "next/server";
import db from "@/utils/db";
import CouponModel from "@/models/Coupon";

export async function POST(req: Request) {
  await db.connectDb();

  try {
    const { code, startDate, endDate, discount } = await req.json();

    // Make sure all fields are provided
    if (!code || !startDate || !endDate || !discount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if coupon already exists
    const existing = await CouponModel.findOne({ code });
    if (existing) {
      return NextResponse.json(
        { error: "Coupon name already exists. Try a different name." },
        { status: 400 }
      );
    }

    // Create and save the new coupon
    const newCoupon = new CouponModel({
      code,
      startDate,
      endDate,
      discount,
    });
    await newCoupon.save();

    // Send back all current coupons
    const allCoupons = await CouponModel.find();

    return NextResponse.json({
      message: "Coupon created successfully",
      coupons: allCoupons,
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
