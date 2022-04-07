import React from "react"
import { useStyles } from "../styles/styles"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import { Box } from "@mui/material"

function Layout() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SideBar />
      <Box
        style={{
          height: "calc(100vh)",
          width: "100%",
          position: "relative"
        }}
      >
        <Outlet />
      </Box>
    </div>
  )
}

export default Layout
