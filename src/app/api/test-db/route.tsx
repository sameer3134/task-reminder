import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: "MongoDB connected successfully!" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ success: false, message: "Connection failed", error });
  }
}
