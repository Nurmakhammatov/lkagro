/*eslint-disable*/
import L from "leaflet";

export default function FIELDS(map) {
  this._map = map;
  this._fg = L.featureGroup().addTo(this._map);

  this.addLayers = function (data) {
    // this.removeLayers();
    data.forEach((d) => {
      L.geoJSON(d.polygon, {
        style: {
          color: "#1167b1",
          opacity: 0.75,
          fillOpacity: 0.3,
          fillColor: "#a9cc52",
          color: "green",
        },
      }).addTo(this._fg);
    });
  };

  this.removeLayers = function () {
    this._fg.clearLayers();
  };
}
