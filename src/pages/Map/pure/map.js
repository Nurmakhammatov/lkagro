// ** JWT config
// import useJwt from "@src/auth/jwt/useJwt"
// const config = useJwt.jwtConfig

import L from "leaflet";
import F from "./fizmasoft/fizmasoft";

/* Leaflet modules */
import "./leaflet/leaflet.ruler";
import "./leaflet/leaflet.geometryutil";
import "./leaflet/leaflet.zoomlabel";
import "./leaflet/leaflet.loader";
import "./leaflet/leaflet.search";
import "./leaflet/leaflet.buttons";
import "./fizmasoft/fizmasoft.address";

/* Connections */
import contextConnections from "./connections/contextConnections";
import rulerConnections from "./connections/rulerConnections";
import xududConnections from "./connections/xududConnections";
import geomConnections from "./connections/geomConnections";

/* Leaflet CSS */
import "leaflet/dist/leaflet.css";
import "./styles/leaflet/leaflet.css";
import "./styles/leaflet/leaflet.ruler.css";
import "./styles/leaflet/leaflet.zoomlabel.css";
import "./styles/others/flaticon.css";
import "./styles/leaflet/leaflet.search.css";
import "./styles/leaflet/leaflet.buttons.css";
import "./styles/fizmasoft/fizmasoft.sparklingMarker.css";
import "./styles/leaflet/leaflet.contextmenu.css";
import "./styles/others/fontawesome.css";
import "./styles/leaflet/leaflet.awesome-markers.css";
import "./styles/leaflet/leaflet.loader.css";
import "./styles/leaflet/leaflet.markercluster.css";
import "./styles/leaflet/leaflet.markercluster.default.css";

const initMap = (map, callbacks, intl, dispatch, mapLayerChanged) => {
  const attr = {
    maxZoom: 18,
    attribution: `&copy; ABL-Soft&SS 2014-${new Date().getFullYear()}`,
  };
  const light = L.tileLayer(
    "https://api.fizmasoft.uz/osm_tiles/{z}/{x}/{y}.png",
    L.Util.extend({}, attr)
  );

  const google = L.tileLayer(
    `http://mt{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
    L.Util.extend({}, attr, { subdomains: "0123" })
  );

  const baseMaps = {
    Карта: light,
    Satellite: google,
  };
  // L.control.zoomLabel().setPosition("bottomright").addTo(map);

  L.control.scale({ imperial: false }).setPosition("bottomright").addTo(map);
  F.address({ intl }).addTo(map);
  L.control
    .buttons([
      [
        {
          id: 0,

          title: "Харитани кайтариш",
          // title: intl.formatMessage({ id: "ReturnMap" }),
          iconCls: "fa fa-crosshairs",
          callback: (e) => {
            e.target.click();
            map.flyTo([41.31, 69.29], 11);
          },
        },
      ],
    ])
    .setPosition("topright")
    .addTo(map);
  L.control.layers(baseMaps).addTo(map);

  // map.on("baselayerchange", function (e) {
  //   dispatch(mapLayerChanged(e.name));
  // });
  // TOOLS
  const rulerFuncs = rulerConnections.connectToMap(map);
  const xududFuncs = xududConnections.connectToMap(map);
  const geomFuncs = geomConnections.connectToMap(
    map,
    // callbacks.handlePassport,
    intl
  );

  contextConnections.initMapContext(map);

  return {
    google,
    light,
    ...rulerFuncs,
    ...xududFuncs,
    ...geomFuncs,
  };
};

export default initMap;