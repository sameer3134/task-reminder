// import { connectDB } from "@/lib/mongodb";
// import { Todo } from "@/models/todo";
// import { NextResponse } from "next/server";

// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();
//     const todo = await Todo.findById(params.id);
//     if (!todo) return NextResponse.json({ error: "Not found" }, { status: 404 });
//     return NextResponse.json(todo);
//   } catch {
//     return NextResponse.json({ error: "Failed to get todo" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await req.json();
//     await connectDB();
//     const updated = await Todo.findByIdAndUpdate(params.id, body, { new: true });
//     return NextResponse.json(updated);
//   } catch {
//     return NextResponse.json({ error: "Failed to update" }, { status: 500 });
//   }
// }

// export async function DELETE(_: Request, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();
//     await Todo.findByIdAndDelete(params.id);
//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
//   }
// }
