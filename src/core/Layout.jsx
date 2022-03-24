import React from "react";
import { useStyles } from "../styles/styles";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.page}>
        <div
          style={{
            height: "calc(100vh)",
            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
