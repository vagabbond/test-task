import { Router } from "express";
import { fetchTasks, addTask, moveTask } from "../controllers/tasks.controller";
export const taskRouter = Router();

taskRouter.get("/:id", fetchTasks);
taskRouter.post("/", addTask);
taskRouter.patch("/:id", moveTask);
