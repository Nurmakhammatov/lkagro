import React, { useRef, useState } from "react";
import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import ListOfMaps from "./ListOfMaps";
import Chart from "./Chart";
import BasicMap from "./BasicMap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { handleChangeKontur } from "../../redux/features/sideBar/sideBarSlice";

const Map = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sideBarToggle.maps);

  const [checkedChart, setCheckedChart] = useState(false);
  const containerRef = useRef(null);
  const changeKontur = () => {
    dispatch(handleChangeKontur(!isOpen));
  };
  const handleChangeChart = () => {
    setCheckedChart((prev) => !prev);
  };

  return (
    <>
      <Box ref={containerRef} sx={{ height: "calc(100vh)" }}>
        {/* <ButtonGroup
          style={{ position: "absolute", zIndex: "9999" }}
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ mb: 1 }}
        >
          <Button onClick={() => handleChangeKontur()}>Konturlar</Button>
          <Button onClick={() => handleChangeChart()}>Charts</Button>
        </ButtonGroup> */}
        <ListOfMaps
          open={isOpen}
          isSmall={checkedChart}
          openChart={handleChangeChart}
          openKontur={changeKontur}
        />
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <BasicMap
              isSmallVertical={checkedChart}
              isSmallHorizontal={isOpen}
            />
          </Grid>
          {checkedChart && (
            <Grid item xs={12}>
              <Chart
                open={checkedChart}
                openChart={handleChangeChart}
                // openKontur={changeKontur}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Map;
