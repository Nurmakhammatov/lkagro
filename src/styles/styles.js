import { makeStyles } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: { main: "#A9CC52" },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#A9CC52",
          color: "black",
          boxSizing: "border-box",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "lightgreen",
          },
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);

const drawerWidth = 200;

export const useStyles = makeStyles((responsiveTheme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      height: "100vh",
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      padding: responsiveTheme.spacing(1),
    },
    toolbar: responsiveTheme.mixins.toolbar,
    appbarTitle: {
      flexGrow: 1,
    },
    active: {
      backgroundColor: "black",
    },
  };
});
