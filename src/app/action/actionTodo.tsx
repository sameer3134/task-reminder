"use server";

import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/todo";
import { revalidatePath } from "next/cache";
import { getUserIdFromToken } from "../api/utils/auth";

export async function addTodo(title: string , reminderTime:string ) {
  await connectDB();
  console.log("reminder",reminderTime)
  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Unauthorized");

  await Todo.create({ title, user: userId ,reminderTime : new Date(reminderTime)}); // ✅ associate with user
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await connectDB();

  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Unauthorized");

  // Optional: Validate that the todo belongs to this user before deleting
  await Todo.findOneAndDelete({ _id: id, user: userId });

  revalidatePath("/");
}

export async function updateTodoServer(id: string, title: string, completed: boolean, reminderTime?:string ) {
  await connectDB();

  const userId = getUserIdFromToken();
  if (!userId) throw new Error("Unauthorized");

  // Optional: Ensure only user's own todo can be updated
   const updateData: any = { title, completed };
  if (reminderTime) updateData.reminderTime = new Date(reminderTime);
  await Todo.findOneAndUpdate({ _id: id, user: userId }, updateData);

  revalidatePath("/");
}