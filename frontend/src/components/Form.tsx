import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { fetchBoard } from "../redux/boards/board.contoller";

interface IFormValues {
 name: string;
}

const Form = () => {
 const initialValues: IFormValues = {
  name: "",
 };
 const dispatch = useAppDispatch();

 const onSubmit = (values: IFormValues) => {
  dispatch(fetchBoard(values.name));
 };

 const formik = useFormik({
  initialValues,
  onSubmit: onSubmit,
 });

 return (
  <Box
   sx={{
    display: "flex",
    justifyContent: "center",
   }}
  >
   <Box
    component="form"
    onSubmit={formik.handleSubmit}
    sx={{
     display: "flex",
     width: "100%",
     gap: 2,
    }}
   >
    <TextField
     fullWidth
     id="name"
     name="name"
     label="Enter board name"
     required
     value={formik.values.name}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.name && Boolean(formik.errors.name)}
     helperText={formik.touched.name && formik.errors.name}
     sx={{
      width: "450px",
     }}
    />
    <Button
     type="submit"
     color="primary"
     variant="contained"
     sx={{
      width: "150px",
     }}
    >
     Search
    </Button>
   </Box>
  </Box>
 );
};

export default Form;
