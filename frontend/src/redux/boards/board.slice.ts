import { createSlice } from "@reduxjs/toolkit";
import { createBoard, fetchBoard, updateBoardName } from "./board.contoller";
import { IBoard, IError } from "../../types";

interface IState {
 board: IBoard | null;
 error: IError | null;
 loading: boolean;
}

const initialState: IState = {
 board: null,
 error: null,
 loading: false,
};

const boardSlice = createSlice({
 name: "board",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(createBoard.fulfilled, (state, action) => {
    state.board = action.payload;
   })
   .addCase(createBoard.pending, (state) => {
    state.loading = true;
   })
   .addCase(createBoard.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(fetchBoard.fulfilled, (state, action) => {
    state.board = action.payload;
   })
   .addCase(fetchBoard.pending, (state) => {
    state.loading = true;
   })
   .addCase(fetchBoard.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(updateBoardName.fulfilled, (state, action) => {
    state.board = action.payload;
   })
   .addCase(updateBoardName.pending, (state) => {
    state.loading = true;
   })
   .addCase(updateBoardName.rejected, (state, action) => {
    state.error = action.payload as IError;
   });
 },
});

export default boardSlice.reducer;
