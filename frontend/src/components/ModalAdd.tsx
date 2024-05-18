import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import { FC } from "react";
import { createTask } from "../redux/tasks/tasks.controller";
import CloseIcon from "@mui/icons-material/Close";
import { setTaskToColumn } from "../redux/columns/columns.slice";

interface IProps {
 boardId: string;
 columnId: string;
 open: boolean;
 handleClose: () => void;
}
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

const ModalAdd: FC<IProps> = ({ boardId, columnId, open, handleClose }) => {
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   title: "",
   caption: "",
  },
  onSubmit: async (values) => {
   const res = dispatch(createTask({ boardId, columnId, ...values }));
   const createdTask = await res.unwrap();
   dispatch(setTaskToColumn({ taskId: createdTask._id, columnId }));
  },
 });

 return (
  <Modal open={open} onClose={handleClose}>
   <Box sx={style}>
    <IconButton onClick={handleClose}>
     <CloseIcon />
    </IconButton>
    <Box
     component="form"
     onSubmit={formik.handleSubmit}
     sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
     }}
    >
     <TextField
      fullWidth
      id="title"
      name="title"
      label="Title"
      value={formik.values.title}
      onChange={formik.handleChange}
     />
     <TextField
      fullWidth
      id="caption"
      name="caption"
      label="Caption"
      value={formik.values.caption}
      onChange={formik.handleChange}
     />
     <Button variant="outlined" type="submit">
      Submit
     </Button>
    </Box>
   </Box>
  </Modal>
 );
};

export default ModalAdd;
