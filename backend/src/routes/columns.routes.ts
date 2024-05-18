import { Router } from "express";
import { fetchColumns } from "../controllers/column.controller";

export const columnsRouter = Router();

columnsRouter.get("/:boardId", fetchColumns);
