import { FC } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import { createBoard } from "../redux/boards/board.contoller";
import { useAppDispatch } from "../redux/hooks";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
 handleClose: () => void;
}

const CreateBoardForm: FC<IProps> = ({ handleClose }) => {
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   name: "",
  },
  onSubmit: (values, actions) => {
   dispatch(createBoard({ name: values.name }));
   actions.resetForm();
   handleClose();
  },
 });
 return (
  <Box
   sx={{
    padding: "20px",
   }}
  >
   <IconButton
    onClick={handleClose}
    sx={{
     position: "absolute",
     top: "10px",
     right: "10px",
    }}
   >
    <CloseIcon />
   </IconButton>
   <Box
    component="form"
    onSubmit={formik.handleSubmit}
    sx={{
     display: "flex",
     flexDirection: "column",
     gap: 2,
    }}
   >
    <TextField
     fullWidth
     required
     id="name"
     name="name"
     label="Board Name"
     variant="outlined"
     value={formik.values.name}
     onChange={formik.handleChange}
    />
    <Button type="submit" variant="contained">
     Create
    </Button>
   </Box>
  </Box>
 );
};

export default CreateBoardForm;
