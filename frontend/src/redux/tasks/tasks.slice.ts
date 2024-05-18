import { createSlice } from "@reduxjs/toolkit";

import {
 fetchTasks,
 createTask,
 moveTask,
 changeTaskOrder,
 deleteTask,
} from "./tasks.controller";

import { ITask, IError } from "../../types";

interface IState {
 tasks: ITask[];
 error: IError | null;
 loading: boolean;
}

const initialState: IState = {
 tasks: [],
 error: null,
 loading: false,
};

const tasksSlice = createSlice({
 name: "tasks",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(fetchTasks.fulfilled, (state, action) => {
    console.log(action.payload);
    state.tasks = action.payload;
   })
   .addCase(fetchTasks.pending, (state) => {
    state.loading = true;
   })
   .addCase(fetchTasks.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(createTask.fulfilled, (state, action) => {
    const newTask = action.payload as ITask;
    state.tasks.push(newTask);
   })
   .addCase(createTask.pending, (state) => {
    state.loading = true;
   })
   .addCase(createTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(moveTask.fulfilled, (state, action) => {
    console.log(action.payload);
    const { taskId, newColumnId } = action.payload;
    const taskIndex = state.tasks.findIndex((task) => task._id === taskId);

    state.tasks[taskIndex].columnId = newColumnId;
   })
   .addCase(moveTask.pending, (state) => {
    state.loading = true;
   })
   .addCase(moveTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   });
 },
});

export default tasksSlice.reducer;
