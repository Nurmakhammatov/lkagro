/*eslint-disable*/
import L from "leaflet";

export default function FIELDS(map) {
  this._map = map;
  this._fg = L.featureGroup().addTo(this._map);

  this.addLayers = function (data, cond, cb, openBottomBar, selectedIndex) {
    this.removeLayers()
    data.forEach((d) => {
      const g = L.geoJSON(d.polygon, {
        style: {
          opacity: 0.75,
          fillOpacity: 0.3,
          fillColor: "#a9cc52",
          color: d.field_img ? "white" : "green"
        }
      }).addTo(this._fg)
      if (d.counter_number) g.bindPopup(() => this.popupContent(d))

      if (d.id) L.DomEvent.on(g, "dblclick", () => cb(d.id))
      if (cond && !openBottomBar) {
        // if (selectedIndex === d.id)
        this._map.flyTo(g.getBounds().getCenter(), 16.5)
      }
      if (openBottomBar) {
        // if (selectedIndex === d.id)
        this._map.flyTo(g.getBounds().getCenter(), 15.5)
      }
      if (d.field_img) {
        L.imageOverlay(`data:image/png;base64,${d.field_img}`, g.getBounds(), {}).bringToFront().addTo(this._fg)
      }
    })
  }

  this.popupContent = function (d) {
    let tr;
    const table = L.DomUtil.create(
      "table",
      "table table-sm table-bordered glass-container"
    );

    const thead = L.DomUtil.create("thead", "", table);
    tr = L.DomUtil.create("tr", "", thead);

    const tbody = L.DomUtil.create("tbody", "", table);

    tr = L.DomUtil.create("tr", "", tbody);
    L.DomUtil.create("td", "", tr).innerText = "Майдон:";
    L.DomUtil.create("td", "", tr).innerText = d.counter_number;

    tr = L.DomUtil.create("tr", "", tbody);
    L.DomUtil.create("td", "", tr).innerText = "Экин:";
    L.DomUtil.create("td", "", tr).innerText = d.crop_type;

    tr = L.DomUtil.create("tr", "", tbody);
    L.DomUtil.create("td", "", tr).innerText = "Сана:";
    L.DomUtil.create("td", "", tr).innerText = d.created_at;

    return table;
  };

  this.removeLayers = function () {
    this._fg.clearLayers();
  };
}
