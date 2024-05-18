import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
 task: { title: string; caption: string; _id: string };
}
const Task: FC<IProps> = ({ task }) => {
 const { title, caption, _id } = task;
 const {
  setNodeRef,
  attributes,
  listeners,
  transform,
  transition,
  isDragging,
 } = useSortable({
  id: _id,
  data: {
   type: "task",
   task,
  },
 });
 const style = {
  transition,
  transform: CSS.Transform.toString(transform),
 };

 return (
  <Box
   ref={setNodeRef}
   sx={{
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    width: "calc(100% - 30px)",
    height: "100px",
    backgroundColor: "#D7E3F2",
    borderRadius: "12px",
    border: "1px solid #5C748E",
    padding: "10px",
    opacity: isDragging ? 0.5 : 1,
   }}
  >
   <Box
    sx={{
     height: "100%",
     overflowY: "auto",
     "&::-webkit-scrollbar": {
      width: "8px",
     },
     "&::-webkit-scrollbar-track": {
      background: "#f0f0f0",
      borderRadius: "4px",
     },
     "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
     },
     "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
     },
    }}
   >
    <Box style={style} {...attributes} {...listeners} sx={{ height: "100%" }}>
     <Typography variant="h6">{title}</Typography>
     <Typography variant="subtitle1">{caption}</Typography>
    </Box>
   </Box>
  </Box>
 );
};

export default Task;
