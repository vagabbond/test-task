import { Schema, model } from "mongoose";

export interface ITask {
 title: string;
 caption: string;
 columnId: Schema.Types.ObjectId;
 order: number;
}

const taskSchema = new Schema<ITask>({
 title: { type: String, required: true },
 caption: { type: String, required: true },
 columnId: {
  type: Schema.Types.ObjectId,
  ref: "Column",
 },
 order: { type: Number, required: true },
});

export const Task = model<ITask>("Task", taskSchema);
