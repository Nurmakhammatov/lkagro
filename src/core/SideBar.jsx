import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { List, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AddCircleOutlined } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { ListItem } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeKontur } from "../redux/features/sideBar/sideBarSlice";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.sideBarToggle.maps);
  console.log(count);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const menuItems = [
    {
      text: "My maps",
      icon: <MapIcon color="black" />,
      path: "/map",
    },
    {
      text: "Add map",
      icon: <AddCircleOutlined color="black" />,
      path: "/add",
    },
  ];

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{ display: "flex", justifyContent: "space-between" }}
          sx={{ py: 0, my: 0 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              marginRight: 1,
              ...(!open && { display: "none" }),
            }}
            variant="subtitle2"
          >
            LOCHINKO`ZAGRO
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            color="inherit"
            aria-label="open drawer"
            edge="end"
            sx={{
              marginRight: 3,
              ...(!open && { display: "none" }),
            }}
          >
            <MenuOpenIcon />
          </IconButton>
        </DrawerHeader>
        <List sx={{ py: 0, my: 0 }}>
          {menuItems.map((item) => (
            <NavLink
              onClick={
                item.path === "/map"
                  ? () => dispatch(handleChangeKontur(!count))
                  : null
              }
              key={item.text}
              to={item.path}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button selected={location.pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </>
  );
}
