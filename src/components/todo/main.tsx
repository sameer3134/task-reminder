import { connectDB } from "@/lib/mongodb";
import { Todo } from "@/models/todo";
import TodoItem from "./todo-item";
import NewTodo from "./new-todo";
import { getUserIdFromToken } from "@/app/api/utils/auth";

export type User={
  _id:string,
  title:string,
  completed:boolean,
  user:string,
  reminderTime: Date
}
export default async function MainPage() {
  await connectDB();

  let todos:User[] = [];

  try {
    const user = getUserIdFromToken(); // get from cookie directly
    const todosRaw = await Todo.find({ user });
    console.log("m",todosRaw)
    todos = todosRaw.map(todo => ({
      _id: todo._id.toString(),              // Convert ObjectId to string
      title: todo.title,
      completed: todo.completed,
      user: todo.user?.toString(),
      reminderTime: todo.reminderTime          // Optional, if needed
    }));
  } catch (err) {
    console.error("Failed to fetch todos:", err);
  }
  return (
    <>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">✅ Todos</h1>

        <NewTodo />

        <ul className="space-y-2 mt-4">
          {todos.map((todo: User) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      </div>
    </>
  );
}
