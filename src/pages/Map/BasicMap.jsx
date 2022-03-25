import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { MapContainer } from "react-leaflet";
import initMap from "./pure/map";
import { useSelector } from "react-redux";

export let mapInstance;
export let lfMapInstance;
const BasicMap = ({ isSmallVertical, isSmallHorizontal }) => {
  const [map, setMap] = useState(null);
  const [lfMap, setLFMap] = useState(null);
  const centerMap = useSelector((state) => state.sideBarToggle.centerMap);

  useEffect(() => {
    if (!map) return;
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [isSmallVertical, isSmallHorizontal, map]);

  useEffect(() => {
    if (map && !lfMap) {
      setLFMap(initMap(map, centerMap));
    }
  }, [map, lfMap]);

  useEffect(() => {
    if (!map || !lfMap) return;
    lfMap.google.addTo(map);
  }, [map, lfMap]);

  useEffect(() => {
    if (!lfMap) return;
    mapInstance = { map };
    lfMapInstance = { lfMap };
  }, [lfMap]);

  return (
    <Box
      elevation={1}
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* {centerMap && ( */}
      <MapContainer
        zoomDelta={0.5}
        zoomSnap={0.5}
        wheelPxPerZoomLevel={120}
        trackResize={true}
        whenCreated={setMap}
        style={{ width: "100%", height: "100%" }}
        center={[41, 69]}
        zoom={11}
      ></MapContainer>
    </Box>
  );
};

export default BasicMap;
