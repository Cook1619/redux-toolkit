import todoReducer, { addTodo, removeTodo, toggleTodo } from "./todoSlice.js";

describe("todoSlice reducer", () => {
  const initialState = [];

  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    const newTodo = { id: 1, text: "Test todo" };
    const action = addTodo(newTodo);
    const state = todoReducer(initialState, action);
    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject({
      id: 1,
      text: "Test todo",
      completed: false
    });
    expect(state[0].dateModified).toBeDefined();
  });

  it("should handle removeTodo", () => {
    const initialStateWithTodo = [{ id: 1, text: "Test todo", completed: false, dateModified: new Date().toISOString() }];
    const action = removeTodo({ id: 1 });
    const state = todoReducer(initialStateWithTodo, action);
    expect(state).toHaveLength(0);
  });

  it("should handle toggleTodo", () => {
    const initialStateWithTodo = [{ id: 1, text: "Test todo", completed: false, dateModified: new Date().toISOString() }];
    const action = toggleTodo({ id: 1 });
    const state = todoReducer(initialStateWithTodo, action);
    expect(state[0].completed).toBe(true);
    expect(state[0].dateModified).toBeDefined();
  });
});