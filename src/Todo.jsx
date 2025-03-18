import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./redux/reducers/todoSlice"; // Todo actions

const Todo = () => {
  // Todos state
  const todos = useSelector((state) => state.todos);

  // Redux dispatch
  const dispatch = useDispatch();

  // Local state for new todo input
  const [todoText, setTodoText] = useState("");

  // Todo handlers
  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo({ id: Date.now(), text: todoText }));
      setTodoText(""); // Clear input after adding
    }
  };

  const handleRemoveTodo = (id) => dispatch(removeTodo({ id }));

  const handleToggleTodo = (id) => dispatch(toggleTodo({ id }));

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>

      {/* Input Section */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a new todo"
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List Section */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Todo</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Completed
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#DC3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;