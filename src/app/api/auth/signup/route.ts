import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, photo } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashed,
      name,
      phone,
      photo,
    });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set("token", token, { httpOnly: true });
  cookieStore.set(
  "user",
  JSON.stringify({
    id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    photo: user.photo,
  }),
  {
    // REMOVE httpOnly to allow client access
      httpOnly: false, 
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  }
);


    // Don't send full user (especially password)
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        photo: user.photo,
      },
    }, { status: 201 });
  } catch (err) {
    console.error("User creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
