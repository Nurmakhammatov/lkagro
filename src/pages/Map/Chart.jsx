import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grow, Box, Button, Grid, IconButton } from "@mui/material";
import moment from "moment";
import FieldChart from "../charts";
import api from "./api/index";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PickerDate from "./../components/DatePicker/index";
import MultipleSelect from "./../components/MultiSelect/index";
import AliceCarousel from "react-alice-carousel";
import Satellite from "../../assets/satellite.png";

const Chart = ({ selectedIndex }) => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar);
  const chart = useSelector((state) => state.sideBarToggle.chart);
  const [chartData, setChartData] = useState([]);
  const [extraSidebar, setExtraSidebar] = useState(true);
  const [selectedChartTypes, setSelectedChartTypes] = useState(["NDVI"]);
  const dateFrom = useSelector((state) => state.datePickers.dateFrom);
  const dateTo = useSelector((state) => state.datePickers.dateTo);
  const indexes = useSelector((state) => state.sideBarToggle.indexes);

  const items = chartData?.[0]?.analysis?.map((d, index) => [
    <div className="item">
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
          fontSize: 10,
          padding: "2px 2px",
          // minWidth: 125,
          maxWidth: 125,
        }}
        // color="primary"
        variant="outlined"
      >
        <img
          style={{ marginRight: 5, width: 15 }}
          src={Satellite}
          alt="satellite"
        />
        {d.day}
      </Button>
    </div>,
  ]);

  const getChartDetails = async () => {
    const { data } = await api.getChartsData(
      selectedIndex,
      moment(dateFrom).format("YYYY-MM-DD"),
      moment(dateTo).format("YYYY-MM-DD"),
      selectedChartTypes.length > 0 ? selectedChartTypes : indexes
    );
    setChartData(data);
  };

  useEffect(() => {
    getChartDetails();
  }, [selectedIndex, selectedChartTypes, dateFrom, dateTo]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 8 },
  };

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
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        {!extraSidebar ? (
          <>
            <Grid container pt={0.5} px={1}>
              <Grid item xs={0.5} alignItems={"center"}>
                <Button
                  style={{
                    backgroundColor: "#a9cc52",
                  }}
                  onClick={() => setExtraSidebar(true)}
                  variant="contained"
                >
                  <ArrowDownward />
                </Button>
              </Grid>{" "}
              <Grid item xs={0.25}>
                <IconButton>
                  <ChevronLeftIcon />
                </IconButton>
              </Grid>
              {chartData?.[0]?.analysis && (
                <Grid item xs={11} pt={1}>
                  <AliceCarousel
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    controlsStrategy="alternate"
                    disableButtonsControls={true}
                    disableDotsControls={true}
                    paddingLeft="50"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={0.25}>
                <IconButton
                //  onClick={() => slideNext}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container px={1}>
              <Grid item xs={1.2}>
                {indexes.length > 0 && (
                  <MultipleSelect
                    setSelectedChartTypes={setSelectedChartTypes}
                    selectedChartTypes={selectedChartTypes}
                    indexes={indexes}
                  />
                )}

                <PickerDate />
              </Grid>
              <Grid item xs={10.8}>
                <FieldChart chartData={chartData} />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container pt={0.5} px={1}>
            <Grid item xs={0.5} alignItems={"center"}>
              <Button
                style={{
                  backgroundColor: "#a9cc52",
                }}
                onClick={() => setExtraSidebar(false)}
                variant="contained"
              >
                <ArrowUpward />
              </Button>
            </Grid>
            <Grid item xs={0.25}>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            {chartData?.[0]?.analysis && (
              <Grid item xs={11} pt={0.4} container>
                <AliceCarousel
                  mouseTracking
                  items={items}
                  responsive={responsive}
                  controlsStrategy="alternate"
                  disableButtonsControls={true}
                  disableDotsControls={true}
                  paddingLeft="50"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Grid>
            )}
            <Grid item xs={0.25}>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Box>
    </Grow>
  );
};

export default Chart;
