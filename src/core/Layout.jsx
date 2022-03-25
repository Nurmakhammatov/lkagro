import React from "react";
import { useStyles } from "../styles/styles";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar />
      {/* <di className={classes.page} > */}
      <Box
        style={{
          height: "calc(100vh)",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default Layout;
