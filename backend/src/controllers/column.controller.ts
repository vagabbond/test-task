import { Request, Response } from "express";
import { Board } from "../models/board.model";

export const fetchColumns = async (req: Request, res: Response) => {
 try {
  const { boardId } = req.params;
  const board = await Board.findById(boardId).populate("columns");
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  res.send(board.columns);
 } catch (error) {
  res.status(500).send(error);
 }
};
