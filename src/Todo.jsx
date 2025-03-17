import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/actions/counterAction"; // Counter actions
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
    <div>
      <h1>Todo App</h1>


      {/* Todo Section */}
      <h2>Todo List</h2>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;