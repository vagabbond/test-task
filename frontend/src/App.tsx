import Form from "./components/Form";
import { Box, Button, Modal, Typography } from "@mui/material";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchColumns } from "./redux/columns/columns.controller";
import { fetchTasks } from "./redux/tasks/tasks.controller";
import CreateBoardForm from "./components/CreateBoardForm";

const style = {
 position: "absolute",
 top: "50%",
 left: "50%",
 transform: "translate(-50%, -50%)",
 width: 400,
 bgcolor: "background.paper",
 border: "2px solid #000",
 boxShadow: 24,
 p: 4,
};

function App() {
 const dispatch = useAppDispatch();
 const board = useAppSelector((state) => state.boards.board);
 const columns = useAppSelector((state) => state.columns.columns);
 const { tasks } = useAppSelector((state) => state.tasks);

 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 useEffect(() => {
  if (board) {
   console.log("fetching columns and tasks");
   dispatch(fetchColumns(board._id));
   dispatch(fetchTasks(board._id));
  }
 }, [dispatch, board]);

 return (
  <Box
   sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "20px",
   }}
  >
   <Box
    sx={{
     display: "flex",
     alignItems: "center",
     gap: "10px",
    }}
   >
    <Form />
    <Box>
     <Button
      type="button"
      onClick={handleOpen}
      color="primary"
      variant="contained"
      sx={{
       height: "56px",
      }}
     >
      Create a new One
     </Button>
     <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
       <CreateBoardForm handleClose={handleClose} />
      </Box>
     </Modal>
    </Box>
   </Box>

   {board ? (
    <Board fetchedColumns={columns} fetchedTasks={tasks} />
   ) : (
    <Box
     sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
     }}
    >
     <Typography variant="h3">Fetch or create a board</Typography>
    </Box>
   )}
  </Box>
 );
}

export default App;
