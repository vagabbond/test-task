import { Box } from "@mui/material";
import Column from "./Column";
import Task from "./Task";
import { ITask, IColumn } from "../types";
import {
 DndContext,
 DragOverEvent,
 DragOverlay,
 DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

const defaultCols: IColumn[] = [
 {
  id: "todo",
  title: "Todo",
 },
 {
  id: "doing",
  title: "Work in progress",
 },
 {
  id: "done",
  title: "Done",
 },
];

const defaultTasks: ITask[] = [
 {
  id: "1",
  columnId: "todo",
  title: "List admin APIs for dashboard",
  caption: "List admin APIs for dashboard",
 },
 {
  id: "2",
  columnId: "todo",
  title:
   "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  caption:
   "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
 },
 {
  id: "3",
  columnId: "doing",
  title: "Conduct security testing",
  caption: "Conduct security testing",
 },
 {
  id: "4",
  columnId: "doing",
  title: "Analyze competitors",
  caption: "Analyze competitors",
 },
 {
  id: "5",
  columnId: "done",
  title: "Create UI kit documentation",
  caption: "Create UI kit documentation",
 },
];

const Board = () => {
 // const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
 const [columns, setColumns] = useState<IColumn[]>(defaultCols);
 const columsId = useMemo(() => columns.map((column) => column.id), [columns]);

 const [tasks, setTasks] = useState<ITask[]>(defaultTasks);
 const [activeTask, setActiveTask] = useState<ITask | null>(null);

 const onDragStart = (event: DragStartEvent) => {
  if (event.active.data.current?.type === "task") {
   setActiveTask(event.active.data.current?.task);
  }
 };
 const onDragOver = (event: DragOverEvent) => {
  const { active, over } = event;
  const activeId = active.id;
  const overId = over?.id;

  if (activeId === overId) return;

  const isActiveTask = active.data.current?.type === "task";
  const isOverTask = over?.data.current?.type === "task";

  if (!isActiveTask) return;
  if (isActiveTask && isOverTask) {
   setTasks((tasks) => {
    const activeIndex = tasks.findIndex((task) => task.id === activeId);

    const overIndex = tasks.findIndex((task) => task.id === overId);
    tasks[activeIndex].columnId = tasks[overIndex].columnId;
    return arrayMove(tasks, activeIndex, overIndex);
   });
  }

  const isOverColumn = over?.data.current?.type === "column";
  if (isActiveTask && isOverColumn) {
   setTasks((tasks) => {
    const activeIndex = tasks.findIndex((task) => task.id === activeId);
    tasks[activeIndex].columnId = overId as string;
    return arrayMove(tasks, activeIndex, activeIndex);
   });
  }
 };
 const onDragEnd = () => {
  setActiveTask(null);
 };

 return (
  <DndContext
   onDragStart={onDragStart}
   onDragOver={onDragOver}
   onDragEnd={onDragEnd}
  >
   <Box
    sx={{
     display: "flex",
     justifyContent: "center",
     flexWrap: "nowrap",

     height: "100%",
     gap: "20px",
    }}
   >
    <SortableContext items={columsId}>
     {columns.map((column, index) => (
      <Column
       id={column.id}
       key={index}
       title={column.title}
       tasks={tasks.filter((task) => task.columnId === column.id)}
      />
     ))}
    </SortableContext>
   </Box>
   {createPortal(
    <DragOverlay>
     {activeTask && <Task key={activeTask.id} task={activeTask} />}
    </DragOverlay>,
    document.body
   )}
  </DndContext>
 );
};

export default Board;
