import F from "./fizmasoft";
import contextConnections from "../connections/contextConnections";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "../leaflet/leaflet.contextmenu";
import "../leaflet/leaflet.reactwindow";
import "./fizmasoft.ordinaryPeople";
// import CustomInput from "reactstrap/lib/CustomInput"
import axios from "axios";
import { TextField } from "@mui/material";
// import useJwt from "@src/auth/jwt/useJwt";
// const config = useJwt.jwtConfig;
// import onListConnections from "../connections/onlistConnections"
// import Input from "reactstrap/lib/Input"
import url from "../../../../config";

/* eslint-disable */
F.Geoms = F.Class.extend({
  options: {
    selectedTypes: [],
    area: 0,
    onListForma1: () => {},
    left: 50,
    right: 50,
  },
  initialize: function (options) {
    F.setOptions(this, options);
    this._fg = L.featureGroup();
    this._ordinaryPeople = F.ordinaryPeople({ intl: this.options.intl });
    // L.DomEvent.on(this._fg, "click", this._ordinaryPeopleModal, this)
    this._types = [
      {
        id: 0,
        title: "Владеет оружием",
        // title: this.options.intl.formatMessage({ id: "OnList_OWNS_WEAPON" }),
        code: "",
      },
      {
        id: 1,
        title: "ОСОБО ОПАСНЫЙ РЕЦИДИВИСТ",
        // title: this.options.intl.formatMessage({
        //   id: "OnList_VERY_DANGEROUS_RECIPIENT",
        // }),
        code: "",
      },
      {
        id: 19,
        title: "НАРКОМАН",
        // title: this.options.intl.formatMessage({ id: "OnList_DRUG_ADDICT" }),
        code: "",
      },
      {
        id: 20,
        title: "НАРКОМАН ПУТЕМ ИНЪЕКЦИИ",
        // title: this.options.intl.formatMessage({
        //   id: "OnList_ADDICTION_BY_INJECTION",
        // }),
        code: "",
      },
      {
        id: 21,
        title: "ПСИХБОЛЬНОЙ",
        // title: this.options.intl.formatMessage({ id: "OnList_PSYCHIC" }),
        code: "",
      },
      {
        id: 91,
        title: "БЫТОВОЙ СКАНДАЛИСТ",
        // title: this.options.intl.formatMessage({
        //   id: "OnList_HOUSEHOLD_BRAWLER",
        // }),
        code: "",
      },
    ];
  },
  addTo: function (map) {
    this._map = map;
    this._fg.addTo(this._map);
    this._initDrawEvents();
    this._initPMOptions();
    // this._onListfuncs = onListConnections.connectToMap(this._map);
    return this;
  },
  _initPMOptions: function () {
    this._map.pm.setLang("ru");
    this._map.pm.setPathOptions({
      color: "#7367f0",
      fillColor: "#7367f0",
    });
  },
  _addToSelected: function (id) {
    const { selectedTypes } = this.options;
    let newSelecteds;
    if (!selectedTypes.includes(id)) {
      newSelecteds = [...selectedTypes, id];
    } else {
      const idIndex = selectedTypes.indexOf(id);
      newSelecteds = [
        ...selectedTypes.slice(0, idIndex),
        ...selectedTypes.slice(idIndex + 1),
      ];
    }
    this.options.selectedTypes = newSelecteds;
  },
  _leftRightLine: function (e, left, right) {
    if (left) this.options.left = e.target.value;
    if (right) this.options.right = e.target.value;
  },
  _getSelectedData: async function (list, layer, isLine, radius, leftRight) {
    const geojson = layer.toGeoJSON();
    // this.options.selectedTypes = [];
    // this._map.spin(true);
    const { data, l } = isLine;
    // ? await this._fetchLineData(list, geojson, leftRight)
    await this._fetchPolygonData(layer, list, geojson, radius);
    // this._onListfuncs.addOnListMarkers(
    //   data.data,
    //   this._types,
    //   this.options.onListForma1
    // );
    // if (list.includes(-1))
    //   this._ordinaryPeople.addPopup(l, isLine, radius, leftRight);
    // this._map.spin(false);
  },
  _fetchPolygonData: async function (l, list, geojson, radius) {
    const { data } = await axios.post(`${url}/main/fields/add/${1}`, {
      counterNumber: 100,
      cropType: "bug'doy",
      polygon: geojson.geometry,
    });
    console.log(data);
    return { data, l };
  },
  _fetchLineData: async function (list, geojson, leftRight) {
    const { data } = await axios.post(
      `${config.url}/foreign/xatlov/criminal-in-line`,
      {
        types: list,
        geojson,
        left: leftRight[0],
        right: leftRight[1],
      }
    );
    const l = L.geoJSON(data.polygon.features).addTo(this._fg);
    return { data, l };
  },
  _selectModal: function (layer, isLine, radius) {
    L.control.reactWindow({
      modalCls: "modal-dialog-centered modal-xs",
      okCb: () =>
        this._getSelectedData(
          this.options.selectedTypes,
          layer,
          isLine,
          radius,
          [this.options.left, this.options.right]
        ),
      cancelCb: () => this._fg.removeLayer(layer),
      title: "Маълумотлар",
      content: (
        <>
          <div style={{ padding: "10px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Экин тури:</h3>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Майдон рақами:</h3>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Майдон юзаси:</h3>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Майдон переметри:</h3>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </div>
          </div>
        </>
      ),
      visible: true,
      addField: true,
    });
  },
  _initDrawEvents: function () {
    this._map
      .on("pm:create", (e) => {
        const { layer } = e;
        this._fg.addLayer(layer);
        contextConnections.editDeleteContext(this._fg);
        let radius;
        layer.pm.getShape() === "Line";
        if (layer.options.radius) {
          radius = layer.options.radius;
        }
        this._selectModal(layer, layer.pm.getShape() === "Line", radius);
        const seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        const inHectares = seeArea / 10000;
        const removeDecimals = Math.floor(inHectares);
        this.options.area = removeDecimals;
      })
      .on("pm:remove", (e) => {
        this._fg.removeLayer(e.layer);
      });

    // L.DomEvent.on(this._fg, "layerremove", () =>
    //   this._onListfuncs.removeOnListMarkers()
    // );
  },
  drawLine: function () {
    this._map.pm.enableDraw("Line");
  },
  drawPolygon: function () {
    this._map.pm.enableDraw("Polygon", { finishOn: "dblclick" });
  },
  drawCircle: function () {
    this._map.pm.enableDraw("Circle");
  },
  removeDraw: function (cond) {
    cond
      ? this._map.pm.enableGlobalRemovalMode()
      : this._map.pm.disableGlobalRemovalMode();
  },
  disableDraw: function () {
    this._map.pm.disableDraw();
  },
  getShapes: function () {
    return this._fg.getLayers();
  },
});

F.geoms = function (options) {
  return new F.Geoms(options);
};
