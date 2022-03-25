import { Grow, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import PickerDate from "./../components/DatePicker/index";

const Chart = () => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  const chart = useSelector((state) => state.sideBarToggle.chart);

  return (
    <Grow in={chart} timeout={1500}>
      <Box
        square={true}
        sx={{
          width: !chart ? 0 : sidebar ? "80%" : "95%",
          height: "calc(100vh - 65vh)",
          position: "absolute",
          bottom: 0,
          left: !chart ? 0 : sidebar ? "20%" : "5%",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(7px)",
        }}
      >
        <div style={{ width: "17.5%", margin: "1%" }}>
          <PickerDate />
        </div>
      </Box>
    </Grow>
  );
};

export default Chart;
