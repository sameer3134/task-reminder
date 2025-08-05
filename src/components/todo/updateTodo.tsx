import { useEffect, useState } from "react";
import { updateTodoServer } from "../../app/action/actionTodo";
import { User } from "./main";

export default function UpdateTodo({ todo, onClose }: { todo: User  |null; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState("");
useEffect(() => {
        if (todo) {
      setTitle(todo.title);
      setReminderTime(new Date(todo.reminderTime).toISOString().slice(0, 16));
    }
  }, [todo]);
  

if (!todo) return null; // or return a loading spinner

  async function handleUpdate() {
      if (todo) {
        await updateTodoServer(todo._id, title, todo.completed, reminderTime);
      }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-black rounded-lg p-6 shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>
        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="border px-3 py-2 rounded"
          />
          <input
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
