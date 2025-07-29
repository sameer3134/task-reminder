import { useState } from "react"
import { updateTodoServer } from "../../app/action/actionTodo";



const UpdateTodo = ({todo}:{todo:any}) => {
    const [title, setTitle] = useState(todo.title)
    console.log(title)
    async function handleUpdate(){
          await updateTodoServer(todo._id, title, !todo.completed);
    }
  return (
    <div>
         <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="border px-3 py-2 flex-1 rounded"
      />
      <button onClick={handleUpdate} className="bg-blue-600 text-black px-4 py-2 rounded">
        Update
      </button>
    </div>
    </div>
  )
}

export default UpdateTodo