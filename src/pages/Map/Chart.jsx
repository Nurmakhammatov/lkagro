import React, { useEffect, useState } from "react";
import { Grow, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Satellite from "../../assets/satellite.png";
import FieldChart from "../charts";
import api from "./api/index";
import PickerDate from "./../components/DatePicker/index";

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
        <div style={{ width: "20%" }}>
          {/* <div style={{ width: "17.5%", margin: "1%" }}> */}

          <PickerDate />
          {/* </div> */}
        </div>
        <div style={{ width: "80%" }}>
          <FieldChart chartData={chartData} />
        </div>
        {/* <img src={Satellite} alt="satellite" /> */}
      </Box>
    </Grow>
  );
};

export default Chart;
