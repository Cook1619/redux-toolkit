import { createAction } from "@reduxjs/toolkit";

export const addTodo = createAction("ADD_TODO");
export const removeTodo = createAction("REMOVE_TODO");
export const toggleTodo = createAction("TOGGLE_TODO");