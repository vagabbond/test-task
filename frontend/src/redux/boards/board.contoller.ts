import { createAsyncThunk } from "@reduxjs/toolkit";

import { IError } from "../../types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const createBoard = createAsyncThunk(
 "board/createBoard",
 async (params: { name: string }, thunkApi) => {
  try {
   console.log("creating board");
   const response = await axios.post("/api/boards", params);
   console.log(response.data);
   return response.data;
  } catch (error) {
   console.log(error);
   const typedError = error as IError;
   return thunkApi.rejectWithValue(typedError);
  }
 }
);

export const fetchBoard = createAsyncThunk(
 "board/fetchBoard",
 async (name: string, thunkApi) => {
  try {
   const response = await axios.get(`/api/boards/${name}`);
   return response.data;
  } catch (error) {
   const typedError = error as IError;
   return thunkApi.rejectWithValue(typedError);
  }
 }
);

export const updateBoardName = createAsyncThunk(
 "board/updateBoardName",
 async ({ id, name }: { id: string; name: string }, thunkApi) => {
  try {
   const response = await axios.patch(`/api/boards/${id}`, { name: name });
   return response.data;
  } catch (error) {
   const typedError = error as IError;
   return thunkApi.rejectWithValue(typedError);
  }
 }
);
