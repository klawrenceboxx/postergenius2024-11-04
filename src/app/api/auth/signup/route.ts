import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import User from "@/models/Users";
import bcrypt from "bcrypt";
import { createActivationToken } from "@/utils/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    await db.connectDb();

    // ✅ Validate email format before anything
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists. Please use a different one." },
        { status: 400 }
      );
    }

    // ✅ Validate password length
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userId = newUser._id.toString();

    // Generate activation token
    const activationToken = createActivationToken({
      id: userId,
    });

    const url = `${process.env.BASE_URL}/activate/${activationToken}`;

    // ✅ Return the URL as a response for Postman testing
    return NextResponse.json({ activationUrl: url }, { status: 201 });

    // Displays all of the user data to postman
    // return NextResponse.json(newUser);

    return NextResponse.json(
      { message: "Sign up successful!", activationToken, user: newUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occured." },
      { status: 500 }
    );
  } finally {
    await db.disconnectDb;
  }
}

// export default router.handler
// ({
//     onError: (err, req, res) => {
//         console.error("Unhandled Error:", err.stack);
//         res.status(500).end("Internal Server Error");

//     },
//     onNoMatch: (req, res) => {
//         res.status(404).end("Route Not Found");
//     },
// })

// TEST CODE
// import { NextRequest, NextResponse } from "next/server";
// import db from "@/utils/db";

// export async function POST(req: NextRequest) {
//   try {
//     // Log request body
//     const body = await req.json(); // Parse the JSON body
//     console.log("Request Body:", body);

//     // Connect to the database
//     await db.connectDb();

//     // Return success response
//     return NextResponse.json({
//       message: "Successfully connected to the database!",
//       body, // Include the body in the response for testing purposes
//     });
//   } catch (error: unknown) {
//     // Handle errors
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//       return NextResponse.json(
//         { message: "Failed to connect to the database.", error: error.message },
//         { status: 500 }
//       );
//     }
//     console.error("Unknown Error:", error);
//     return NextResponse.json(
//       { message: "An unknown error occurred." },
//       { status: 500 }
//     );
//   } finally {
//     // Disconnect from the database
//     await db.disconnectDb();
//   }
// }
