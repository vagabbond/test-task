import { Box, Button, Typography } from "@mui/material";
import Task from "./Task";
import { FC, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import ModalAdd from "./ModalAdd";

interface IProps {
 id: string;
 title: string;
 boardId: string;
 tasks: { title: string; caption: string; _id: string }[];
}
const Column: FC<IProps> = ({ id, title, tasks, boardId }) => {
 const tasksId = useMemo(() => tasks.map((task) => task._id), [tasks]);
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { setNodeRef, attributes } = useSortable({
  id,
  data: {
   type: "column",
   tasks,
  },
 });

 return (
  <Box {...attributes} ref={setNodeRef}>
   <Typography variant="h5" sx={{ textAlign: "center", mb: "10px" }}>
    {title}
   </Typography>
   <Box
    sx={{
     width: "300px",
     maxHeight: "calc(100vh - 200px)",
     p: "20px",

     display: "flex",

     backgroundColor: "#B0C4DE ",
     borderRadius: "20px",
     border: "1px solid #6E7B8B",
    }}
   >
    <Box
     sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",

      gap: "20px",
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
     <SortableContext items={tasksId}>
      {tasks.map((task, index) => (
       <Task key={index} task={task} />
      ))}
     </SortableContext>
     <Button
      fullWidth
      sx={{
       height: "100px",
       backgroundColor: "#D7E3F2",
       borderRadius: "15px",
       border: "1px solid #5C748E",
       padding: "10px",
       flexShrink: 0,
      }}
      onClick={handleOpen}
     >
      <AddIcon />
     </Button>
     <ModalAdd
      boardId={boardId}
      columnId={id}
      handleClose={handleClose}
      open={open}
     />
    </Box>
   </Box>
  </Box>
 );
};

export default Column;
