import { FC } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import { updateBoardName } from "../redux/boards/board.contoller";
import { Box, Button, TextField } from "@mui/material";

interface IProps {
 value: string;
 id: string;
 handleClose: () => void;
}

const UpdateBoardNameForm: FC<IProps> = ({ value, id, handleClose }) => {
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   name: value,
  },
  onSubmit: (values, actions) => {
   dispatch(updateBoardName({ name: values.name, id }));
   actions.resetForm();
   handleClose();
  },
 });
 return (
  <Box
   component="form"
   onSubmit={formik.handleSubmit}
   sx={{
    display: "flex",
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
   <Button type="submit" color="primary" variant="contained">
    Save
   </Button>
  </Box>
 );
};

export default UpdateBoardNameForm;
