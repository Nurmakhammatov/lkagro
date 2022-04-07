import React, { useEffect, useState } from "react"
import { Grow, Box, Button, Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import Satellite from "../../assets/satellite.png"
import FieldChart from "./charts"
import api from "./api/index"
import PickerDate from "./../components/DatePicker/index"
import { ArrowBack, ArrowDownward, ArrowForward, ArrowUpward } from "@mui/icons-material"
import MultipleSelect from "./../components/MultiSelect/index"
import AliceCarousel from "react-alice-carousel"
import { handleGetAreaMap, handleGetIndexes, handleOpenBottomBar } from "../../redux/features/sideBar/sideBarSlice"
import moment from "moment"

const Chart = ({ selectedIndex }) => {
  const sidebar = useSelector((state) => state.sideBarToggle.sidebar)
  const chart = useSelector((state) => state.sideBarToggle.chart)
  const [chartData, setChartData] = useState([])
  const [extraSidebar, setExtraSidebar] = useState(true)
  const [timer, setTimer] = useState(null)
  const [getSlideCount, setGetSlideCount] = useState(null)
  const dateFrom = useSelector((state) => state.datePickers.dateFrom)
  const dateTo = useSelector((state) => state.datePickers.dateTo)
  const indexes = useSelector((state) => state.sideBarToggle.indexes)

  const dispatch = useDispatch()

  const getChartDetails = async () => {
    const { data } = await api.getChartsData(selectedIndex, moment(dateFrom).format("YYYY-MM-DD"), moment(dateTo).format("YYYY-MM-DD"), indexes)
    // !! if (Number(localStorage.getItem("chartLength")) !== data?.[0]?.analysis?.length) {
    localStorage.setItem("chartLength", data?.[0]?.analysis?.length)
    setChartData(data)
    const theLast = data?.[0]?.analysis[data?.[0]?.analysis.length - 1]
    const result = await api.getFieldById(selectedIndex, [String(theLast.index)], moment(theLast.the_date).format("DD.MM.YYYY"), [theLast.id])
    dispatch(handleGetAreaMap(result.data))
    dispatch(handleGetIndexes([result.data?.[0]?.index.toUpperCase()]))
    // !! }
  }

  const getChartDetailByPoints = async (the_date, indexes, analysisIds) => {
    const { data } = await api.getFieldById(selectedIndex, [String(indexes)], moment(the_date).format("DD.MM.YYYY"), [analysisIds])
    dispatch(handleGetAreaMap(data))
  }

  const items = chartData?.[0]?.analysis?.map((d, index) => [
    <div className="item">
      <Button
        onClick={() => getChartDetailByPoints(d.the_date, d.index, d.id)}
        sx={{
          ":hover": {
            color: "white",
            border: "2px solid #333333 !important"
          }
        }}
        style={{
          margin: "0px 0px 0px 5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          border: "2px solid #7f7f7d",
          fontSize: 10,
          minWidth: 130
        }}
        variant="outlined"
      >
        <img style={{ marginRight: 5, width: 15 }} src={Satellite} alt="satellite" />
        {d.day}
      </Button>
    </div>
  ])

  useEffect(() => {
    getChartDetails()
  }, [indexes, dateFrom, dateTo, selectedIndex])

  // useEffect(() => {
  //   if (!extraSidebar) {
  //     const interval = setInterval(() => {
  //       getChartDetails();
  //     }, 2000);
  //     setTimer(interval);
  //   }
  //   return () => clearInterval(timer);
  // }, [extraSidebar]);

  // useEffect(async () => {
  //   const { data } = await api.getFieldById(selectedIndex, [String(indexes)]);
  //   dispatch(handleGetAreaMap(data));
  // }, [indexes]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 6 },
    1400: { items: 10 },
    3000: { items: 15 },
    4000: { items: 18 }
  }

  return (
    <Grow in={chart} timeout={1500}>
      <Box
        square={true}
        sx={{
          width: !chart ? 0 : sidebar ? "85%" : "95%",
          // height: extraSidebar ? "calc(100vh - 98vh)" : "calc(100vh - 70vh)",
          position: "absolute",
          padding: "0px 0px 5px 0px",
          bottom: 0,
          left: !chart ? 0 : sidebar ? "15%" : "5%",
          zIndex: 1200,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)"
        }}
      >
        {!extraSidebar ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "5px 0px",
                alignItems: "center"
              }}
            >
              <Button
                style={{
                  backgroundColor: "#a9cc52"
                }}
                onClick={() => {
                  dispatch(handleOpenBottomBar(false))
                  setExtraSidebar(true)
                  clearInterval(timer)
                }}
                variant="contained"
              >
                <ArrowDownward />
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  overflow: "hidden",
                  width: "100%",
                  padding: "0px 30px",
                  overflow: "hidden",
                  height: "40px"
                }}
              >
                {chartData?.[0]?.analysis && (
                  <>
                    <AliceCarousel
                      keyboardNavigation={true}
                      activeIndex={chartData?.[0]?.analysis?.length - getSlideCount}
                      mouseTracking
                      items={items}
                      responsive={responsive}
                      controlsStrategy="alternate"
                      disableButtonsControls={false}
                      disableDotsControls={true}
                    />
                  </>
                )}
              </div>
            </div>
            <Grid container px={1}>
              <Grid item xs={1.2}>
                {indexes.length > 0 && <MultipleSelect indexesSelect={indexes} />}

                <PickerDate />
              </Grid>
              <Grid item xs={10.8}>
                <FieldChart chartData={chartData} getChartDetailByPoints={getChartDetailByPoints} />
              </Grid>
            </Grid>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "5px 0px",
              alignItems: "center"
            }}
          >
            <Button
              style={{
                backgroundColor: "#a9cc52"
              }}
              onClick={() => {
                dispatch(handleOpenBottomBar(true))
                setExtraSidebar(false)
              }}
              variant="contained"
            >
              <ArrowUpward />
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: "0px 30px",
                overflow: "hidden",
                height: "40px"
              }}
            >
              {chartData?.[0]?.analysis && (
                <>
                  <AliceCarousel
                    onInitialized={(e) => setGetSlideCount(e.itemsInSlide)}
                    keyboardNavigation={true}
                    activeIndex={chartData?.[0]?.analysis?.length - getSlideCount}
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    controlsStrategy="alternate"
                    disableButtonsControls={false}
                    disableDotsControls={true}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </Box>
    </Grow>
  )
}

export default Chart
