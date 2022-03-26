import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  ListItemButton,
  List,
  Grow,
  Menu,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ArrowForwardIos } from "@mui/icons-material";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonPrimary from "../components/Button";
import AddIcon from "@mui/icons-material/Add";
import ModalPrimary from "../components/Modal";
import PerfectScrollbar from "react-perfect-scrollbar";
import { mapInstance } from "../Map/BasicMap";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./../../styles/styles";
import api from "./api";
import FIELDS from "./fields/map";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeSidebar,
  handleSelectedIndex,
  handleCenterMap,
  handleGetIndexes,
} from "../../redux/features/sideBar/sideBarSlice";

const menuOptions = [
  { name: "Ўзгартириш", icon: <EditIcon /> },
  { name: "Ўчириш", icon: <DeleteIcon /> },
];
const ListOfMaps = ({ open }) => {
  const dispatch = useDispatch();
  const [onMapView, setOnMapView] = React.useState(null);
  // const [selectedIndex, setSelectedIndex] = React.useState(null);
  const selectedIndex = useSelector(
    (state) => state.sideBarToggle.selectedIndex
  );
  // const [sidebar, setSidebar] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  const centerMap = useSelector((state) => state.sideBarToggle.centerMap);

  const handleOpen = () => setOpenModal(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleListItemClick = async (id) => {
    if (selectedIndex !== id) {
      dispatch(handleSelectedIndex(id));
      mapInstance.map.scrollWheelZoom.disable();
      // mapInstance.map.zoomControl.disable()
      const { data } = await api.getFieldById(id);
      setMapData(data);
      
      dispatch(handleGetIndexes([data?.[0]?.index]));
    } else {
      mapInstance.map.scrollWheelZoom.enable();
      // mapInstance.map.zoomControl.enable()
      dispatch(handleSelectedIndex(null));
      mapInstance.map.flyTo(centerMap, 14);
      setMapData(result);
    }
  };

  const handleChange = () => {
    dispatch(handleChangeSidebar(!sidebar));
  };
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFields = async () => {
    const { data } = await api.getFields();
    setResult(data?.[0]?.fields);
    setFields(data?.[0]?.fields);
    setMapData(data?.[0]?.fields);
    dispatch(handleCenterMap(data?.[0]?.centeroid));
    localStorage.setItem("center", data?.[0]?.centeroid);
  };

  useEffect(() => {
    if (open) {
      getFields();
    } else {
      setResult([]);
      setMapData([]);
      setFields([]);
      dispatch(handleSelectedIndex(null));
      if (onMapView) onMapView.removeLayers();
    }
  }, [open]);

  useEffect(() => {
    if (!mapInstance) return;
    setOnMapView(new FIELDS(mapInstance.map));
  }, [mapInstance]);

  useEffect(() => {
    if (!centerMap) return;
    mapInstance.map.flyTo(centerMap, 14);
  }, [centerMap]);

  useEffect(() => {
    if (!onMapView || !mapData) return;
    onMapView.addLayers(mapData, selectedIndex && true);
  }, [onMapView, mapData, selectedIndex]);

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      const filtered = result.filter(
        (f) => f.counter_number === e.target.value
      );
      setFields(filtered);
    } else {
      setFields(result);
    }
  };

  return (
    <>
      <ModalPrimary open={openModal} setOpen={setOpenModal} />
      <Grow in={open} {...(open ? { timeout: 1500 } : {})}>
        <Box
          sx={{
            position: "absolute",
            width: sidebar ? "15%" : "5%",
            height: "100vh",
            zIndex: "1300",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(5px)",
          }}
        >
          {/* <Chart sidebar={sidebar} /> */}
          <Grid
            // style={{ backgroundColor: "rgba(250, 214, 82, 0.7)" }}
            container
            sx={{ pt: 2 }}
          >
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
                    Экин майдонлар
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
                marginBottom: !sidebar && "10px",
              }}
            >
              <IconButton onClick={handleChange}>
                {sidebar ? <ArrowBackIosNewIcon /> : <ArrowForwardIos />}
              </IconButton>
            </Grid>
          </Grid>
          {sidebar && (
            <Grid style={{ marginBottom: "20px" }} item xs={5}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleSearch}
                  placeholder="Излаш…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
          )}
          <hr style={{ border: "1px solid gray" }} />

          {sidebar ? (
            <>
              <PerfectScrollbar style={{ height: "calc(100vh - 200px)" }}>
                {fields.map((field) => (
                  <List style={{ padding: "0px" }} component="nav">
                    <ListItemButton
                      style={{
                        backgroundColor:
                          field.id === selectedIndex && "#fad652",
                      }}
                      onClick={(e) => {
                        handleListItemClick(field.id);
                      }}
                      disableGutters="true"
                    >
                      <Grid container spacing={0}>
                        <Grid
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
                              width: "70%",
                              height: "100%",
                            }}
                            src={`data:image/png;base64,${field.field_image}`}
                            alt="kontur"
                          ></img>
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
                              Майдон: {field.counter_number}
                            </Typography>
                            <Typography variant="body2">
                              Экин: {field.crop_type}
                            </Typography>
                            <Typography variant="caption">
                              Сана: {field.created_at}
                            </Typography>
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
                              elevation: 0,
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
                ))}
              </PerfectScrollbar>
            </>
          ) : (
            <>
              <PerfectScrollbar style={{ height: "calc(100vh - 150px)" }}>
                {fields.map((field) => (
                  <List style={{ padding: "0px" }} component="nav">
                    <ListItemButton
                      style={{
                        backgroundColor:
                          field.id === selectedIndex && "#fad652",
                      }}
                      onClick={() => handleListItemClick(field.id)}
                      disableGutters="true"
                      py={0}
                    >
                      <Grid container>
                        <Grid item xs={12} align="center">
                          <img
                            style={{
                              width: "70%",
                              height: "100%",
                            }}
                            src={`data:image/png;base64,${field.field_image}`}
                            alt="kontur"
                          ></img>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  </List>
                ))}
              </PerfectScrollbar>
            </>
          )}
          <ButtonPrimary
            onClick={handleOpen}
            icon={<AddIcon />}
            title={"Майдон қўшиш"}
            absolute={true}
            bottom={"10px"}
            left={sidebar ? "0px" : "0px"}
            sidebar={sidebar}
            width={sidebar ? "90%" : "60%"}
            right={"0px"}
            minWidth={sidebar ? "90%" : "50%"}
          />
        </Box>
      </Grow>
    </>
  );
};;

export default ListOfMaps;
