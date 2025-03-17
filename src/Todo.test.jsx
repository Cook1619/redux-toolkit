import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Todo from "./Todo";
import { addTodo, removeTodo, toggleTodo } from "./redux/reducers/todoSlice";
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe("Todo Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      todos: [
        { id: 1, text: "Test Todo 1", completed: false },
        { id: 2, text: "Test Todo 2", completed: true },
      ],
    });

    store.dispatch = jest.fn();
  });

  it("renders the todo list", () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    // Check if todos are rendered
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter a new todo");
    const addButton = screen.getByText("Add Todo");

    // Simulate adding a new todo
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    // Check if the addTodo action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(
      addTodo({ id: expect.any(Number), text: "New Todo" })
    );
  });

  it("removes a todo", () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    const removeButtons = screen.getAllByText("Remove");

    // Simulate removing the first todo
    fireEvent.click(removeButtons[0]);

    // Check if the removeTodo action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(removeTodo({ id: 1 }));
  });

  it("toggles a todo", () => {
    render(
      <Provider store={store}>
        <Todo />
      </Provider>
    );

    const todoItem = screen.getByText("Test Todo 1");

    // Simulate toggling the first todo
    fireEvent.click(todoItem);

    // Check if the toggleTodo action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(toggleTodo({ id: 1 }));
  });
});