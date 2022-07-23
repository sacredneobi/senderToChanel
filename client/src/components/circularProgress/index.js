import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={30} thickness={5} {...props} />
    </Box>
  );
};
