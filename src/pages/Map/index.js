import React, { useEffect, useRef } from "react"
import { Box, Grid } from "@mui/material"
import ListOfMaps from "./ListOfMaps"
import Chart from "./Chart"
import BasicMap from "./BasicMap"
import { useSelector, useDispatch } from "react-redux"
import { handleChangeIsChartOpen, handleChangeKontur } from "../../redux/features/sideBar/sideBarSlice"

const Map = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.sideBarToggle.maps)
  const isOpenChart = useSelector((state) => state.sideBarToggle.chart)
  const selectedIndex = useSelector((state) => state.sideBarToggle.selectedIndex)

  const containerRef = useRef(null)
  const changeKontur = () => {
    dispatch(handleChangeKontur(!isOpen))
  }
  const handleChangeChart = () => {
    dispatch(handleChangeIsChartOpen(!isOpenChart))
  }

  return (
    <>
      <Box ref={containerRef} sx={{ height: "calc(100vh)" }}>
        <ListOfMaps open={isOpen} isSmall={isOpenChart} openChart={handleChangeChart} openKontur={changeKontur} />
        {selectedIndex && <Chart open={isOpenChart} selectedIndex={selectedIndex} />}
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <BasicMap isSmallVertical={isOpenChart} isSmallHorizontal={isOpen} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Map
