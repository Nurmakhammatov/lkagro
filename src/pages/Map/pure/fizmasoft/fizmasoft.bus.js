/*eslint-disable*/
import F from "./fizmasoft"

F.Bus = F.Class.extend({
  options: {},
  initialize: function (options) {
    this._idList = []
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._markers = L.markerClusterGroup()
    this._iconProps = {
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [-5, 0],
      shadowSize: [0, 0],
      className: "circle-icon"
    }
    return this
  },

  addPoint: function (data) {
    if (!this._idList || this._idList?.length !== data.length) this._newMarkers(data)
    else this._changeMarkerPoints(data)
  },

  _newMarkers: function (data) {
    let marker
    this.removePoints()
    data.forEach((d) => {
      if (d.selected) {
        marker = L.marker(d.coordinates, {
          icon: L.divIcon({
            ...this._iconProps,
            html: `<p style="text-align: center">${d.busNumber.replaceAll(" ", "")}</p>`
          })
        })
        this._idList.push({ id: d.id, leaflet: marker?._leaflet_id })
        this._markers.addLayer(marker)
      }
    })
    this._map.addLayer(this._markers)
  },

  _changeMarkerPoints: function (data) {
    for (let d = 0; d < data.length; d++) {
      if (!data[d].selected) return this._newMarkers(data)
      const [item] = this._idList.filter((i) => i.id === d.id)
      if (data[d].coordinates) {
        const marker = this._fg.getLayer(item?.leaflet)
        marker?.setLatLng(data[d].coordinates)
      }
    }
  },

  removePoints: function () {
    this._idList = []
    this._markers?.clearLayers()
  }
})

F.bus = function (options) {
  return new F.Bus(options)
}
