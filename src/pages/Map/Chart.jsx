import React, { useEffect, useState } from "react";
import { Grow, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Satellite from "../../assets/satellite.png";
import FieldChart from "../charts";
import api from "./api/index";
import PickerDate from "./../components/DatePicker/index";
import MultipleSelect from "./../components/MultiSelect/index";

const names = ["MVC", "MVTS"];

const Chart = ({ selectedIndex }) => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  const chart = useSelector((state) => state.sideBarToggle.chart);
  const [chartData, setChartData] = useState([]);

  useEffect(async () => {
    const { data } = await api.getChartsData(
      selectedIndex,
      "2021-04-14",
      "2021-04-14",
      ["ndvi", "mndvi"]
    );
    setChartData(data);
  }, [selectedIndex]);

  return (
    <Grow in={chart} timeout={1500}>
      <Box
        square={true}
        sx={{
          width: !chart ? 0 : sidebar ? "85%" : "95%",
          height: "calc(100vh - 70vh)",
          position: "absolute",
          bottom: 0,
          left: !chart ? 0 : sidebar ? "15%" : "5%",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(7px)",
        }}
      >
        <Grid container px={1}>
          <Grid item xs={2}>
            <MultipleSelect names={names} />
            <PickerDate />
          </Grid>
          <Grid item xs={10}>
            <FieldChart chartData={chartData} />
          </Grid>
        </Grid>
      </Box>
    </Grow>
  );
};

export default Chart;
