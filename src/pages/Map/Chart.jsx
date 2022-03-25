import { Slide, Box, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Chart = () => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  return (
    // <Slide direction="right" in={open} timeout={1000}>
    <Paper
      square={true}
      sx={{
        width: sidebar ? "80%" : "95%",
        height: "calc(100vh - 65vh)",
        position: "absolute",
        bottom: 0,
        left: sidebar ? "20%" : "5%",
        zIndex: 9999,
      }}
    ></Paper>
    // </Slide>
  );
};

export default Chart;
