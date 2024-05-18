import { createSlice } from "@reduxjs/toolkit";

import { fetchColumns } from "./columns.controller";

import { IColumn, IError } from "../../types";

interface IState {
 columns: IColumn[];
 error: IError | null;
 loading: boolean;
}

const initialState: IState = {
 columns: [],
 error: null,
 loading: false,
};

const columnsSlice = createSlice({
 name: "columns",
 initialState,
 reducers: {
  setTaskToColumn: (state, action) => {
   const { taskId, columnId } = action.payload;
   const column = state.columns.find((column) => column._id === columnId);
   if (column) {
    column.tasks.push(taskId);
   }
  },
  removeTaskFromColumn: (state, action) => {
   const { taskId, columnId } = action.payload;
   const column = state.columns.find((column) => column._id === columnId);
   if (column) {
    column.tasks = column.tasks.filter((id) => id !== taskId);
   }
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchColumns.fulfilled, (state, action) => {
    state.columns = action.payload;
   })
   .addCase(fetchColumns.pending, (state) => {
    state.loading = true;
   })
   .addCase(fetchColumns.rejected, (state, action) => {
    state.error = action.payload as IError;
   });
 },
});

export const { setTaskToColumn, removeTaskFromColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
