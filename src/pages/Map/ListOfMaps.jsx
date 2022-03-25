import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
  List,
  Grow,
  Collapse,
  Paper,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ArrowForwardIos } from "@mui/icons-material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Kontur from "././../../assets/pngwing.png";
import ButtonPrimary from "../components/Button";
import AddIcon from "@mui/icons-material/Add";
import ModalPrimary from "../components/Modal";

const ListOfMaps = ({ open, isSmall, openChart, openKontur }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [sidebar, setSidebar] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleOpenSideBar = () => {
    setSidebar(!sidebar);
  };
  const handleChange = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <>
      <ModalPrimary open={openModal} setOpen={setOpenModal} />
      <Grow in={open} {...(open ? { timeout: 1500 } : {})}>
        {/* <Collapse orientation="horizontal" in={sidebar} collapsedSize={40}> */}
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
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography align="center" variant="subtitle2">
                  Контурлар рўйхати
                </Typography>
              </Grid>
            )}

            <Grid
              item
              xs={sidebar ? 1 : 10}
              sx={{ display: "flex", justifyContent: "end" }}
            >
              <IconButton onClick={handleChange}>
                {sidebar ? <ArrowBackIosNewIcon /> : <ArrowForwardIos />}
              </IconButton>
            </Grid>
          </Grid>
          {sidebar ? (
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <Box sx={{ width: "100%", height: "60px", display: "flex" }}>
                  <Box
                    sx={{ width: "25%", height: "100%", position: "relative" }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
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
                  </Box>
                  <Box sx={{ width: "75%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="subtitle1"
                        noWrap={true}
                      >
                        Контур номи
                      </Typography>
                      <IconButton
                      // sx={{ width: "15px", height: "15px" }}
                      >
                        <MoreVertIcon sx={{ height: "20px", width: 20 }} />
                      </IconButton>
                    </div>
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography variant="body2" mt={0.5} noWrap={true}>
                          2022 - Экин номи
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2" mt={0.5} noWrap={true}>
                          15 га
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </ListItemButton>
            </List>
          ) : (
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <Box sx={{ width: "100%", height: "60px", display: "flex" }}>
                  <Box
                    sx={{ width: "100%", height: "100%", position: "relative" }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={Kontur}
                      alt="kontur"
                    ></img>
                  </Box>
                </Box>
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
            width={sidebar ? "200px" : "60px"}
            right={"0px"}
          />
        </Box>

        {/* </Collapse> */}
      </Grow>
    </>
  );
};

export default ListOfMaps;
