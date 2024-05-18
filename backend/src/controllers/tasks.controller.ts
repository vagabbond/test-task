import { Request, Response } from "express";
import { Board } from "../models/board.model";
import { Column } from "../models/column.model";
import { Task } from "../models/task.model";

export const fetchTasks = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const board = await Board.findById(id);
  if (!board) {
   return res.status(404).json({ message: "Board not found" });
  }
  const columns = await Column.find({
   board: id,
  });
  if (!columns) {
   return res.status(404).json({ message: "Columns not found" });
  }
  const tasks = await Task.find({
   columnId: { $in: columns.map((column) => column._id) },
  });
  return res.json(tasks);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};

export const addTask = async (req: Request, res: Response) => {
 try {
  const { title, caption, columnId } = req.body;
  const column = await Column.findById(columnId);
  if (!column) {
   return res.status(404).json({ message: "Column not found" });
  }
  const task = {
   title,
   caption,
   columnId: column._id,
   order: column.tasks.length,
  };
  const newTask = await Task.create(task);
  if (!newTask) {
   return res.status(400).json({ message: "Failed to create task" });
  }
  const updatedColumn = await Column.findByIdAndUpdate(
   columnId,
   {
    $push: { tasks: newTask._id },
   },
   { new: true }
  );
  if (!updatedColumn) {
   return res.status(400).json({ message: "Failed to update column" });
  }
  console.log(newTask);
  return res.json(newTask);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};

export const deleteTask = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
   return res.status(404).json({ message: "Task not found" });
  }
  const column = await Column.findByIdAndUpdate(
   task.columnId,
   {
    $pull: { tasks: id },
   },
   { new: true }
  );
  if (!column) {
   return res.status(400).json({ message: "Failed to update column" });
  }

  return res.json(task);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};

export const moveTask = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const { newColumnId } = req.body;
  const ifExist = await Task.findById(id);
  if (!ifExist) {
   return res.status(404).json({ message: "Task not found" });
  }
  const task = await Task.findByIdAndUpdate(
   id,
   {
    columnId: newColumnId,
   },
   { new: true }
  );
  const oldColumn = await Column.findByIdAndUpdate(
   ifExist.columnId,
   {
    $pull: { tasks: id },
   },
   { new: true }
  );
  const newColumn = await Column.findByIdAndUpdate(
   newColumnId,
   {
    $push: { tasks: id },
   },
   { new: true }
  );
  return res.json(newColumn);
 } catch (error) {
  return res.status(500).json({ message: "Server error" });
 }
};
