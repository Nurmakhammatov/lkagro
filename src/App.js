import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material/";
import { responsiveTheme } from "./styles/styles";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";

function App() {
  return (
    <>
      <ThemeProvider theme={responsiveTheme}>
        <ToastContainer />
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
