import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup, Grid } from "@mui/material";
import ListOfMaps from "./ListOfMaps";
import Chart from "./Chart";
import BasicMap from "./BasicMap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  handleChangeIsChartOpen,
  handleChangeKontur,
} from "../../redux/features/sideBar/sideBarSlice";

const Map = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sideBarToggle.maps);
  const isOpenChart = useSelector((state) => state.sideBarToggle.chart);
  const selectedIndex = useSelector(
    (state) => state.sideBarToggle.selectedIndex
  );
  const centerMap = useSelector((state) => state.sideBarToggle.centerMap);

  // const [checkedChart, setCheckedChart] = useState(true);
  const containerRef = useRef(null);
  const changeKontur = () => {
    dispatch(handleChangeKontur(!isOpen));
  };
  const handleChangeChart = () => {
    dispatch(handleChangeIsChartOpen(!isOpenChart));
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
          isSmall={isOpenChart}
          openChart={handleChangeChart}
          openKontur={changeKontur}
        />
        {selectedIndex && (
          <Chart open={isOpenChart} selectedIndex={selectedIndex} />
        )}
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {/* {centerMap && ( */}
            <BasicMap
              isSmallVertical={isOpenChart}
              isSmallHorizontal={isOpen}
            />
            {/* )} */}
          </Grid>
          {/* {isOpenChart && (
            <Grid item xs={12}> */}
          {/* </Grid>
          )} */}
        </Grid>
      </Box>
    </>
  );
};

export default Map;
