import { model, Schema } from "mongoose";

export interface IColumn {
 title: string;
 tasks: Schema.Types.ObjectId[];
 board: Schema.Types.ObjectId;
}

const columnSchema = new Schema<IColumn>({
 title: { type: String, required: true },
 tasks: [
  {
   type: Schema.Types.ObjectId,
   ref: "Task",
  },
 ],

 board: {
  type: Schema.Types.ObjectId,
  ref: "Board",
 },
});

export const Column = model<IColumn>("Column", columnSchema);
