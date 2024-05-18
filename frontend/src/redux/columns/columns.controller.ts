import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { IError } from "../../types";

export const fetchColumns = createAsyncThunk(
 "columns/fetchColumns",
 async (boardId: string, { rejectWithValue }) => {
  try {
   const response = await axios.get(`api/columns/${boardId}`);
   return response.data;
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);
