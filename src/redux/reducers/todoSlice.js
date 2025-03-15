import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        dateModified: new Date().toISOString(),
        completed: false
      });
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.dateModified = new Date().toISOString();
      }
    }
  }
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;