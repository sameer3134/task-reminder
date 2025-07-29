import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    console.log("S",req)
  const { email, password } = await req.json();
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("token", token, { httpOnly: false });
  res.cookies.set(
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
  return res;
}
