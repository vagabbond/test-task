import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IError } from "../../types";
import { store } from "../store";

interface IAddProps {
 title: string;
 caption: string;
 columnId: string;
 boardId: string;
}

interface IAddReturnProps {
 title: string;
 caption: string;
 columnId: string;
 _id: string;
}

interface IMoveProps {
 taskId: string;
 newColumnId: string;
 fromColumnId: string;
}

// interface IMoveReturnProps {
//  taskId: string;
//  toColumnId: string;
// }

interface IChangeOrderProps {
 previousOrder: number;
 newOrder: number;
 taskId: string;
}

type RootState = ReturnType<typeof store.getState>;

export const fetchTasks = createAsyncThunk(
 "tasks/fetchTasks",
 async (boardId: string, { rejectWithValue }) => {
  try {
   const response = await axios.get(`api/tasks/${boardId}`);
   return response.data;
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);

export const createTask = createAsyncThunk<
 IAddReturnProps,
 IAddProps,
 { rejectValue: IError }
>("tasks/createTask", async (params, { rejectWithValue }) => {
 try {
  const response = await axios.post(`api/tasks`, params);
  return response.data;
 } catch (error) {
  const typedError = error as IError;
  return rejectWithValue(typedError);
 }
});

export const moveTask = createAsyncThunk(
 "tasks/moveTask",
 async (
  { taskId, newColumnId, fromColumnId }: IMoveProps,
  { rejectWithValue }
 ) => {
  try {
   await axios.patch(`api/tasks/${taskId}`, {
    newColumnId,
   });
   return {
    taskId,
    newColumnId,
   };
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);

export const changeTaskOrder = createAsyncThunk(
 "tasks/changeTaskOrder",
 async (
  { previousOrder, newOrder, taskId }: IChangeOrderProps,
  { rejectWithValue }
 ) => {
  try {
   await axios.patch(`api/tasks/${taskId}`, {
    previousOrder,
    newOrder,
   });
   return { previousOrder, newOrder, taskId };
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);

export const deleteTask = createAsyncThunk(
 "tasks/deleteTask",
 async (taskId: string, { rejectWithValue }) => {
  try {
   const response = await axios.delete<{ taskId: string }>(
    `api/tasks/${taskId}`
   );
   return response.data;
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);
