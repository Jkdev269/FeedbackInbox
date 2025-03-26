import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    // Check if username is already taken
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if email already exists
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingUserVerifiedByEmail) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set verification expiry
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpires: expiryDate,
      isAcceptingMessages: true,
      isVerified: false,
      messages: [],
    });

    await newUser.save();

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    console.log("Email Send Response:", {
      success: emailResponse.success,
      message: emailResponse.message
    });
    if (!emailResponse.success) {
      console.error("Detailed email sending failure:", {
        email,
        username,
        verifyCode
      });
      return NextResponse.json(
        { success: false, message: "Error sending verification email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User signed up successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error signing up", error);
    return NextResponse.json(
      { success: false, message: "Error signing up" },
      { status: 500 }
    );
  }
}
