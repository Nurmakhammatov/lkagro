import { Grid, Typography } from "@mui/material";
import React from "react";

const LeftSide = ({ children, size }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={size}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#a9cc52",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        LOCHINKO‘ZAGRO
      </Typography>

      <Typography textAlign="center" mx={10}>
        Благодаря возможностям вы теперь можете сосредоточиться только на
        функционерах ваших цифровых продуктов, оставив дизайн пользовательского
        интерфейса нам!
      </Typography>

      <div>{children}</div>
    </Grid>
  );
};

export default LeftSide;
