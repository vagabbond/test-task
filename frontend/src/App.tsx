import Form from "./components/Form";
import { Box } from "@mui/material";
import Board from "./components/Board";

function App() {
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
   <Form />
   <Board />
  </Box>
 );
}

export default App;
