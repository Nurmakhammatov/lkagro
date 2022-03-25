import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ButtonPrimary = ({
  title,
  icon,
  absolute = false,
  bottom,
  left,
  right,
  sidebar = true,
  width,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        // display: "flex",
        // justifyContent: "center",
        position: absolute ? "absolute" : "static",
        // bottom: absolute && bottom,
        // left: absolute && left,
        left: left,
        bottom: bottom,
        right: right,
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
      }}
    >
      <Button
        style={{ minWidth: sidebar ? "300px" : "60px" }}
        justify="center"
        align="center"
        variant="contained"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {icon}
          {sidebar && title}
        </div>
      </Button>
    </Box>
  );
};

export default ButtonPrimary;
