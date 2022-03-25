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
          color: d.field_img ? "white" : "green",
        },
      }).addTo(this._fg);

      if (cond) this._map.flyTo(g.getBounds().getCenter(), 16.5);
      if (d.field_img) {
        L.imageOverlay(
          `data:image/png;base64,${d.field_img}`,
          g.getBounds(),
          {}
        )
          .bringToFront()
          .addTo(this._fg);
      }
    });
  };

  this.removeLayers = function () {
    this._fg.clearLayers();
  };
}
