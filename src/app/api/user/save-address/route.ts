// src/app/api/user/save-address/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import db from "@/utils/db";
import userModel from "@/models/Users";
import { getGuestIdServer } from "@/utils/guest";

export async function POST(req: Request) {
  await db.connectDb();

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      phoneNumber,
      address1,
      address2,
      city,
      zipCode,
      state,
      country,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address1 ||
      !city ||
      !zipCode ||
      !state ||
      !country
    ) {
      return NextResponse.json(
        { error: "Missing address fields." },
        { status: 400 }
      );
    }

    const session = await getServerSession(options);
    const userId = session?.user?.id || null;
    const guestId = userId ? null : await getGuestIdServer();

    if (!userId && !guestId) {
      return NextResponse.json(
        { error: "No user or guest ID found." },
        { status: 400 }
      );
    }

    const newAddress = {
      firstName,
      lastName,
      phoneNumber,
      address1,
      address2,
      city,
      zipCode,
      state,
      country,
    };

    if (userId) {
      const user = await userModel.findById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      // Overwrite the single address field
      user.address = newAddress;
      await user.save();

      return NextResponse.json({ success: true, address: newAddress });
    }

    // Guest path: return the address for client‑side handling
    return NextResponse.json({ success: true, guestAddress: newAddress });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb();
  }
}
