import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
const res = NextResponse.json({ message: "Logged out" });

  // Clear cookies (httpOnly and normal)
  res.cookies.set("token", "", { path: "/", expires: new Date(0) });
  res.cookies.set("user", "", { path: "/", expires: new Date(0) });

  return res;
}
