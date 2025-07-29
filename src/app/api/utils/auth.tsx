import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserIdFromToken(): string {
  const token = cookies().get("token")?.value;
  console.log("r",token)
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}
