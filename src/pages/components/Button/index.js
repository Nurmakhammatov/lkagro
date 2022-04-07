import { Button } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const ButtonPrimary = ({ title, icon, absolute = false, bottom, left, right, sidebar = true, width = "100%", onClick, defaultMinWidth = "100%", minWidth = "100%" }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: absolute ? "absolute" : "static",
        left,
        bottom,
        right,
        marginLeft: "auto",
        marginRight: "auto",
        width
      }}
    >
      <Button style={{ minWidth: sidebar ? minWidth : defaultMinWidth }} justify="center" align="center" variant="contained">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {icon}
          {sidebar && title}
        </div>
      </Button>
    </Box>
  )
}

export default ButtonPrimary
