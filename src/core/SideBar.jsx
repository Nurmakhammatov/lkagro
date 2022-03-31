import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, List, Typography, MenuItem, Menu, Paper } from "@mui/material";
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
import authApi from "./../services/authService";
import { Drawer, DrawerHeader } from "./../styles/styles";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";

const menuItems = [
  {
    text: "Майдонлар",
    icon: <MapIcon color="black" />,
    path: "/map",
  },
  // {
  //   text: "Add map",
  //   icon: <AddCircleOutlined color="black" />,
  //   path: "/add",
  // },
];

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const konturs = useSelector((state) => state.sideBarToggle.maps);

  useEffect(() => {
    const { user } = authApi.getCurrentUser();
    setUser(user);
  }, []);

  const fullName = user?.full_name?.split(" ");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "calc(100vh - 70px)",
            }}
          >
            <div>
              {menuItems.map((item) => (
                <NavLink
                  onClick={
                    item.path === "/map"
                      ? () => dispatch(handleChangeKontur(!konturs))
                      : null
                  }
                  key={item.text}
                  to={item.path}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem button selected={location.pathname === item.path}>
                    <ListItemIcon>
                      {location.pathname === item.path ? (
                        <>
                          {konturs && (
                            <Paper
                              square={true}
                              elevation={0}
                              sx={{
                                minWidth: "5px",
                                minHeight: "100%",
                                bgcolor: "#FAD652",
                                ml: -1.9,
                                mr: 1.3,
                              }}
                            ></Paper>
                          )}
                        </>
                      ) : null}
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText primary={item.text} />
                  </ListItem>
                </NavLink>
              ))}
            </div>
            <div>
              <ListItem
                button
                sx={{ mx: -0.5 }}
                onClick={handleClick}
                size="small"
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                <ListItemIcon alignItems="center">
                  <Avatar src={user?.avatar || "./"} alt={user?.full_name} />
                </ListItemIcon>
                <ListItemText primary={fullName?.[0]} />
              </ListItem>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Avatar
                      src={user?.avatar || "./"}
                      alt={user?.full_name}
                      sx={{ width: 20, height: 20 }}
                    />
                  </ListItemIcon>{" "}
                  Профиль
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Созламалар
                </MenuItem>
                <MenuItem onClick={authApi.logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Тизимдан чиқиш
                </MenuItem>
              </Menu>
            </div>
          </div>
        </List>
      </Drawer>
    </>
  );
}
