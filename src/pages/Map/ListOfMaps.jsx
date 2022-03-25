import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  ListItemButton,
  List,
  Grow,
  Paper,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ArrowForwardIos } from "@mui/icons-material";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Kontur from "././../../assets/pngwing.png";
import ButtonPrimary from "../components/Button";
import AddIcon from "@mui/icons-material/Add";
import ModalPrimary from "../components/Modal";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./../../styles/styles";

const menuOptions = [
  { name: "Ўзгартириш", icon: <EditIcon /> },
  { name: "Ўчириш", icon: <DeleteIcon /> },
];

const ListOfMaps = ({ open, isSmall, openChart, openKontur }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [sidebar, setSidebar] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  // const handleOpenSideBar = () => {
  //   setSidebar(!sidebar);
  // };
  const handleChange = () => {
    setSidebar((prev) => !prev);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ModalPrimary open={openModal} setOpen={setOpenModal} />
      <Grow in={open} {...(open ? { timeout: 1500 } : {})}>
        <Box
          sx={{
            position: "absolute",
            width: sidebar ? "20%" : "5%",
            height: isSmall ? "calc(100vh - 35vh )" : "calc(100vh )",
            zIndex: "1300",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Grid container sx={{ pt: 2 }}>
            {sidebar && (
              <>
                <Grid
                  item
                  xs={10}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography align="center" variant="h6" noWrap={true}>
                    Контурлар рўйхати
                  </Typography>
                </Grid>
              </>
            )}
            <Grid
              item
              xs={sidebar ? 2 : 12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
                bgcolor: "primary",
              }}
            >
              <IconButton onClick={handleChange}>
                {sidebar ? <ArrowBackIosNewIcon /> : <ArrowForwardIos />}
              </IconButton>
            </Grid>
          </Grid>
          {sidebar && (
            <Grid item xs={5}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Излаш…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
          )}

          {sidebar ? (
            <List component="nav">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                disableGutters="true"
              >
                <Grid container spacing={0}>
                  <Grid
                    // sx={{ width: "60px", height: "60px"q, position: "relative" }}
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                      src={Kontur}
                      alt="kontur"
                    ></img>
                    {/* <MyLocationIcon
                  style={{
                    position: "absolute",
                    right: "80%",
                    bottom: "5%",
                    width: "20px",
                  }}
                /> */}
                  </Grid>
                  <Grid item xs={9} container paddingRight={1.5}>
                    <Grid
                      item
                      xs={10}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="subtitle1"
                        noWrap={true}
                      >
                        Контур номи
                      </Typography>
                      <Typography variant="body2">Экин: (номи)</Typography>
                      <Typography variant="caption">2022</Typography>
                    </Grid>
                    <Grid item xs={2} align={"end"}>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={openMenu ? "long-menu" : undefined}
                        aria-expanded={openMenu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                    <Menu
                      sx={{ zIndex: 9999 }}
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          width: "15ch",
                          zIndex: "9999",
                        },
                      }}
                    >
                      {menuOptions.map((item) => (
                        <MenuItem onClick={handleClose}>
                          {item.icon}
                          <Typography variant="caption" mx={1}>
                            {item.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              </ListItemButton>
            </List>
          ) : (
            <List component="nav">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                disableGutters="true"
                py={0}
              >
                <Grid container>
                  <Grid item xs={12} align="center">
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                      src={Kontur}
                      alt="kontur"
                    ></img>
                  </Grid>
                </Grid>
              </ListItemButton>
            </List>
          )}
          <ButtonPrimary
            onClick={handleOpen}
            icon={<AddIcon />}
            title={"Maydon qo'shish"}
            absolute={true}
            bottom={"10px"}
            left={sidebar ? "0px" : "0px"}
            sidebar={sidebar}
            width={sidebar ? "300px" : "60px"}
            right={"0px"}
          />
        </Box>
        {/* </Collapse> */}
      </Grow>
    </>
  );
};

export default ListOfMaps;
