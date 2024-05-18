import { configureStore, combineReducers } from "@reduxjs/toolkit";
import boardRedcer from "./boards/board.slice";
import tasksReducer from "./tasks/tasks.slice";
import columnsReducer from "./columns/columns.slice";

export const store = configureStore({
 reducer: combineReducers({
  boards: boardRedcer,
  tasks: tasksReducer,
  columns: columnsReducer,
 }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
