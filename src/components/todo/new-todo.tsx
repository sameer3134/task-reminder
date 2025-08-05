'use client';
import { useState } from "react";
import { addTodo } from "../../app/action/actionTodo";

export default function NewTodo() {
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!reminderTime) {
      alert("Please select a reminder time.");
      return;
    }

    try {
      await addTodo(title, reminderTime);
      setTitle("");
      setReminderTime("");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex gap-2 items-center w-full max-w-2xl">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="border px-3 py-2 rounded flex-1"
      />
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
}
