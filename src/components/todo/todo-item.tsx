'use client';
import { useState } from "react";
import { deleteTodo } from "../../app/action/actionTodo";
import UpdateTodo from "./updateTodo";
import { User } from "./main";


export default function TodoItem({ todo }: { todo: User }) {
  const [loading, setLoading] = useState(false);
  const [changeTitle,setChangeTitle]=useState(false)
  const [changeTodo,setChangeTodo]=useState<User | null>(null)
  const toggleComplete = async (todo: User) => {
    setChangeTitle(true)
    setChangeTodo(todo)
  };
console.log(todo)
  const deleteodo = async () => {
    setLoading(true);
    await deleteTodo(todo._id);
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
      <span
        className="text-gray-900"
    
      >
        {todo.title} {new Date(todo.reminderTime).toLocaleString()}
      </span>
      <button onClick={deleteodo} className="text-red-600 hover:text-red-800">
        Delete
      </button>
          <button  onClick={()=>toggleComplete(todo)} className="text-red-600 cursor-pointer  hover:text-red-800">
        Update
      </button>
      {changeTitle && <UpdateTodo todo={changeTodo} onClose={() => setChangeTitle(false)}/>}
    </li>

  );
}
