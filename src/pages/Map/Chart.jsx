import { Slide, Box } from "@mui/material";
import React from "react";

const Chart = (open) => {
  return (
    <Slide direction="right" in={open} timeout={1000}>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 65vh)",
        }}
      ></Box>
    </Slide>
  );
};

export default Chart;
