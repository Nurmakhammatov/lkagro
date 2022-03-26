import React, { useEffect, useState } from "react";
import { Grow, Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Satellite from "../../assets/satellite.png";
import FieldChart from "../charts";
import api from "./api/index";
import PickerDate from "./../components/DatePicker/index";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import MultipleSelect from "./../components/MultiSelect/index";
import moment from "moment";

const Chart = ({ selectedIndex }) => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  const chart = useSelector((state) => state.sideBarToggle.chart);
  const [chartData, setChartData] = useState([]);
  const [extraSidebar, setExtraSidebar] = useState(true);
  const [selectedChartTypes, setSelectedChartTypes] = useState([]);
  const dateFrom = useSelector((state) => state.datePickers.dateFrom);
  const dateTo = useSelector((state) => state.datePickers.dateTo);

  const getChartDetails = async () => {
    const { data } = await api.getChartsData(
      selectedIndex,
      moment(dateFrom).format("YYYY-MM-DD"),
      moment(dateTo).format("YYYY-MM-DD"),
      ["ndvi"]
    );
    setChartData(data);
  };

  useEffect(() => {
    getChartDetails();
  }, [selectedIndex]);

  return (
    <Grow in={chart} timeout={1500}>
      <Box
        square={true}
        sx={{
          width: !chart ? 0 : sidebar ? "85%" : "95%",
          height: extraSidebar ? "calc(100vh - 95vh)" : "calc(100vh - 70vh)",
          position: "absolute",
          bottom: 0,
          left: !chart ? 0 : sidebar ? "15%" : "5%",
          zIndex: 1200,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(7px)",
        }}
      >
        {!extraSidebar ? (
          <>
            <div
              style={{
                margin: "5px 0px 0px 5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#a9cc52",
                }}
                onClick={() => setExtraSidebar(true)}
                variant="contained"
              >
                <ArrowDownward />
              </Button>

              <Button
                sx={{
                  ":hover": {
                    color: "white",
                    border: "2px solid #333333 !important",
                  },
                }}
                style={{
                  margin: "0px 0px 0px 5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                  border: "2px solid #7f7f7d",
                }}
                // color="primary"
                variant="outlined"
              >
                <img
                  style={{ marginRight: 5 }}
                  src={Satellite}
                  alt="satellite"
                />
                {chartData?.[0]?.analysis?.map((d) => d.day)}
              </Button>
            </div>
            <Grid container px={1}>
              <Grid item xs={1.2}>
                {/* <MultipleSelect
                  setSelectedChartTypes={setSelectedChartTypes}
                  selectedChartTypes={selectedChartTypes}
                /> */}
                <PickerDate />
              </Grid>
              <Grid item xs={10.8}>
                <FieldChart chartData={chartData} />
              </Grid>
            </Grid>
          </>
        ) : (
          <div
            style={{
              margin: "5px 0px 0px 5px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "#a9cc52",
              }}
              onClick={() => setExtraSidebar(false)}
              variant="contained"
            >
              <ArrowUpward />
            </Button>

            <Button
              sx={{
                ":hover": {
                  color: "white",
                  border: "2px solid #333333 !important",
                },
              }}
              style={{
                margin: "0px 0px 0px 5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                border: "2px solid #7f7f7d",
              }}
              // color="primary"
              variant="outlined"
            >
              <img style={{ marginRight: 5 }} src={Satellite} alt="satellite" />
              {chartData?.[0]?.analysis?.map((d) => d.day)}
            </Button>
          </div>
        )}
      </Box>
    </Grow>
  );
};

export default Chart;
