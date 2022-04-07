import { Box, Grid, Typography } from "@mui/material"
import React from "react"

const LeftSide = ({ children, size }) => {
  return (
    <Grid xs={12} md={size}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#a9cc52",
          p: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          LOCHINKO‘ZAGRO
        </Typography>

        <Typography textAlign="center" mx={10}>
          Благодаря возможностям вы теперь можете сосредоточиться только на функционерах ваших цифровых продуктов, оставив дизайн пользовательского интерфейса нам!
        </Typography>

        <div>{children}</div>
      </Box>
    </Grid>
  )
}

export default LeftSide
