import { Box, IconButton, Typography } from "@mui/material";
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
import { useEffect, useMemo, useState, FC } from "react";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { moveTask } from "../redux/tasks/tasks.controller";
import {
 removeTaskFromColumn,
 setTaskToColumn,
} from "../redux/columns/columns.slice";
import UpdateBoardNameForm from "./UpdateBoardNameForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
interface IProps {
 fetchedColumns: IColumn[];
 fetchedTasks: ITask[];
}

const Board: FC<IProps> = ({ fetchedColumns, fetchedTasks }) => {
 const board = useAppSelector((state) => state.boards.board);

 const [editMode, setEditMode] = useState(false);

 const [columns, setColumns] = useState<IColumn[]>([]);
 const columsId = useMemo(() => columns.map((column) => column._id), [columns]);

 const [tasks, setTasks] = useState<ITask[]>([]);
 const [activeTask, setActiveTask] = useState<ITask | null>(null);

 const dispatch = useAppDispatch();

 const onDragStart = (event: DragStartEvent) => {
  if (event.active.data.current?.type === "task") {
   setActiveTask(event.active.data.current?.task);
  }
 };
 const onDragOver = (event: DragOverEvent) => {
  const { active, over } = event;
  const activeId = active.id;
  const overId = over?.id;

  if (!overId) return;

  if (activeId === overId) return;

  const isActiveTask = active.data.current?.type === "task";
  const isOverTask = over?.data.current?.type === "task";

  if (!isActiveTask) return;

  let newTasks;
  const activeIndex = tasks.findIndex((task) => task._id === activeId);
  if (activeIndex === -1) return;

  newTasks = [...tasks];

  if (isActiveTask && isOverTask) {
   const overIndex = tasks.findIndex((task) => task._id === overId);
   if (overIndex === -1) return;

   newTasks[activeIndex] = {
    ...newTasks[activeIndex],
    columnId: newTasks[overIndex].columnId,
   };

   newTasks = arrayMove(newTasks, activeIndex, overIndex);
  }

  const isOverColumn = over?.data.current?.type === "column";
  if (isActiveTask && isOverColumn) {
   newTasks[activeIndex] = {
    ...newTasks[activeIndex],
    columnId: String(overId),
   };

   newTasks = arrayMove(newTasks, activeIndex, activeIndex);
  }

  // Update state
  setTasks(newTasks);

  // Dispatch actions outside setTasks
  if (isActiveTask && isOverTask) {
   dispatch(
    moveTask({
     taskId: String(activeId),
     newColumnId: String(newTasks[activeIndex].columnId),
     fromColumnId: String(newTasks[activeIndex].columnId),
    })
   );
  } else if (isActiveTask && isOverColumn) {
   dispatch(
    removeTaskFromColumn({
     taskId: String(activeId),
     columnId: String(newTasks[activeIndex].columnId),
    })
   );
   dispatch(
    setTaskToColumn({
     taskId: String(activeId),
     columnId: String(overId),
    })
   );
   dispatch(
    moveTask({
     taskId: String(activeId),
     newColumnId: String(overId),
     fromColumnId: String(newTasks[activeIndex].columnId),
    })
   );
  }
 };

 //  const onDragOver = (event: DragOverEvent) => {
 //   const { active, over } = event;
 //   const activeId = active.id;
 //   const overId = over?.id;

 //   if (!overId) return;

 //   if (activeId === overId) return;

 //   const isActiveTask = active.data.current?.type === "task";
 //   const isOverTask = over?.data.current?.type === "task";

 //   if (!isActiveTask) return;

 //   setTasks((currentTasks) => {
 //    const activeIndex = currentTasks.findIndex((task) => task._id === activeId);
 //    if (activeIndex === -1) return currentTasks;

 //    const newTasks = [...currentTasks];

 //    if (isActiveTask && isOverTask) {
 //     const overIndex = currentTasks.findIndex((task) => task._id === overId);
 //     if (overIndex === -1) return currentTasks;

 //     newTasks[activeIndex] = {
 //      ...newTasks[activeIndex],
 //      columnId: newTasks[overIndex].columnId,
 //     };

 //     dispatch(
 //      moveTask({
 //       taskId: String(activeId),
 //       newColumnId: String(newTasks[activeIndex].columnId),
 //       fromColumnId: String(newTasks[activeIndex].columnId),
 //      })
 //     );
 //     return arrayMove(newTasks, activeIndex, overIndex);
 //    }
 //    const isOverColumn = over?.data.current?.type === "column";
 //    if (isActiveTask && isOverColumn) {
 //     newTasks[activeIndex] = {
 //      ...newTasks[activeIndex],
 //      columnId: String(overId),
 //     };
 //     dispatch(
 //      removeTaskFromColumn({
 //       taskId: String(activeId),
 //       columnId: String(newTasks[activeIndex].columnId),
 //      })
 //     );
 //     dispatch(
 //      setTaskToColumn({
 //       taskId: String(activeId),
 //       columnId: String(overId),
 //      })
 //     );
 //     dispatch(
 //      moveTask({
 //       taskId: String(activeId),
 //       newColumnId: String(overId),
 //       fromColumnId: String(newTasks[activeIndex].columnId),
 //      })
 //     );
 //     return arrayMove(newTasks, activeIndex, activeIndex);
 //    }

 //    return currentTasks;
 //   });
 //  };

 const onDragEnd = () => {
  setActiveTask(null);
 };
 const handleClose = () => setEditMode(false);
 useEffect(() => {
  setColumns(fetchedColumns);
  setTasks(fetchedTasks);
 }, [fetchedColumns, fetchedTasks]);

 return (
  <DndContext
   onDragStart={onDragStart}
   onDragOver={onDragOver}
   onDragEnd={onDragEnd}
  >
   <Box
    sx={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     width: "960px",
    }}
   >
    {editMode && board ? (
     <UpdateBoardNameForm
      value={board.name}
      id={board._id}
      handleClose={handleClose}
     />
    ) : (
     <Typography
      variant="h2"
      sx={{
       textTransform: "capitalize",
      }}
     >
      {board?.name}
     </Typography>
    )}
    <IconButton onClick={() => setEditMode(!editMode)}>
     <BorderColorIcon />
    </IconButton>
   </Box>
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
     {board &&
      columns.map((column, index) => (
       <Column
        boardId={board._id}
        id={column._id}
        key={index}
        title={column.title}
        tasks={tasks.filter((task) => task.columnId === column._id)}
       />
      ))}
    </SortableContext>
   </Box>
   {createPortal(
    <DragOverlay>
     {activeTask && <Task key={activeTask._id} task={activeTask} />}
    </DragOverlay>,
    document.body
   )}
  </DndContext>
 );
};

export default Board;
