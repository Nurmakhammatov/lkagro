import {
  Box,
  Slide,
  Grid,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
  List,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
import { ArrowForwardIos } from "@mui/icons-material";

const ListOfMaps = ({ open, isSmall, openChart, openKontur }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [sidebar, setSidebar] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleOpenSideBar = () => {
    setSidebar(!sidebar);
  };
  return (
    <Slide direction="right" in={open} timeout={1000}>
      <Box
        sx={{
          position: "absolute",
          width: sidebar ? "20%" : "5%",
          height: isSmall ? "calc(100vh - 35vh )" : "calc(100vh )",
          zIndex: "9999",
          bgcolor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Grid container sx={{ p: 1, pt: 2 }}>
          {sidebar && (
            <Grid item xs={6}>
              <Typography
                align="center"
                variant="subtitle2"
                sx={{ fontSize: "1.5rem" }}
              >
                Контурлар
              </Typography>
            </Grid>
          )}

          <Grid
            item
            xs={sidebar ? 6 : 10}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <IconButton onClick={handleOpenSideBar}>
              {sidebar ? <ArrowBackIosNewIcon /> : <ArrowForwardIos />}
            </IconButton>
          </Grid>
        </Grid>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </Box>
    </Slide>
  );
};

export default ListOfMaps;
