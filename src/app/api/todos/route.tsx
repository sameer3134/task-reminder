// import { connectDB } from "@/lib/mongodb";
// import { Todo } from "@/models/todo";
// import { NextResponse } from "next/server";
// import { getUserIdFromToken } from "../utils/auth";

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const user = getUserIdFromToken(); // 🟢 Get user from token
//     console.log("S", user);
    
//     const { title } = await req.json();
//     const todo = await Todo.create({ title, user }); // 🟢 Save with user ID
    
//     return NextResponse.json(todo);
//   } catch (err) {
//     console.error("POST error:", err);
//     return NextResponse.json({ error: "Failed to create" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     console.log("ehh")
//     await connectDB();
//     const user = getUserIdFromToken();
//     const todos = await Todo.find({user});
//     return NextResponse.json(todos);
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// }
