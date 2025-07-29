'use client';
import { useState } from "react";
import { deleteTodo } from "../../app/action/actionTodo";
import UpdateTodo from "./updateTodo";


export default function TodoItem({ todo }: { todo: any }) {
  const [loading, setLoading] = useState(false);
  const [changeTitle,setChangeTitle]=useState(false)
  const [id,setId]=useState<any>("")
  const toggleComplete = async (todo: any) => {
    setChangeTitle(true)
    setId(todo)
  };

  const deleteodo = async () => {
    setLoading(true);
    await deleteTodo(todo._id);
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
      <span
        className={`cursor-pointer ${todo.completed ? "line-through  text-gray-600" : "text-gray-900"}`}
        onClick={()=>toggleComplete(todo)}
      >
        {todo.title}
      </span>
      <button onClick={deleteodo} className="text-red-600 hover:text-red-800">
        ❌
      </button>
      {changeTitle && <UpdateTodo todo={id}/>}
    </li>

  );
}
