'use client';
import { useState } from "react";
import { addTodo } from "../../app/action/actionTodo";

export default function NewTodo() {
  const [title, setTitle] = useState("");
  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTodo(title)
  };
  

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="border px-3 py-2 flex-1 rounded"
      />
      <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
}
