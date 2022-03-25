/*eslint-disable*/
import L from "leaflet";

export default function FIELDS(map) {
  this._map = map;
  this._fg = L.featureGroup().addTo(this._map);

  this.addLayers = function (data, cond) {
    this.removeLayers();
    data.forEach((d) => {
      const g = L.geoJSON(d.polygon, {
        style: {
          opacity: 0.75,
          fillOpacity: 0.3,
          fillColor: "#a9cc52",
          color: "green",
        },
      }).addTo(this._fg);
      if (cond) this._map.flyToBounds(g, 7);
    });
  };

  this.removeLayers = function () {
    this._fg.clearLayers();
  };
}
