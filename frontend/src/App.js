import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "./services/todoService";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;

    await createTodo({
      title: title,
      description: "",
    });

    setTitle("");
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed,
    });
    loadTodos();
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">Todo App</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                onClick={() => toggleComplete(todo)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.title}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
