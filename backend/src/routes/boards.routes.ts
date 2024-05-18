import { Router } from "express";
import {
 createBoard,
 fetchBordByName,
 editBoardName,
} from "../controllers/board.controller";
export const boardRouter = Router();

boardRouter.post("/", createBoard);
boardRouter.get("/:name", fetchBordByName);
boardRouter.patch("/:id", editBoardName);
