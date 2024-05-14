import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";

interface IFormValues {
 uid: string;
}

const Form = () => {
 const initialValues: IFormValues = {
  uid: "",
 };

 const onSubmit = (values: IFormValues) => {
  console.log(values);
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
     id="uid"
     name="uid"
     label="Enter board uid"
     required
     value={formik.values.uid}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.uid && Boolean(formik.errors.uid)}
     helperText={formik.touched.uid && formik.errors.uid}
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
