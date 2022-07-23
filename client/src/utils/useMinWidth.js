import { useMediaQuery } from "@mui/material";

const useMinWidth = () => {
  return useMediaQuery("(min-width:800px)");
};

export default useMinWidth;
